-- Structure and code for generating database
CREATE DATABASE drag_draft_2022;

CREATE TABLE queens (
    queen_id SERIAL PRIMARY KEY,
    queen_name TEXT NOT NULL,
    maxi_wins INT NOT NULL,
    mini_wins INT NOT NULL,
    ls_wins INT NOT NULL,
    top_three INT NOT NULL,
    winner INT NOT NULL, 
    elim_week INT, 
    total_points INT NOT NULL
);

CREATE TABLE weeks (
    week_id SERIAL PRIMARY KEY,
    week_number INT NOT NULL,
    maxi_winner INT [],
    mini_winner INT [],
    ls_winner INT [],
    elims INT [],
    top_three INT [],
    winner INT []
);

CREATE TABLE players (
    player_id SERIAL PRIMARY KEY,
    player_name TEXT NOT NULL,
    player_queens INT [] NOT NULL,
    player_points INT NOT NULL
);