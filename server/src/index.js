import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import typeDefs from "./graphql/schema.js";
import resolvers from "./graphql/resolvers/index.js";
import getUser from "./utils/jwt.js";
import initWebSocketServer from "./websocket/index.js";

const app = express();
const httpServer = createServer(app);

initWebSocketServer(httpServer);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    console.log("token", token);
    const user = getUser(token);
    return { user };
  },
});

await server.start();

server.applyMiddleware({ app });

app.use(express.json());

httpServer.listen(process.env.PORT || 3001, () =>
  console.log("listening on port " + process.env.PORT || 3001)
);
