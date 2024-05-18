import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import typeDefs from "./src/graphql/schema.js";
import resolvers from "./src/graphql/resolvers/index.js";
import getUser from "./src/utils/jwt.js";

const app = express();
const httpServer = createServer(app);
const wsServer = new WebSocketServer({ server: httpServer });

wsServer.on("connection", (ws) => {
  console.log("WebSocket client connected");

  // Handle WebSocket messages
  ws.on("message", (message) => {
    console.log("Received message:", message);
    // You can handle specific messages here if needed
  });

  // Handle WebSocket disconnection
  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization?.split(" ")[1] || "";
    console.log("token", token);
    const user = await getUser(token);
    return { user };
  },
});

await server.start();

server.applyMiddleware({ app });

app.use(express.json());

httpServer.listen(process.env.PORT || 3001, () =>
  console.log("listening on port " + process.env.PORT || 3001)
);
