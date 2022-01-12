import React, { useContext } from "react";
import { Button, Card, Image, Icon, Label, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/contextAuth";
import Like from "../components/Like";
import DeletePost from "./deletePost";
function Postcard({
  post: {
    body,
    createdAt,
    _id,
    username,
    likes,
    likeCount,
    commentCount,
    comments,
  },
}) {
  function commentPost() {
    console.log("commented");
  }
  function ondelete() {
    console.log("deleted");
  }
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${_id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Like user={user} post={{ _id, likes, likeCount }} />
        <Popup
          content="Leave a comment on post"
          inverted
          trigger={
            <Button labelPosition="right" as={Link} to={`/posts/${_id}`}>
              <Button color="blue" basic>
                <Icon name="comments" />
              </Button>
              <Label basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          }
        />

        {user && user.username === username && <DeletePost postId={_id} />}
      </Card.Content>
    </Card>
  );
}

export default Postcard;
