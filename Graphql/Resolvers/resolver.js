const UsersResolver = require("./users");
const PostsResolver = require("./post");

const rootResolver = {
  Query: {
    ...PostsResolver.Query,
  },
  Mutation: {
    ...UsersResolver.Mutation,
    ...PostsResolver.Mutation,
  },
};

module.exports = rootResolver;
