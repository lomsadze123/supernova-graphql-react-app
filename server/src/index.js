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

const schema = makeExecutableSchema({ typeDefs, resolvers });

const httpServer = createServer(app);

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

app.use(express.json());

server.applyMiddleware({ app });

const subscriptionServer = SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
    onConnect: (connectionParams, webSocket, context) => {
      // Handle connection params if needed
      console.log("Connecting to subscription");
    },
    onDisconnect: (webSocket, context) => {
      // Handle disconnection if needed
      console.log("Disconnecting from subscription");
    },
  },
  {
    server: httpServer,
    path: server.graphqlPath,
  }
);

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => console.log("listening on port " + PORT));
