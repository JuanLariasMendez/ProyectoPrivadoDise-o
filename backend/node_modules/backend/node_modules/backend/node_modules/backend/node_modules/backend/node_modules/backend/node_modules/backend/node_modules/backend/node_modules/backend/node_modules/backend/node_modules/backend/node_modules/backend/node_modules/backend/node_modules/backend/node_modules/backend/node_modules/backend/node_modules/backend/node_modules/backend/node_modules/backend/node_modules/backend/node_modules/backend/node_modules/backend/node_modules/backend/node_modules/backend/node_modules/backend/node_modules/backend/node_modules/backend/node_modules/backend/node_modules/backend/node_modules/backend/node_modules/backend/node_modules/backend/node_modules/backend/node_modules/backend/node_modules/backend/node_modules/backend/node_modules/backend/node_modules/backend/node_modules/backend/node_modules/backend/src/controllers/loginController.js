const connection = require("../models/db"); //Se importa la conexión a la base de datos

module.exports.login = (req, res) => {
  const user = req.body; //Se extraen las credenciales del cuerpo de la solicitud
  console.log(user);
};
