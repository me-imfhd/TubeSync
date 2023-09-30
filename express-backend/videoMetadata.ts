import {google, youtube_v3} from "googleapis";
import { RequestBody } from "./route/upload/videoUploadRoute";



export function videoData(body: RequestBody){
  const {title, description, categoryId, privacyStatus, thumbnailUrl} = body;
  const videoMetadata: youtube_v3.Schema$Video = 
      {
        snippet: {
          categoryId: categoryId,
          description: description,
          title: title,
          thumbnails: {
            maxres:{
              url: thumbnailUrl
            }
          }
        },
        status: {
          privacyStatus: privacyStatus || "private"
        }
      }
  return videoMetadata;
}
 