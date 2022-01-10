const post = require("../../Models/post");
const PostModel = require("../../Models/post");
const checkauth = require("../../Utils/check-auth");

module.exports = {
  Query: {
    async getposts() {
      try {
        const posts = await PostModel.find();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await PostModel.findById({ _id: postId });
        if (post) {
          return post;
        } else {
          throw new Error("Post not Found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkauth(context);

      const newPost = new PostModel({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      const Post = await newPost.save();
      return Post;
    },

    async deletePost(_, { postId }, context) {
      const user = checkauth(context);
      try {
        const deletedPost = await PostModel.findById({ _id: postId });
        if (user.username === deletedPost.username) {
          await deletedPost.delete();
          return "Post Deleted";
        } else {
          throw new Error("Post cannot be deleted");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
