import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/contextAuth";
function Login() {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const history = useNavigate();

  const { onChange, onSubmit, values } = useForm(loginUser, {
    username: "",
    password: "",
  });

  const [addUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      context.login(result.data.login);
      history("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].message);
    },
    variables: values,
  });
  function loginUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            <li key={errors}>{errors}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      _id
      email
      username
      token
    }
  }
`;

export default Login;
