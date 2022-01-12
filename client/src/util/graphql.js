import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  {
    getposts {
      _id
      body
      username
      createdAt
      comments {
        body
        username
        createdAt
      }
      likes {
        username
      }
      commentCount
      likeCount
    }
  }
`;
