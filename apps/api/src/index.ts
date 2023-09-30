import { setupRoutes } from "./routes";
import { createServer } from "./server";
import { log } from "logger";

const port = process.env.PORT || 3000;
const server = createServer();

setupRoutes(server);

server.listen(port, () => {
  log(`api running on ${port}`);
});
