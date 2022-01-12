const { ApolloServer } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");

const mongoose = require("mongoose");
require("dotenv").config();

const typeDefs = require("./Graphql/Schema/typeDef");

const resolvers = require("./Graphql/Resolvers/resolver");
const pubsub = new PubSub();

const Server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(console.log("Mongo connected"))
  .catch((err) => {
    console.log(err);
  });

Server.listen({ port: PORT }).then((res) => {
  console.log(`Server running on port ${res.url}`);
});
