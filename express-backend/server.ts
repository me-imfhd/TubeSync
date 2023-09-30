import express from 'express';
import { Request, Response } from 'express';
import { setupRoutes } from './routes';

const app = express();
const port = 3000;
app.use(express.json());

setupRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
