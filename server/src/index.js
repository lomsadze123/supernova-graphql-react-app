import startServer from "./server/startServer.js";

startServer().catch((err) => {
  console.error("Server failed to start", err);
});
