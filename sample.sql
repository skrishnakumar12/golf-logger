CREATE DATABASE zbridwel;

USE zbridwel;

DROP TABLE IF EXISTS golf_table;
DROP TABLE IF EXISTS users;

CREATE TABLE golf_table (
    id          INTEGER PRIMARY KEY AUTO_INCREMENT,
	username   VARCHAR(255) NOT NULL,
	course_name	VARCHAR(255) NOT NULL,
	date_score	DATE,
	score	INTEGER NOT NULL
);

CREATE TABLE users_list (
    user		VARCHAR(255) PRIMARY KEY NOT NULL,
	pass   		VARCHAR(255) NOT NULL
);

INSERT INTO users_list (user, pass) VALUES("skrishnakumar", "test");
INSERT INTO users_list (user, pass) VALUES("zbridwell", "test");
INSERT INTO users_list (user, pass) VALUES("dparker", "test");

INSERT INTO golf_table (username, course_name, date_score, score) VALUES("skrishnakumar", "Augusta", "2018-11-01", 74);
INSERT INTO golf_table (username, course_name, date_score, score) VALUES("zbridwell", "West Chase", "2018-10-14", 67);
INSERT INTO golf_table (username, course_name, date_score, score) VALUES("zbridwell", "Augusta", "2018-04-14", 73);
INSERT INTO golf_table (username, course_name, date_score, score) VALUES("dparker", "West Chase", "2017-09-11", 82);

SHOW TABLES;

SELECT * FROM golf_table;
SELECT * FROM users_list;

