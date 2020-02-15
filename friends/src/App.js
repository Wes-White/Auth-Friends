import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Friends from "./components/Friends";
import PrivateRoute from "./components/PrivateRoute";
import AddForm from "./components/AddForm";
import { Button } from "reactstrap";
import Audio from "./components/Audio";
function App() {
  const logout = () => {
    localStorage.removeItem("token");
  };
  return (
    <div className="App">
      <Link to="/friends">
        <h1>Friends...</h1>
      </Link>

      <div className="log-out">
        <Link onClick={logout}>
          <Button color="danger">Logout</Button>
        </Link>
      </div>

      <Switch>
        <PrivateRoute exact path="/friends" component={Friends} />
        <PrivateRoute path="/friends/add" component={AddForm} />
        <Route path="/login" component={Login} />
        <Route component={Login} />
      </Switch>
      <Audio />
    </div>
  );
}

export default App;
