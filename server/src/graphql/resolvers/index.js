import userResolver from "./userResolver.js";

// Combines resolvers for queries, mutations, and subscriptions from userResolver.js

const resolvers = {
  Query: {
    ...userResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
  },
  Subscription: {
    ...userResolver.Subscription,
  },
};

export default resolvers;
