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
      throw new ExpressError('No such pokemon', 404);
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
    const move = res.rows[0];

    if (!move || move.length === 0) {
      new ExpressError('No such move', 404);
    }

    return move;
  }

}

module.exports = Pokemon;
