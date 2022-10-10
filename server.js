require("dotenv").config(); //allows env variables to be set on process.env

const express = require("express");
const app = express();
const cors = require("cors");
const { authMiddleware } = require("./controllers/authControllers");

// parse requests of content-type - application/json (middleware)
app.use(express.json());

const whiteslist = ["http://localhost:3000"];
const options = {
  origin: (origin, callback) => {
    if (whiteslist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Domain not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(options));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome in todo application!" });
});

// Redirect requests to endpoint starting with /posts to postRoutes.js
app.use("/", require("./routes/userRoutes"));
app.use("/", require("./routes/authRoutes"));
app.use("/todos", authMiddleware, require("./routes/toDoRoutes"));

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`app is set up on http://localhost:${PORT}`)
);
