\echo 'Delete and recreate poke_battler db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE poke_battler;
CREATE DATABASE poke_battler;
\connect poke_battler

\i data-schema.sql
\i data-seed.sql

\echo 'Delete and recreate poke_battler_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE poke_battler_test;
CREATE DATABASE poke_battler_test;
\connect poke_battler_test

\i data-schema.sql