/** Pokemon related routes. */

const Pokemon = require('../models/pokemon');
const express = require('express');
const router = new express.Router();
const { ExpressError } = require('../expressError');
// const { authenticateJWT } = require('../middleware/auth');

/** GET /
 *
 * Get list of pokemon. Only logged-in users should be able to use this.
 *
 *
 */

router.get('/',  async function(req, res, next) {
  try {
    let pokemonList = await Pokemon.getAll();
    return res.json({ pokemon: pokemonList });
  } catch (err) {
    return next(err);
  }
}); // end


/** GET /[pokemon]
 *
 * Get details on a pokemon. Only logged-in users should be able to use this.
 *
 * If pokemon cannot be found, return a 404 err.
 *
 */

// added error handler for missing user.
router.get('/:id',  async function(
  req,
  res,
  next
) {
  try {
    let pokemon = await Pokemon.get(req.params.id);
    return res.json({ pokemon });
  } catch (err) {
    return next(err);
  }
});

router.get('/:id/moves',  async function(
  req,
  res,
  next
) {
  try {

    const moves = await Pokemon.getMovesForPokemon(req.params.id);
    console.log(moves);
    if (!moves || moves.length === 0) {
      throw new ExpressError('Move not found.', 404);
    }
    return res.json({ moves });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
