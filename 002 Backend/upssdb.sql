create database upssdb;
use upssdb;

INSERT INTO role(role_name) VALUES('ROLE_ADMIN');
INSERT INTO role(role_name) VALUES('ROLE_MODERATOR');
INSERT INTO role(role_name) VALUES('ROLE_USER');

SET SQL_SAFE_UPDATES = 0;
DELETE FROM role;
SET SQL_SAFE_UPDATES = 1;