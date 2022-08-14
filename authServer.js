require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");

const generateAccessToken = require("./middleware/generateAccessToken");

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
let refreshTokens = [];

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken === null) return res.sendStatus(401);
  if (!refreshToken.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken });
  });
});

app.post("/login", (req, res) => {
  // Authenticate User
  const username = req.body.username;
  const user = { name: username };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.json({ accessToken, refreshToken });
});

const PORT = 4000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
