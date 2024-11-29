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
('usuario1', 'password1'),
('usuario2', 'password2'),
('usuario3', 'password3');