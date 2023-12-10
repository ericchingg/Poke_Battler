DROP DATABASE IF EXISTS soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league

CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  team_name TEXT NOT NULL,
  team_location TEXT NOT NULL,
  ranking INTEGER
);

CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  player_name TEXT NOT NULL,
  team_id INTEGER
);

CREATE TABLE referees (
  id SERIAL PRIMARY KEY,
  ref_name TEXT NOT NULL
);

CREATE TABLE game_schedule (
  id SERIAL PRIMARY KEY,
  game_date TEXT,
  home_team INTEGER,
  away_team INTEGER,
  ref_id INTEGER
);

CREATE TABLE game_score (
  id SERIAL PRIMARY KEY,
  home_scorer INTEGER,
  home_goals INTEGER,
  away_scorer INTEGER,
  away_goals INTEGER
);

ALTER TABLE players ADD FOREIGN KEY (team_id) REFERENCES teams (id);

ALTER TABLE game_schedule ADD FOREIGN KEY (ref_id) REFERENCES referees (id);

ALTER TABLE game_schedule ADD FOREIGN KEY (home_team) REFERENCES teams (id);

ALTER TABLE game_schedule ADD FOREIGN KEY (away_team) REFERENCES teams (id);

ALTER TABLE game_score ADD FOREIGN KEY (id) REFERENCES game_schedule (id);

ALTER TABLE game_score ADD FOREIGN KEY (home_scorer) REFERENCES players (id);

ALTER TABLE game_score ADD FOREIGN KEY (away_scorer) REFERENCES players (id);


INSERT INTO teams (team_name, team_location, ranking) VALUES ('Bulls', 'New York', 3);
INSERT INTO teams (team_name, team_location, ranking) VALUES ('Cubs', 'Dallas', 1);
INSERT INTO players (player_name, team_id) VALUES ('Larry David', 1);
INSERT INTO players (player_name, team_id) VALUES ('Richard Parker', 2);
INSERT INTO referees (ref_name) VALUES ('Michael Jordan');
INSERT INTO game_schedule (game_date, home_team, away_team, ref_id) VALUES (07-10-2023, 1, 2, 1);
INSERT INTO game_score (home_scorer, home_goals, away_scorer, away_goals) VALUES (1, 1, 2, 1);
