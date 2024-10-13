const bcrypt = require('bcrypt');
const db = require('../db');
const ExpressError = require('../expressError');
// const sqlForPartialUpdate = require('../helpers/partialUpdate');
const { BCRYPT_WORK_FACTOR } = require("../config");

class Team {

  static async create(data) {
    const result = await db.query(
        `INSERT INTO team (user_id,
                              name
               VALUES ($1, $2)
               RETURNING id, user_id, name`,
            [
              data.user_id,
              data.name
            ]);
        let team = result.rows[0];
    
        return team;
      }  

  /** Returns list of teams:
   *
   * [{}, ...]
   *
   * */

  static async getAll() {
    const result = await db.query(
      `SELECT id,
                name,
                user_id
            FROM team
            ORDER BY id`
    );
    return result.rows;
  }

  /** Returns team info: {name, user_id}
   *
   * If team cannot be found, should raise a 404.
   *
   **/

  static async get(team) {
    const result = await db.query(
      `SELECT id,
                name,
                user_id
         FROM team
         WHERE name = $1`,
      [team]
    );

    const teamResult = result.rows[0];

    if (!teamResult) {
      new ExpressError('No such team', 404);
    }

    return team;
  }


   /** Delete team. Returns true.
   *
   * If team cannot be found, should raise a 404.
   *
   **/

   static async delete(id) {
    const result = await db.query(
      'DELETE FROM team WHERE id = $1 RETURNING name',
      [id]
    );
    const teamResult = result.rows[0];

    if (!teamResult) {
      throw new ExpressError('No team found', 404);
    }

    return true;
  }


}

module.exports = Team;