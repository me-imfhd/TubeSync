import {google, youtube_v3} from "googleapis";


export const videoMetadata: youtube_v3.Schema$Video = 
      {
        snippet: {
          categoryId: "22",
          description: "Description of uploaded video 101010101010.",
          title: "Test video upload."
        },
        status: {
          privacyStatus: "private"
        }
      }