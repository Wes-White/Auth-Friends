import React, { useState } from "react";
import AxiosWithAuth from "./AxiosWithAuth";

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
    <div>
      <form onSubmit={login}>
        <h2>Login Here</h2>
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
        <button>Log in</button>
      </form>
    </div>
  );
};

export default Login;
