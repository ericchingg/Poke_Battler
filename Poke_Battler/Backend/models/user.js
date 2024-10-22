const bcrypt = require('bcrypt');
const db = require('../db');
const { ExpressError } = require('../expressError');
// const sqlForPartialUpdate = require('../helpers/partialUpdate');
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {

/** Register user with data. Returns new user data. */

  static async register({username, email, password}) {
    const duplicateCheck = await db.query(
      `SELECT username 
        FROM users 
        WHERE username = $1`,
      [username]
    );

    if (duplicateCheck.rows[0]) {
      throw new ExpressError(
        `There already exists a user with username '${username}'`,
        400
      );
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users 
          (username, email, password) 
        VALUES ($1, $2, $3) 
        RETURNING username, email`,
      [
        username,
        email,
        hashedPassword
      ]
    );

    console.log("Registered user:", result.rows[0]); // Log the result
    return result.rows[0];
  }


  /** Is this username + password combo correct?
   *
   * Return all user data if true, throws error if invalid
   *
   * */

  static async authenticate(username, password) {
    const result = await db.query(
      `SELECT username,
                email,
                password
            FROM users 
            WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];
    console.log("Query Result (auth):", user);

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        delete user.password;
        return user;
      }
    }

    throw new ExpressError("Invalid username/password");
  }

  /** Returns user info: {username, first_name, last_name, email, phone}
   *
   * If user cannot be found, should raise a 404.
   *
   **/

  static async get(username) {
    const result = await db.query(
      `SELECT username,
                email
         FROM users
         WHERE username = $1`,
      [username]
    );

    console.log("Query result (get):", result.rows);

    const user = result.rows[0];

    if (!user) {
      throw new ExpressError('No such user', 404);
    }

    return user;
  }

  /** Selectively updates user from given data
   *
   * Returns all data about user.
   *
   * If user cannot be found, should raise a 404.
   *
   **/

  static async update(username, data) {
    let { query, values } = sqlForPartialUpdate(
      'users',
      data,
      'username',
      username
    );

    const result = await db.query(query, values);
    const user = result.rows[0];

    if (!user) {
      throw new ExpressError('No such user', 404);
    }

    return user;
  }

  /** Delete user. Returns true.
   *
   * If user cannot be found, should raise a 404.
   *
   **/

  static async remove(username) {
    const result = await db.query(
      'DELETE FROM users WHERE username = $1 RETURNING username',
      [username]
    );
    const user = result.rows[0];

    if (!user) {
      throw new ExpressError('No such user', 404);
    }

    return true;
  }

    /** Create a team for user: update db, returns undefined.
   *
   **/

    static async createTeam(userID, teamID, pokeID) {
      const preCheck = await db.query(
            `SELECT id
             FROM team
             WHERE id = $1`, [teamID]);
      const team = preCheck.rows[0];
  
      if (!team) throw new NotFoundError(`No team: ${teamID}`);
  
      const preCheck2 = await db.query(
            `SELECT id
             FROM users
             WHERE id = $1`, [userID]);
      const user = preCheck2.rows[0];

      if (!user) throw new NotFoundError(`No username: ${userID}`);

      const preCheck3 = await db.query(
        `SELECT id
         FROM pokemon
         WHERE id = $1`, [pokeID]);
  const pokemon = preCheck3.rows[0];
  
      if (!pokemon) throw new NotFoundError(`No pokemon: ${pokeID}`);
  
      await db.query(
            `INSERT INTO poketeam (userID, teamID, pokeID)
             VALUES ($1, $2, $3)`,
          [userID, teamID, pokeID]);
    }
}

module.exports = User;
