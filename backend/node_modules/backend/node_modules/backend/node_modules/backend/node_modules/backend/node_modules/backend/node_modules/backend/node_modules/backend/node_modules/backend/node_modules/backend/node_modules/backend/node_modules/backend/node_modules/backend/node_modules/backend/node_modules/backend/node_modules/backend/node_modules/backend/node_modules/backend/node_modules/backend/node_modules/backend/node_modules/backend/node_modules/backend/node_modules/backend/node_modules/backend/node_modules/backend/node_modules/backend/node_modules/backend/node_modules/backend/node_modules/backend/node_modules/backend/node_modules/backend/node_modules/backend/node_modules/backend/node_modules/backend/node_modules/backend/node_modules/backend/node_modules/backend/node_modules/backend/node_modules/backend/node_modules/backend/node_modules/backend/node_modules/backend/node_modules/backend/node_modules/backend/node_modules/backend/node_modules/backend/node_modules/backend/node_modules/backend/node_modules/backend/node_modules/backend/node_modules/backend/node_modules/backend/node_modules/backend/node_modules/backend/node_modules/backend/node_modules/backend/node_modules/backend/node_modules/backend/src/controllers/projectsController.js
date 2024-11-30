const connection = require("../models/db"); // Usamos la misma conexión que otros controladores

// Funciones del controlador
const getProjects = (req, res) => {
  const consult = "SELECT * FROM proyectos";
  try {
    connection.query(consult, (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Error al obtener los proyectos" });
      }
      res.status(200).json(results);
    });
  } catch (e) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const createProject = (req, res) => {
  const { nombre, descripcion, fecha_inicio, fecha_fin, id_creador } = req.body;
  const consult =
    "INSERT INTO proyectos (nombre, descripcion, fecha_inicio, fecha_fin, id_creador) VALUES (?, ?, ?, ?, ?)";

  try {
    connection.query(
      consult,
      [nombre, descripcion, fecha_inicio, fecha_fin, id_creador],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Error al crear el proyecto" });
        }

        const newProject = {
          id_proyecto: result.insertId,
          nombre,
          descripcion,
          fecha_inicio,
          fecha_fin,
          id_creador,
        };
        res.status(201).json(newProject);
      }
    );
  } catch (e) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const updateProject = (req, res) => {
  const { id_proyecto } = req.params;
  const { nombre, descripcion, fecha_inicio, fecha_fin, id_creador } = req.body;
  const consult =
    "UPDATE proyectos SET nombre = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ?, id_creador = ? WHERE id_proyecto = ?";

  try {
    connection.query(
      consult,
      [nombre, descripcion, fecha_inicio, fecha_fin, id_creador, id_proyecto],
      (err, result) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Error al actualizar el proyecto" });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Proyecto no encontrado" });
        }
        res.status(200).json({
          id_proyecto,
          nombre,
          descripcion,
          fecha_inicio,
          fecha_fin,
          id_creador,
        });
      }
    );
  } catch (e) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const deleteProject = (req, res) => {
  const { id_proyecto } = req.params;
  const consult = "DELETE FROM proyectos WHERE id_proyecto = ?";

  try {
    connection.query(consult, [id_proyecto], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al eliminar el proyecto" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Proyecto no encontrado" });
      }
      res.status(200).json({ message: "Proyecto eliminado" });
    });
  } catch (e) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Exportación de las funciones
module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};
