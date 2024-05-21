import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "https://supernova-graphql-react-app.onrender.com/graphql", // http://localhost:3001/graphql    https://supernova-graphql-react-app.onrender.com/graphql
});

const wsLink = new WebSocketLink({
  uri: `wss://supernova-graphql-react-app.onrender.com/graphql`, // ws://localhost:3001/graphql     wss://supernova-graphql-react-app.onrender.com/graphql
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
