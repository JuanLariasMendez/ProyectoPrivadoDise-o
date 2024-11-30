const connection = require("../models/db");

// Función para obtener el progreso mensual
const getMonthProgress = (req, res) => {
  const consult = `
    SELECT
      DATE_FORMAT(fecha_creacion, '%Y-%m') AS month,
      COUNT(CASE WHEN estado = 'Pendiente' THEN 1 END) AS pending,
      COUNT(CASE WHEN estado = 'Completada' THEN 1 END) AS completed,
      COUNT(CASE WHEN estado = 'Fallida' THEN 1 END) AS failed
    FROM pruebas
    GROUP BY month
    ORDER BY month ASC
  `;

  try {
    connection.query(consult, (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Error al obtener el progreso mensual" });
      }
      res.status(200).json(results);
    });
  } catch (e) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Exportación de las funciones
module.exports = {
  getMonthProgress,
};
