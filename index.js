const express = require("express");
const app = express();
const port = process.env.PORT || 3008;

app.get("/api", (req, res) => {
  res.end("Hello World! 1111");
});

app.get("/", (req, res) => {
  res.send("index");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
// "rewrites": [{ "source": "/api/(.*)", "destination": "/api" }]
