import React, { useState } from "react";
import AxiosWithAuth from "./AxiosWithAuth";
import { Button } from "reactstrap";
import "../App.css";

const Login = props => {
  const [friends, setFriends] = useState({
    credentials: { username: "", password: "" }
  });

  const handleChange = e => {
    setFriends({
      credentials: {
        ...friends.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  const login = e => {
    e.preventDefault();
    AxiosWithAuth()
      .post("/login", friends.credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.payload);
        props.history.push("/friends");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="log-in">
      <form onSubmit={login}>
        <h2>Login</h2>
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={friends.credentials.username}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={friends.credentials.password}
          onChange={handleChange}
        />
        <Button>Log in</Button>
      </form>
    </div>
  );
};

export default Login;
