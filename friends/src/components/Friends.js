import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AxiosWithAuth from "./AxiosWithAuth";
import {
  CardDeck,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button
} from "reactstrap";
import "../App.css";

const Friends = () => {
  const [friendState, setfriendState] = useState([]);

  useEffect(() => {
    AxiosWithAuth()
      .get("/friends")
      .then(res => {
        console.log(res.data);
        setfriendState(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container">
      <Link to="/friends/add">
        <Button color="success" className="add-btn">
          Add yourself to the cast
        </Button>
      </Link>
      <div className="card-contanier">
        {friendState.map(friend => {
          return (
            <CardDeck style={{ width: "18rem" }} className="card-group">
              <Card key={friend.id}>
                <CardImg src={friend.img} alt="Card image cap" />
                <CardBody>
                  <CardTitle>Name:{friend.name}</CardTitle>
                  <CardText>
                    Email:
                    <a href={`mailto:${friend.email}`}>{friend.email}</a>
                  </CardText>
                  <CardText>Age: {friend.age}</CardText>
                  <Button color="warning">
                    <a href={friend.url} target="blank">
                      Profile
                    </a>
                  </Button>
                </CardBody>
              </Card>
            </CardDeck>
          );
        })}
      </div>
    </div>
  );
};

export default Friends;
