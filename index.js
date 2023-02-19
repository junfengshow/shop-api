#!/usr/bin/env node

// module.exports = app;
// "rewrites": [{ "source": "/api/(.*)", "destination": "/api" }]
const express = require("express");
async function start() {
  const app = express();
  const port = process.env.PORT || 3008;

  app.get("/api", (req, res) => {
    res.end("Hello World! 1111");
  });

  app.get("/", (req, res) => {
    res.send("index");
  });
  app.server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  return app;
}

start();
