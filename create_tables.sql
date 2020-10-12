CREATE TABLE IF NOT EXISTS author (
    id              SERIAL          PRIMARY KEY,
    name            TEXT            NOT NULL,
    counter         INT             DEFAULT 0      
);

CREATE TABLE IF NOT EXISTS quote (
    id              SERIAL          PRIMARY KEY,
    author          INT             references author(id),
    quote           TEXT            NOT NULL
);

CREATE TABLE IF NOT EXISTS subscriber (
    id              SERIAL          PRIMARY KEY,
    phone_number    TEXT            NOT NULL
);

CREATE TABLE IF NOT EXISTS subscriber_author (
    id              SERIAL          PRIMARY KEY,
    subscriber      INT             references subscriber(id),
    author          INT             references author(id)
);