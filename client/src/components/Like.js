import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

function Like({ user, post: { _id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);
  {
    useEffect(() => {
      if (
        user &&
        likes.length !== 0 &&
        likes.filter((like) => like.username === user.username)
      ) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
      variables: { id: _id },
    });
    const likeButton = user ? (
      liked ? (
        <Button color="teal">
          <Icon name="heart" />
        </Button>
      ) : (
        <Button color="teal" basic>
          <Icon name="heart" />
        </Button>
      )
    ) : (
      <Button as={Link} to="/login" color="teal" basic>
        <Icon name="heart" />
      </Button>
    );

    return (
      <Button as="div" labelPosition="right" onClick={likePost}>
        {likeButton}
        <Label basic color="teal" pointing="left">
          {likeCount}
        </Label>
      </Button>
    );
  }
}
const LIKE_POST_MUTATION = gql`
  mutation likePost($id: ID!) {
    likePost(postId: $id) {
      _id
      likes {
        _id
        username
      }
      likeCount
    }
  }
`;

export default Like;
