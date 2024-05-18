import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import prisma from "./lib/prisma.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

async function fetchUsers() {
  try {
    const users = await prisma.user.findMany();
    console.log("Users:", users);
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    await prisma.$disconnect();
  }
}

fetchUsers();

app.listen(process.env.PORT || 3001, () =>
  console.log("listening on port " + process.env.PORT || 3001)
);
