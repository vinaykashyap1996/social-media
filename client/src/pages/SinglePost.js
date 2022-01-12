import React, { useContext, useState, useRef } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Grid } from "semantic-ui-react";
import { Form, Button, Icon, Label, Card, Image } from "semantic-ui-react";
import { useNavigate, useParams, Link } from "react-router-dom";
import moment from "moment";
import Like from "../components/Like";
import { AuthContext } from "../context/contextAuth";
import DeletePost from "../components/deletePost";

function SinglePost(props) {
  const [comment, setComment] = useState("");
  const commentInputRef = useRef(null);

  let params = useParams();
  const postId = params.postId;
  const history = useNavigate();
  const { data, loading, error } = useQuery(FETCH_POST_QUERY, {
    variables: { postId: postId },
  });
  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
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
          <Grid.Column width={3}>
            <Image
              float="right"
              size="medium"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
          </Grid.Column>

          <Grid.Column width={12}>
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
                  <Button labelPosition="right" as={Link} to={`/posts/${_id}`}>
                    <Button color="blue" basic>
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                </Button>
                {user && user.username === username && (
                  <DeletePost postId={postId} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment.trim() === ""}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment._id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeletePost postId={_id} commentId={comment._id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}
const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      _id
      comments {
        _id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      _id
      body
      createdAt
      commentCount
      likeCount
      comments {
        _id
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
