require("dotenv").config(); //allows env variables to be set on process.env

const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middlewares/authMiddleware");
const credentialsMiddleware = require("./middlewares/credentialsMiddleware");
const { logger } = require("./middlewares/logEvents");

//custom logger middleware
app.use(logger);

// parse requests of content-type - application/json (middleware)
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//Handle options credentials check - before CORS!
app.use(credentialsMiddleware);

//CORS policy handler
app.use(cors(corsOptions));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome in todo application!" });
});

// Redirect requests to endpoint starting with /todos to appropriate routes
app.use("/", require("./routes/userRoutes"));
app.use("/", require("./routes/authRoutes"));
// Add auth middleware to all routes that are private
app.use("/todos", authMiddleware, require("./routes/toDoRoutes"));

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`app is set up on http://localhost:${PORT}`)
);
