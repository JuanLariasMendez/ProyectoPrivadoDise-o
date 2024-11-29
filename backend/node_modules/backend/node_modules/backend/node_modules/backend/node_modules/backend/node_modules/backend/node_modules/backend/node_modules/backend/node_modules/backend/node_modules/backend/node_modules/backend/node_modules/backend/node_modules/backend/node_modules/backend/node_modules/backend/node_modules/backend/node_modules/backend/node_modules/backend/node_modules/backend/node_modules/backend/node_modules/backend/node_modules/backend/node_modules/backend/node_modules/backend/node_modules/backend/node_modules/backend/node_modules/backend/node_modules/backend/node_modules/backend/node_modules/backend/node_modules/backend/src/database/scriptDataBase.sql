CREATE DATABASE privadodiseño;
USE privadodiseño;

-- Este script crea la tabla de usuarios en la base de datos.
crea la tabla de usuarios
CREATE TABLE login (
	username VARCHAR(50) NOT NULL,
	PASSWORD VARCHAR(50) NOT NULL,
	PRIMARY KEY(username)
);


-- inserta los usuarios
INSERT INTO login (username, password) VALUES
('user1', 'password1'),
('user2', 'password2'),
('user3', 'password3');