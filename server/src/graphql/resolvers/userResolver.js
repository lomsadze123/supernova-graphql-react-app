import prisma from "../../../lib/prisma.js";
import { generateToken, hashPassword } from "../../utils/jwt.js";
import bcrypt from "bcrypt";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

const userResolver = {
  Query: {
    // Fetch the current authenticated user
    currentUser: async (_, __, { user }) => {
      try {
        if (!user) {
          throw new Error("Not authenticated");
        }

        const currentUser = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
        });

        if (!currentUser) {
          throw new Error("User not found");
        }

        return currentUser;
      } catch (error) {
        console.error("Error fetching current user:", error);
        throw new Error("Unable to fetch current user");
      }
    },

    // Get the total sign-in count of all users
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
        const hashedPassword = await hashPassword(input.password);

        const user = await prisma.user.create({
          data: {
            email: input.email,
            password: hashedPassword,
            signInCount: 0,
          },
        });

        const token = generateToken(user.id);

        console.log("Created new user", user);

        return { ...user, token };
      } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Unable to create user");
      }
    },

    async loginUser(_, { input }) {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: input.email,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const valid = await bcrypt.compare(input.password, user.password);

        if (!valid) {
          throw new Error("Invalid password");
        }

        // Update the user's sign-in count
        const updatedUser = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            signInCount: user.signInCount + 1,
          },
        });

        const token = generateToken(updatedUser.id);

        // Publish the updated global sign-in count (live)
        const globalCount = await userResolver.Query.globalSignInCount();
        pubsub.publish(process.env.SIGNIN_COUNT_UPDATED, {
          globalSignInCount: globalCount,
        });

        return { ...updatedUser, token };
      } catch (error) {
        console.error("Error logging in:", error);
        if (
          error.message === "Invalid password" ||
          error.message === "User not found"
        ) {
          throw new Error(error.message);
        } else {
          throw new Error("Unable to log in");
        }
      }
    },
  },
  Subscription: {
    // Subscription for global sign-in count updates
    globalSignInCount: {
      subscribe: () => pubsub.asyncIterator(process.env.SIGNIN_COUNT_UPDATED),
    },
  },
};

export default userResolver;
