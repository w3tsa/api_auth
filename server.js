require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");

const authenticateToken = require("./middleware/authenticateToken");

const app = express();
app.use(express.json());

const posts = [
  {
    username: "Tanveer",
    title: "Post 1",
  },
  {
    username: "kyle",
    title: "Post 2",
  },
];

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
  //   res.json(req.user.name);
});

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
