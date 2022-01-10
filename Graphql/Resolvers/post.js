const PostModel = require("../../Models/post");

module.exports = {
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
