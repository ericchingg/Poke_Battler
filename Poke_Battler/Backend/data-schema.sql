
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username text NOT NULL,
    email text NOT NULL UNIQUE,
    password text NOT NULL
);

CREATE TABLE pokemon (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    type text NOT NULL,
    health integer NOT NULL,
    sprite text NOT NULL
);

CREATE TABLE team (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users ON DELETE CASCADE,
    name text NOT NULL
);    

CREATE TABLE poketeam (
    team_id integer NOT NULL REFERENCES team ON DELETE CASCADE,
    poke_id integer NOT NULL REFERENCES pokemon ON DELETE CASCADE,
    user_id integer NOT NULL REFERENCES users ON DELETE CASCADE,
    PRIMARY KEY (team_id, poke_id, user_id)
);

CREATE TABLE moves (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    type text NOT NULL,
    damage integer NOT NULL,
    accuracy integer NOT NULL
);

CREATE TABLE pokemoves (
    moves_id integer NOT NULL REFERENCES moves,
    poke_id integer NOT NULL REFERENCES pokemon,
    PRIMARY KEY (moves_id, poke_id)
);