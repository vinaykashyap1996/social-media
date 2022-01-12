import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Grid } from "semantic-ui-react";
import { Button, Icon, Label, Card, Image } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Like from "../components/Like";
import { AuthContext } from "../context/contextAuth";
import DeletePost from "../components/deletePost";

function SinglePost(props) {
  let params = useParams();
  const postId = params.postId;
  const history = useNavigate();
  const { data, loading, error } = useQuery(FETCH_POST_QUERY, {
    variables: { postId: postId },
  });
  const { user } = useContext(AuthContext);
  function deletePostCallback() {
    history("/");
  }
  let postMarkup;
  if (!postId || !data) {
    postMarkup = <p>Loading ...</p>;
  } else {
    const {
      body,
      createdAt,
      _id,
      username,
      likes,
      likeCount,
      commentCount,
      comments,
    } = data.getPost;
    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              float="right"
              size="medium"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
          </Grid.Column>

          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <Like user={user} post={{ _id, likes, likeCount }} />
                <Button
                  labelPosition="right"
                  onClick={() => {
                    console.log("commented on this post");
                  }}
                >
                  <Button color="blue" basic>
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeletePost postId={postId} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      _id
      body
      createdAt
      commentCount
      likeCount
      comments {
        body
        username
        createdAt
      }
      likes {
        username
      }
      username
    }
  }
`;

export default SinglePost;
