const express = require("express");
const app = express();
const port = 3008;

app.get("/", (req, res) => {
  res.send("index");
});
app.get("/api", (req, res) => {
  res.send("Hello World! 1111");
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

module.exports = app;
