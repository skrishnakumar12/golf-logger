CREATE DATABASE zbridwel;

USE zbridwel;

CREATE TABLE golf_table (
    id          INTEGER PRIMARY KEY AUTO_INCREMENT,
	username   VARCHAR(255) NOT NULL,
	course_name	VARCHAR(255) NOT NULL,
	date_score	DATE,
	score	INTEGER NOT NULL
);

SHOW TABLES;

INSERT INTO golf_table (username, course_name, date_score, score) VALUES("skrishnakumar", "Augusta", "2018-11-01", 74);
INSERT INTO golf_table (username, course_name, date_score, score) VALUES("zbridwell", "West Chase", "2018-10-14", 67);
INSERT INTO golf_table (username, course_name, date_score, score) VALUES("zbridwell", "Augusta", "2018-04-14", 73);
INSERT INTO golf_table (username, course_name, date_score, score) VALUES("dparker", "West Chase", "2017-09-11", 82);

SELECT * FROM golf_table;