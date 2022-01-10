const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.Secret_key);
        return user;
      } catch (error) {
        throw new Error("Authentication Error");
      }
    } else {
      throw new Error("Token Error");
    }
  } else {
    throw new Error("Authorization Error please provide a valid token");
  }
};
