import dotenv from "dotenv";
dotenv.config();
import { createServer } from "http";
import { execute, subscribe } from "graphql";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/schema.js";
import resolvers from "./graphql/resolvers/index.js";
import getUser from "./utils/jwt.js";
import { SubscriptionServer } from "subscriptions-transport-ws";

const app = express();

const httpServer = createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    path: "/graphql",
  },
  context: async ({ req }) => {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const user = await getUser(token);
    return { user };
  },
});

await server.start();

server.applyMiddleware({ app });

SubscriptionServer.create(
  {
    schema: server.schema,
    execute,
    subscribe,
  },
  {
    server: httpServer,
    path: "/graphql",
  }
);

app.use(express.json());

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => console.log("listening on port " + PORT));
