import prisma from "../../../lib/prisma.js";

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
  },
  Mutation: {
    createUser: async (_, args) => {
      try {
        const newUser = await prisma.user.create({
          data: {
            username: args.username,
            email: args.email,
            password: args.password,
          },
        });
        return newUser;
      } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Unable to create user");
      }
    },
  },
};

export default userResolver;
