CREATE DATABASE swarm;

\c swarm;

CREATE TABLE example(
  id SERIAL NOT NULL PRIMARY KEY,
  swarm_message VARCHAR(20)
);

INSERT INTO example (swarm_message) VALUES ('THIS IS THE SWARM!');