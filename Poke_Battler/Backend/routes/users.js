
// ** Routes for users. */
const express = require("express");
const { authenticateJWT } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/createToken");
const router = express.Router();
/** POST / { user }  => { user, token }
 *
 * Adds a new user.
 *
 **/
router.post("/", async function (req, res, next) {
  try {
    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
});
/** GET / => { users: [ {username, email }, ... ] }
 *
 * Returns list of all users.
 *
 * Authorization required: admin
 **/
router.get("/", async function (req, res, next) {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});
/** GET /[username] => { user }
 *
 *
 * Authorization required: admin or same user-as-:username
 **/
router.get("/:username",  async function (req, res, next) {
  try {
    console.log("Fetching user with username:", req.params.username);
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});
/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { firstName, lastName, password, email }
 *
 * Returns { username, firstName, lastName, email, isAdmin }
 *
 * Authorization required: admin or same-user-as-:username
 **/
router.patch("/:username", authenticateJWT, async function (req, res, next) {
  try {
    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});
/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: admin or same-user-as-:username
 **/
router.delete("/:username", authenticateJWT, async function (req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (err) {
    return next(err);
  }
});
/** POST /[username]/teams/[id]  { state } => { application }
 *
 *
 * Authorization required: admin or same-user-as-:username
 * */
router.post("/:username/teams/:id", authenticateJWT, async function (req, res, next) {
  try {
    const teamId = +req.params.id;
    await User.createTeam(req.params.username, teamId);
    return res.json({ team: teamId });
  } catch (err) {
    return next(err);
  }
});
module.exports = router;