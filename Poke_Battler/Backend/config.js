/** Shared config for application; can be req'd many places. */

require('dotenv');

const SECRET_KEY = process.env.SECRET_KEY || 'development-secret-key';

const PORT = +process.env.PORT || 3001;

const BCRYPT_WORK_FACTOR = 10;

let DB_URI;

if (process.env.NODE_ENV === 'test') {
  DB_URI = 'postgresql:///poke_battler_test';
} else {
  DB_URI = 'postgresql:///poke_battler';
}


module.exports = {
  BCRYPT_WORK_FACTOR,
  SECRET_KEY,
  PORT,
  DB_URI
};
