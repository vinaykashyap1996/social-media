import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../util/hooks";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";

function Postform() {
  const [error, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data.getposts = [result.data.createPost, ...data.getposts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.body = "";
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].message);
    },
  });

  function createPostCallback() {
    createPost();
  }
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi World!"
            name="body"
            onChange={onChange}
            value={values.body}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {/* {error && (
        <div className="ui error message">
          <ul className="list">
            <li>{error}</li>
          </ul>
        </div>
      )} */}
    </div>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation ($body: String!) {
    createPost(body: $body) {
      _id
      body
      createdAt
      username
      likes {
        _id
        username
        createdAt
      }
      likeCount
      comments {
        _id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default Postform;
