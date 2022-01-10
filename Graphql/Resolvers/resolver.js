const UsersResolver = require("./users");
const PostsResolver = require("./post");

const rootResolver = {
  ...UsersResolver,
  ...PostsResolver,
};

module.exports = rootResolver;
