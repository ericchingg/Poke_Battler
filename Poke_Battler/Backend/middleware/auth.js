
"use strict";
/** Convenience middleware to handle common auth cases in routes. */
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");
/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username and isAdmin field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */
function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      const decoded = jwt.verify(token, SECRET_KEY);
      res.locals.user = decoded; // Store decoded user data
      // res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    return next();
  }
}
/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */
// function ensureLoggedIn(req, res, next) {
//   try {
//     if (!res.locals.user) throw new UnauthorizedError();
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// }
/** Middleware to use when they be logged in as an admin user.
 *
 *  If not, raises Unauthorized.
 */
function ensureAdmin(req, res, next) {
  try {
    if (!res.locals.user || !res.locals.user.isAdmin) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
}
/** Middleware to use when they must provide a valid token & be user matching
 *  username provided as route param.
 *
 *  If not, raises Unauthorized.
 */

function ensureCorrectUserOrAdmin(req, res, next) {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedError("Token is missing");
    }

    const token = authHeader.split(" ")[1]; // Extract the token from "Bearer <token>"
    console.log("Token received:", token); // Log the received token
    console.log("SECRET_KEY:", SECRET_KEY);
    // Verify the token
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("User from token:", user);

    console.log("Requested username from params:", req.params.username);

    // Check if the user is authenticated
    if (!user) {
      throw new UnauthorizedError("User not authenticated.");
    }

    // Check if the user is authorized (either the user themselves or an admin)
    if (!(user.username === req.params.username || user.isAdmin)) {
      throw new UnauthorizedError("Not authorized to perform this action.");
    }

    // Attach the user object to res.locals for further use
    res.locals.user = user;
    return next();
  } catch (err) {
    console.error("JWT Error:", err); // Log the error for debugging
    return next(err);
  }
}



module.exports = {
  authenticateJWT,
  // ensureLoggedIn,
  ensureAdmin,
  ensureCorrectUserOrAdmin,
};