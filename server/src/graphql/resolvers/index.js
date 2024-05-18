import userResolver from "./userResolver.js";

const resolvers = {
  Query: {
    ...userResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation, // Include mutation resolvers from userResolver
  },
};

export default resolvers;
