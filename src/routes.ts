import express, { Express, Request, Response } from 'express';
import { videoUploadRoute } from './videoUploadRoute';
import { authenticationRoute } from './authenticationRoute';

export function setupRoutes(app: Express): void {
  app.use('/', authenticationRoute);
  app.use('/', videoUploadRoute);
}
