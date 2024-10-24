/** Express app */


const express = require("express");
const cors = require("cors");

const { ExpressError } = require("./expressError")
// const { authenticateJWT } = require("./middleware/auth");
const app = express();

// allow both form-encoded and json body parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// allow connections to all routes from any browser
app.use(cors());

// get auth token for all routes
// app.use(authenticateJWT);

/** routes */

const authRoutes = require("./routes/auth");
const pokeRoutes = require("./routes/pokemon");
const userRoutes = require("./routes/users");
const teamRoutes = require("./routes/teams");

app.use("/auth", authRoutes);
app.use("/pokemon", pokeRoutes);
app.use("/users", userRoutes);
app.use("/teams", teamRoutes);


/** 404 handler */

app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if (process.env.NODE_ENV != "test") console.error(err.stack);

  return res.json({
    error: err,
    message: err.message
  });
});


module.exports = app;
