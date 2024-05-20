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
import { makeExecutableSchema } from "@graphql-tools/schema";

const app = express();
const httpServer = createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });

const subscriptionServer = SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
  },
  {
    server: httpServer,
    path: "/graphql",
  }
);

async function startServer() {
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const token = req.headers.authorization?.split(" ")[1] || "";
      const user = await getUser(token);
      return { user };
    },
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = 3001;
  httpServer.listen(PORT, () => console.log("listening on port " + PORT));
}

startServer().catch((err) => {
  console.error("Server failed to start", err);
});
