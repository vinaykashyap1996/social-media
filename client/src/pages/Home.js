import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid } from "semantic-ui-react";
import Postcard from "../components/Postcard";
import Postform from "../components/Postform";
import { AuthContext } from "../context/contextAuth";
import { FETCH_POSTS_QUERY } from "../util/graphql";

function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const { user } = useContext(AuthContext);
  return (
    <Grid columns={3} divided>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      {user && <Postform />}
      <Grid.Row>
        {loading ? (
          <h1>Loading..</h1>
        ) : (
          data.getposts &&
          data.getposts.map((post) => {
            return (
              <Grid.Column key={post._id} style={{ marginBottom: 20 }}>
                <Postcard key={post._id} post={post} />
              </Grid.Column>
            );
          })
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
