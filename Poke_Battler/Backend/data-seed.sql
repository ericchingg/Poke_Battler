INSERT INTO users (username, email, password)
VALUES ('testuser',
        'testuser@test.com',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q');

INSERT INTO pokemon (name, type, health, sprite)
VALUES ('Bulbasaur',
        'Grass',
        128,
        'https://img.pokemondb.net/sprites/x-y/normal/bulbasaur.png'),
        ('Charmander',
        'Fire',
        118,
        'https://img.pokemondb.net/sprites/x-y/normal/charmander.png'),
        ('Squirtle',
        'Water',
        127,
        'https://img.pokemondb.net/sprites/x-y/normal/squirtle.png');


INSERT INTO moves (name, type, damage, accuracy)
VALUES ('Seed Bomb',
        'Grass',
        31,
        80),
        ('Flamethrower',
        'Fire',
        38,
        75),
        ('Aqua Tail',
        'Water',
        32,
        78);


INSERT INTO pokemoves (moves_id, poke_id)
VALUES (1,
        1),
        (2,
        2),
        (3,
        3);