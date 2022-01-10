const UsersResolver = require("./users");
const PostsResolver = require("./post");
const CommentsResolver = require("./comments");
const rootResolver = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...PostsResolver.Query,
  },
  Mutation: {
    ...UsersResolver.Mutation,
    ...PostsResolver.Mutation,
    ...CommentsResolver.Mutation,
  },
  Subscription: {
    ...PostsResolver.Subscription,
  },
};

module.exports = rootResolver;
