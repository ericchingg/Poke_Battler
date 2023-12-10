DROP DATABASE IF EXISTS craigslist;

CREATE DATABASE craigslist;

\c craigslist

CREATE TABLE region (
  id SERIAL PRIMARY KEY,
  region_name TEXT NOT NULL,
  location_name TEXT UNIQUE
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_name TEXT UNIQUE,
  preferred_region INTEGER
);

CREATE TABLE post (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  comment TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  location_post INTEGER
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  category_name TEXT UNIQUE,
  post_id INTEGER 
);


ALTER TABLE users ADD FOREIGN KEY (preferred_region) REFERENCES region (id);

ALTER TABLE post ADD FOREIGN KEY (location_post) REFERENCES region (id);

ALTER TABLE post ADD FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE categories ADD FOREIGN KEY (post_id) REFERENCES post (id);


INSERT INTO region (region_name, location_name) VALUES ('NYC', 'Brooklyn');
INSERT INTO users (user_name, preferred_region) VALUES ('teadrinker', 1);
INSERT INTO post (title, comment, user_id, location_post) VALUES ('Selling Tea', 'I have a lot of tea to sell', 1, 1);
INSERT INTO categories (category_name, post_id) VALUES ('selling', 1);