import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";
import Postcard from "../components/Postcard";
function Home() {
  const { loading, data } = useQuery(FETCH_POST);
  console.log(data);
  return (
    <Grid columns={3} divided>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading..</h1>
        ) : (
          data.getposts &&
          data.getposts.map((post) => {
            return (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <Postcard key={post.id} post={post} />
              </Grid.Column>
            );
          })
        )}
      </Grid.Row>
    </Grid>
  );
}

const FETCH_POST = gql`
  {
    getposts {
      _id
      body
      username
      comments {
        body
        username
      }
      likes {
        createdAt
        username
      }
      commentCount
      likeCount
    }
  }
`;

export default Home;
