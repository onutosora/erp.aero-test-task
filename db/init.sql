CREATE SCHEMA erp_aero;
USE erp_aero;

CREATE TABLE users(
    id varchar(50) NOT NULL PRIMARY KEY,
    password text NOT NULL
);
CREATE TABLE jwt_tokens(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    token text NOT NULL,
    type varchar(10) NOT NULL,
    owner varchar(50) REFERENCES users(id),
    blocked boolean NOT NULL DEFAULT false
);
