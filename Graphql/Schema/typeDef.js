const gql = require("graphql-tag");

module.exports = gql`
  type Post {
    _id: ID!
    body: String!
    username: String!
    createdAt: String!
  }

  type User {
    _id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type Query {
    getposts: [Post]
  }

  type Mutation {
    createUser(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;
