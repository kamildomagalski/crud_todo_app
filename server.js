require("dotenv").config(); //allows env variables to be set on process.env

const express = require("express");
const app = express();
const db = require("./config/db");

// parse requests of content-type - application/json (middleware)
app.use(express.json());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome in todo application!" });
});

// Redirect requests to endpoint starting with /posts to postRoutes.js
app.use("/todos", require("./routes/toDoRoutes"));

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`app is set up on http://localhost:${PORT}`)
);
