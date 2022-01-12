import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Confirm } from "semantic-ui-react";

function DeletePost({ postId, callback }) {
  const [confirmOpen, setconfirmOpen] = useState(false);

  const [DelePost] = useMutation(DELETE_POST_MUTATION, {
    update(_, result) {
      setconfirmOpen(false);
      if (callback) callback();
    },
    variables: { postId: postId },
  });
  return (
    <>
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

export default DeletePost;
