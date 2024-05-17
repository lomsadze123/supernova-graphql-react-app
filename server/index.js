import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const prisma = new PrismaClient();

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

fetchUsers().catch((error) => {
  console.error("Error occurred during application startup:", error);
  process.exit(1); // Exit the application with an error code
});

app.listen(process.env.PORT || 3001, () =>
  console.log("listening on port " + process.env.PORT || 3001)
);
