CREATE DATABASE privadodiseño;
USE privadodiseño;

-- Este script crea la tabla de usuarios en la base de datos.
crea la tabla de usuarios
CREATE TABLE login (
	username VARCHAR(50) NOT NULL,
	PASSWORD VARCHAR(50) NOT NULL,
	PRIMARY KEY(username)
);

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    rol ENUM('Administrador', 'Tester', 'Desarrollador') NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE proyectos (
    id_proyecto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    id_creador INT NOT NULL,
    FOREIGN KEY (id_creador) REFERENCES usuarios(id_usuario)
);

CREATE TABLE pruebas (
    id_prueba INT AUTO_INCREMENT PRIMARY KEY,
    id_proyecto INT NOT NULL,
    descripcion TEXT NOT NULL,
    estado ENUM('Pendiente', 'Completada', 'Fallida') DEFAULT 'Pendiente',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_proyecto) REFERENCES proyectos(id_proyecto)
);


-- inserta los usuarios
INSERT INTO login (username, password) VALUES
('user1', 'password1'),
('user2', 'password2'),
('user3', 'password3');