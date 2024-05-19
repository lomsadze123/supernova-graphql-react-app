import prisma from "../../../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();
const SIGNIN_COUNT_UPDATED = "SIGNIN_COUNT_UPDATED";
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

    globalSignInCount: async () => {
      try {
        const globalSignInCount = await prisma.user.aggregate({
          _sum: {
            signInCount: true,
          },
        });

        return globalSignInCount._sum.signInCount || 0;
      } catch (error) {
        console.error("Error calculating global sign-in count:", error);
        throw new Error("Unable to calculate global sign-in count");
      }
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
            signInCount: 0,
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

        const updatedUser = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            signInCount: user.signInCount + 1,
          },
        });

        const token = jwt.sign({ id: updatedUser.id }, process.env.SECRET_KEY);

        const globalSignInCount = await userResolver.Query.globalSignInCount();
        pubsub.publish(SIGNIN_COUNT_UPDATED, { globalSignInCount });

        console.log("login successful");

        return { ...user, token };
      } catch (error) {
        console.error("Error logging in:", error);
        throw new Error("Unable to log in");
      }
    },
  },
  Subscription: {
    globalSignInCount: {
      subscribe: () => pubsub.asyncIterator(SIGNIN_COUNT_UPDATED),
    },
  },
};

export default userResolver;
