const usersModel = require("../../Models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await usersModel.findOne({ username: username });
      if (!user) {
        throw new Error("username does not exist");
      }
      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        throw new Error("Passwords do not match");
      }
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        "dndkasdjasbdhabdbsaidbaubd12182u38udbaskbdasbduassduasbduab",
        {
          expiresIn: "1h",
        }
      );
      return {
        _id: user.id,
        token,
        username: user.username,
        email: user.email,
      };
    },
    createUser: (_, args) => {
      return usersModel
        .findOne({ email: args.registerInput.email })
        .then((user) => {
          if (user) {
            throw new Error("User already exists");
          } else if (
            args.registerInput.password === args.registerInput.confirmPassword
          ) {
            return bcrypt.hash(args.registerInput.password, 12);
          } else {
            throw new Error("Passwords Do not Match");
          }
        })
        .then((hasedPassword) => {
          const user = new usersModel({
            email: args.registerInput.email,
            username: args.registerInput.username,
            password: hasedPassword,
            createdAt: new Date().toISOString(),
          });
          return user
            .save()
            .then((result) => {
              const token = jwt.sign(
                {
                  id: result.id,
                  email: result.email,
                  username: result.username,
                },
                "dndkasdjasbdhabdbsaidbaubd12182u38udbaskbdasbduassduasbduab",
                { expiresIn: "1h" }
              );
              return { ...result._doc, _id: result.id, token };
            })
            .catch((err) => {
              throw err;
            });
        })
        .catch((err) => {
          throw err;
        });
    },
  },
};
