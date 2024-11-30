const connection = require("../models/db");

// Funciones del controlador
const getTests = (req, res) => {
  const consult = "SELECT * FROM pruebas";
  try {
    connection.query(consult, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al obtener las pruebas" });
      }
      res.status(200).json(results);
    });
  } catch (e) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const createTest = (req, res) => {
  const { id_proyecto, descripcion, estado } = req.body;
  const consult =
    "INSERT INTO pruebas (id_proyecto, descripcion, estado) VALUES (?, ?, ?)";

  try {
    connection.query(
      consult,
      [id_proyecto, descripcion, estado],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Error al crear la prueba" });
        }

        const newTest = {
          id_prueba: result.insertId,
          id_proyecto,
          descripcion,
          estado,
          fecha_creacion: new Date().toISOString(),
        };
        res.status(201).json(newTest);
      }
    );
  } catch (e) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const updateTest = (req, res) => {
  const { id_prueba } = req.params;
  const { id_proyecto, descripcion, estado } = req.body;
  const consult =
    "UPDATE pruebas SET id_proyecto = ?, descripcion = ?, estado = ? WHERE id_prueba = ?";

  try {
    connection.query(
      consult,
      [id_proyecto, descripcion, estado, id_prueba],
      (err, result) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Error al actualizar la prueba" });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Prueba no encontrada" });
        }
        res.status(200).json({
          id_prueba,
          id_proyecto,
          descripcion,
          estado,
        });
      }
    );
  } catch (e) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const deleteTest = (req, res) => {
  const { id_prueba } = req.params;
  const consult = "DELETE FROM pruebas WHERE id_prueba = ?";

  try {
    connection.query(consult, [id_prueba], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al eliminar la prueba" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Prueba no encontrada" });
      }
      res.status(200).json({ message: "Prueba eliminada" });
    });
  } catch (e) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Exportación de las funciones
module.exports = {
  getTests,
  createTest,
  updateTest,
  deleteTest,
};
