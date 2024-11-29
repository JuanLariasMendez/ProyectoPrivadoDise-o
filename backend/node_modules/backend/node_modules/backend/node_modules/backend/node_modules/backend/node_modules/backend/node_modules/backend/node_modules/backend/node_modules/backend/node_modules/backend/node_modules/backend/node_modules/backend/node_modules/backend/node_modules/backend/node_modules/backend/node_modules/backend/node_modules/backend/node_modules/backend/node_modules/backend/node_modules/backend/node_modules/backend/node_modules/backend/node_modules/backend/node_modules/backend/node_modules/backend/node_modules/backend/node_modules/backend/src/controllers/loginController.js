const connection = require("../models/db"); //Se importa la conexión a la base de datos
const jwt = require("jsonwebtoken"); //libreria necesaria para la creacion de tokens en la autenticacion

module.exports.login = (req, res) => {
  const { username, password } = req.body; //Se extraen las credenciales del cuerpo de la solicitud

  //consulta sql para obtener el usuario y la contraseña y verificar si son correctos
  const consult = `SELECT * FROM login WHERE username = ? AND password = ?`;

  try {
    connection.query(consult, [username, password], (err, result) => {
      //Se ejecuta la consulta y se recibe un callback con el error y los resultados
      if (err) {
        res.send(err);
      }

      if (result.length > 0) {
        const token = jwt.sign({ username }, "Stack", {
          expiresIn: "3m",
        });

        //console.log(result);
        res.send({ token });
      } else {
        console.log("usuario incorrecto");
        res.send({ message: "usuario incorrecto" });
      }
    });
  } catch (e) {}
};
