const PostModel = require("../../Models/post");
const checkauth = require("../../Utils/check-auth");

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const user = checkauth(context);
      try {
        if (body.trim() === "") {
          throw new Error("Comment must not be empty");
        }
        const post = await PostModel.findById({ _id: postId });
        if (post) {
          post.comments.unshift({
            body,
            username: user.username,
            createdAt: new Date().toISOString(),
          });
          await post.save();
          return post;
        } else {
          throw new Error("Post Not Found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async deleteComment(_, { postId, commentId }, context) {
      const user = checkauth(context);
      const post = await PostModel.findById({ _id: postId });
      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);
        if (post.comments[commentIndex].username === user.username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new Error("Comment Not Found");
        }
      } else {
        throw new Error("Post Not Found");
      }
    },
    async likePost(_, { postId }, context) {
      const user = checkauth(context);
      const post = await PostModel.findById({ _id: postId });
      if (post) {
        if (post.likes.find((like) => like.username === user.username)) {
          post.likes = post.likes.filter(
            (like) => like.username !== user.username
          );
        } else {
          post.likes.push({
            username: user.username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else {
        throw new Error("Post Not Found");
      }
    },
  },
};
