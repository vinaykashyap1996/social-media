const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");
const PostModel = require("./Models/post");
require("dotenv").config();

const typeDefs = gql`
  type Post {
    _id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Query {
    getposts: [Post]
  }
`;

const resolvers = {
  Query: {
    async getposts() {
      try {
        const posts = await PostModel.find();
        return posts;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

const Server = new ApolloServer({
  typeDefs,
  resolvers,
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
