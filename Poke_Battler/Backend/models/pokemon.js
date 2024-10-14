const db = require('../db');
const ExpressError = require('../expressError');

class Pokemon {

  /** Returns list of user info:
   *
   * [{username, first_name, last_name, email, phone}, ...]
   *
   * */

  static async getAll() {
    const result = await db.query(
      `SELECT id,
                name,
                type,
                health,
                sprite
            FROM pokemon
            ORDER BY id`
    );
    return result.rows;
  }

  /** Returns user info: {username, first_name, last_name, email, phone}
   *
   * If user cannot be found, should raise a 404.
   *
   **/

  static async get(id) {
    const result = await db.query(
      `SELECT id,
                name,
                type,
                health,
                sprite
         FROM pokemon
         WHERE id = $1`,
      [id]
    );

    const pokemon = result.rows[0];

    if (!pokemon) {
      throw new ExpressError(`No such pokemon found`, 404);
    }

    return pokemon;
  }

  static async getMovesForPokemon(id) {
    const res = await db.query(
      `SELECT moves.id, moves.name, moves.type, moves.damage, moves.accuracy 
       FROM pokemoves 
       JOIN moves ON pokemoves.moves_id = moves.id 
       WHERE pokemoves.poke_id = $1`,
      [id]
    );
  
    console.log("Moves found:", res.rows);
  
    // Check if there are any moves found
    if (res.rows.length === 0) {
      throw new ExpressError('No moves found for this Pokémon', 404);
    }
  
    return res.rows; // Return all moves instead of just the first one
  }

}

module.exports = Pokemon;
