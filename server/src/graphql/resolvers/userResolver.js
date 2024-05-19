import prisma from "../../../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userResolver = {
  Query: {
    users: async () => {
      try {
        const users = await prisma.user.findMany();
        console.log(users);
        return users;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Unable to fetch users");
      }
    },

    currentUser: async (_, args, { user }) => {
      if (!user) {
        throw new Error("Not authenticated");
      }
      return prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });
    },
  },

  Mutation: {
    createUser: async (_, { input }) => {
      try {
        const hashedPassword = await bcrypt.hash(input.password, 10);

        const user = await prisma.user.create({
          data: {
            email: input.email,
            password: hashedPassword,
          },
        });

        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

        return { ...user, token };
      } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Unable to create user");
      }
    },

    loginUser: async (_, { input }) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: input.email,
          },
        });

        console.log("user", user);

        if (!user) {
          throw new Error("User not found");
        }

        const valid = await bcrypt.compare(input.password, user.password);

        if (!valid) {
          throw new Error("Invalid password");
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

        console.log("login successful");

        return { ...user, token };
      } catch (error) {
        console.error("Error logging in:", error);
        throw new Error("Unable to log in");
      }
    },
  },
};

export default userResolver;
