const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
require("dotenv").config();

const typeDefs = require("./Graphql/Schema/typeDef");

const resolvers = require("./Graphql/Resolvers/resolver");

const Server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then()
  .catch((err) => {
    console.log(err);
  });

Server.listen({ port: 8000 }).then((res) => {
  console.log(`Server running on port ${res.url}`);
});
