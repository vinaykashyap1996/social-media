import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Confirm, Popup } from "semantic-ui-react";

function DeletePost({ postId, commentId, callback }) {
  const [confirmOpen, setconfirmOpen] = useState(false);
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [DelePost] = useMutation(mutation, {
    update(_, result) {
      if (!commentId) {
        setconfirmOpen(false);
      }
      if (callback) callback();
    },
    variables: { postId: postId, commentId: commentId },
  });
  return (
    <>
      <Popup
        content={commentId ? "Delete a Comment" : "Delete a post"}
        inverted
        trigger={
          <Button
            as="div"
            color="red"
            floated="right"
            onClick={() => {
              setconfirmOpen(true);
            }}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        }
      />
      <Confirm
        open={confirmOpen}
        content="Confirm Delete Post"
        onCancel={() => {
          setconfirmOpen(false);
        }}
        onConfirm={DelePost}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation ($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      _id
      body
      username
      createdAt
      comments {
        _id
        body
        username
        createdAt
      }
    }
  }
`;

export default DeletePost;
