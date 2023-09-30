import express, { Router, Request, Response } from "express";
import { google } from "googleapis";
import { OAuth2Client as GoogleOAuth2Client } from "google-auth-library";
require("dotenv").config(); 

const router: express.Router = Router();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URIS = process.env.GOOGLE_REDIRECT_URIS;

if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URIS) {
  throw new Error("Environment variables not set");
}

export const OAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URIS
);

export let authenticated: boolean = false;

export function setAuthenticated(value: boolean) {
  authenticated = value;
}

const scopes =
  "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";

router.get("/", async (req: Request, res: Response) => {
  // Authentication logic here
  if (!authenticated) {
    const url = await OAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes
    });
    res.json({ msg: "Open this URL for authentication", url: url });
    return;
  }
  const oauth2 = google.oauth2({
    version: "v2",
    auth: OAuth2Client
  });
  try {
    const { data } = await oauth2.userinfo.get();
    const name = data.name as string;
    const pic = data.picture as string;
    res.json({ msg: "You are authenticated", name, pic });
  } catch (err) {
    console.error("Error getting user info:", err);
    res.status(500).json({ msg: "Error getting user info" });
  }
});

router.get("/api/auth/callback/google", (req: Request, res: Response) => {
  // Callback logic here
  if (authenticated) {
    res.status(200).json({ msg: "You are already authenticated" });
    return;
  }
  const code: string | undefined = req.query.code?.toString();
  if (!code) {
    res.json({ msg: "There is an issue with the provided code in the URL" });
    return;
  }
  OAuth2Client.getToken(code, (err, tokens) => {
    if (err) {
      console.error("Error during authentication:", err);
      res.status(500).json({ msg: "Error during authentication" });
      return;
    }
    if (!tokens) {
      res
        .status(500)
        .json({ msg: "Error during authentication: No tokens received" });
      return;
    }
    OAuth2Client.setCredentials(tokens);
    authenticated = true;
    console.log("Successfully authenticated");
    res.json({ msg: "Successfully authenticated", token: tokens });
  });
});

export { router as authenticationRoute };
