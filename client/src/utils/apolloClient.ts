import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "http://localhost:3001/graphql",
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3001/graphql`,
  options: {
    reconnect: true,
  },
});

// Split the link based on the operation type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    // Route subscription operations to the WebSocket link and others to the HTTP link
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// Create an Apollo Client instance with the split link and an in-memory cache
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
