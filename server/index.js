import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./src/graphql/schema.js";
import resolvers from "./src/graphql/resolvers/index.js";

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

server.applyMiddleware({ app });

app.use(express.json());

app.listen(process.env.PORT || 3001, () =>
  console.log("listening on port " + process.env.PORT || 3001)
);
