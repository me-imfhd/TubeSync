import { Express } from 'express';
import { videoUploadRoute } from './route/upload/videoUploadRoute';
import { authenticationRoute } from './route/auth/authenticationRoute';
import { revokeRoute } from './route/revokeRoute';

export function setupRoutes(app: Express): void {
  app.use('/', authenticationRoute);
  app.use('/', videoUploadRoute);
  app.use('/', revokeRoute)
}
