const path = require("path");
const express = require("express");

let server = express();

server.use(express.static(path.resolve(__dirname, "../front/build")));

server.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

server.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../front/build", "index.html"));
});

server.listen(4000, () => {
  console.log("http://localhost:4000");
});
