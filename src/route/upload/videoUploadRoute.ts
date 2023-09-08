import express, { Router, Request, Response } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { google, youtube_v3 } from 'googleapis';
import { OAuth2Client } from '../auth/authenticationRoute';
import { videoData } from '../../videoMetadata';
import { authenticated } from '../auth/authenticationRoute';

export interface RequestBody {
  title: string;
  description: string;
  categoryId: string;
  privacyStatus: string;
  thumbnailUrl: string;
}

const router = Router();

// Multer and video upload logic here
// Configure Multer for file upload
const storage: multer.StorageEngine = multer.diskStorage({
  destination: './videos',
  filename(req, file, fn) {
    fn(null, `${new Date().getTime().toString()}-${file.fieldname}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage: storage }).single('video');

router.post('/upload', (req: Request, res: Response) => {

  const videoMetadata = videoData(req.body)

  if (!authenticated) {
    res.status(403).json({ msg: 'You are not authenticated' });
    return;
  }
  upload(req, res, async (err) => {
    if (err) {
      console.error('Error in Multer:', err);
      res.status(500).json({ msg: 'Error in Multer', err });
      return;
    }
    console.log(req.file?.path);
    const youtubeService = google.youtube({ version: 'v3', auth: OAuth2Client });

    const videoInsertParams: youtube_v3.Params$Resource$Videos$Insert = {
      part: ['snippet', 'status'],
      media: {
        body: fs.createReadStream(req.file?.path as string),
      },
      requestBody: videoMetadata,
    };

    try {
      console.log('Uploading the video...');
      await youtubeService.videos.insert(videoInsertParams);
      res.status(200).json({ message: 'Upload successful!' });
    } catch (err) {
      console.error('Error while inserting the video:', err);
      res.status(500).json({ msg: 'Error while inserting the video', err });
    } finally {
      fs.unlink(req.file?.path as string, (err) => {
        if (err) {
          console.error('Error while deleting file in server-side directory:', err);
          res.status(500).json({ msg: 'Error while deleting file in server-side directory', err });
        } else {
          console.log('File deleted successfully:', req.file?.path);
        }
      });
    }
  });
});

export { router as videoUploadRoute };
