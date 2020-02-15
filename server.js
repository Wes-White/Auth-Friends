const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;
const app = express();
const token =
  "esfeyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NUIhkufemQifQ";

let nextId = 7;

let friends = [
  {
    id: 1,
    name: "Rachel Green",
    age: 30,
    email: "rachel@friends.com",
    url: "https://friends.fandom.com/wiki/Rachel_Greene",
    img:
      "https://vignette.wikia.nocookie.net/friends/images/3/38/RachelGreen.jpg/revision/latest?cb=20180426182043"
  },
  {
    id: 2,
    name: "Joey Tribbiani",
    age: 34,
    email: "joey@friends.com",
    url: "https://friends.fandom.com/wiki/Joey_Tribbiani",
    img:
      "https://vignette.wikia.nocookie.net/friends/images/f/f5/JoeyTribbiani.jpg/revision/latest?cb=20180424154245"
  },
  {
    id: 3,
    name: "Chandler Bing",
    age: 32,
    email: "chandler@friends.com",
    url: "https://friends.fandom.com/wiki/Chandler_Bing",
    img:
      "https://vignette.wikia.nocookie.net/friends/images/4/48/Chandler_Bing_portrait.jpg/revision/latest?cb=20100601130820"
  },
  {
    id: 4,
    name: "Ross Geller",
    age: 32,
    email: "ross@friends.com",
    url: "https://friends.fandom.com/wiki/Ross_Geller",
    img:
      "https://vignette.wikia.nocookie.net/friends/images/0/0b/RossGeller.jpg/revision/latest?cb=20180424154547"
  },
  {
    id: 5,
    name: "Monica Bing",
    age: 31,
    email: "monica@friends.com",
    url: "https://friends.fandom.com/wiki/Monica_Geller",
    img:
      "https://vignette.wikia.nocookie.net/friends/images/2/2f/Monica_Geller-Bing_Season_10.png/revision/latest?cb=20180426182234"
  },
  {
    id: 6,
    name: "Phoebe Buffay-Hannigan",
    age: 30,
    email: "phoebe@friends.com",
    url: "https://friends.fandom.com/wiki/Phoebe_Buffay",
    img:
      "https://vignette.wikia.nocookie.net/friends/images/3/30/PhoebeBuffay.jpg/revision/latest?cb=20180426182547"
  }
];

app.use(bodyParser.json());

app.use(cors());

function authenticator(req, res, next) {
  const { authorization } = req.headers;
  if (authorization === token) {
    next();
  } else {
    res.status(403).json({ error: "User must be logged in to do that." });
  }
}

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "Lambda School" && password === "i<3Lambd4") {
    req.loggedIn = true;
    res.status(200).json({
      payload: token
    });
  } else {
    res
      .status(403)
      .json({ error: "Username or Password incorrect. Please see Readme" });
  }
});

app.get("/api/friends", authenticator, (req, res) => {
  setTimeout(() => {
    res.send(friends);
  }, 1000);
});

app.get("/api/friends/:id", authenticator, (req, res) => {
  const friend = friends.find(f => f.id == req.params.id);

  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).send({ msg: "Friend not found" });
  }
});

app.post("/api/friends", authenticator, (req, res) => {
  const friend = { id: getNextId(), ...req.body };

  friends = [...friends, friend];

  res.send(friends);
});

app.put("/api/friends/:id", authenticator, (req, res) => {
  const { id } = req.params;

  const friendIndex = friends.findIndex(f => f.id == id);

  if (friendIndex > -1) {
    const friend = { ...friends[friendIndex], ...req.body };

    friends = [
      ...friends.slice(0, friendIndex),
      friend,
      ...friends.slice(friendIndex + 1)
    ];
    res.send(friends);
  } else {
    res.status(404).send({ msg: "Friend not found" });
  }
});

app.delete("/api/friends/:id", authenticator, (req, res) => {
  const { id } = req.params;

  friends = friends.filter(f => f.id !== Number(id));

  res.send(friends);
});

function getNextId() {
  return nextId++;
}

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
