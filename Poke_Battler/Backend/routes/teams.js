/** Pokemon related routes. */

const Team = require('../models/team');
const express = require('express');
const router = new express.Router();
const {ExpressError} = require('../expressError');
// const { authenticateJWT } = require('../middleware/auth');

/** GET /
 *
 * Get list of teams. Only logged-in users should be able to use this.
 *
 */

router.get('/',  async function(req, res, next) {
  try {
    let teamList = await Team.getAll();
    return res.json({ team: teamList });
  } catch (err) {
    return next(err);
  }
}); // end

/** POST / { team } => { team }
 *
 */

router.post("/",  async function (req, res, next) {
  try {

    const team = await Team.create(req.body);
    return res.status(201).json({ team });
  } catch (err) {
    return next(err);
  }
});

/** GET /[team]
 *
 * Get details on a team. Only logged-in users should be able to use this.
 *
 * If user cannot be found, return a 404 err.
 *
 */


router.get('/:id',  async function(
  req,
  res,
  next
) {
  try {
    let team = await Team.get(req.params.id);
    if (!team) {
      throw new ExpressError('Team not found.', 404);
    }
    return res.json({ team });
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[team]  =>  { deleted: id }
 *
 * Authorization required: admin
 */

router.delete("/:id",  async function (req, res, next) {
  try {
    await Team.delete(req.params.id);
    return res.json({ deleted: +req.params.id });
  } catch (err) {
    return next(err);
  }
});



module.exports = router;
