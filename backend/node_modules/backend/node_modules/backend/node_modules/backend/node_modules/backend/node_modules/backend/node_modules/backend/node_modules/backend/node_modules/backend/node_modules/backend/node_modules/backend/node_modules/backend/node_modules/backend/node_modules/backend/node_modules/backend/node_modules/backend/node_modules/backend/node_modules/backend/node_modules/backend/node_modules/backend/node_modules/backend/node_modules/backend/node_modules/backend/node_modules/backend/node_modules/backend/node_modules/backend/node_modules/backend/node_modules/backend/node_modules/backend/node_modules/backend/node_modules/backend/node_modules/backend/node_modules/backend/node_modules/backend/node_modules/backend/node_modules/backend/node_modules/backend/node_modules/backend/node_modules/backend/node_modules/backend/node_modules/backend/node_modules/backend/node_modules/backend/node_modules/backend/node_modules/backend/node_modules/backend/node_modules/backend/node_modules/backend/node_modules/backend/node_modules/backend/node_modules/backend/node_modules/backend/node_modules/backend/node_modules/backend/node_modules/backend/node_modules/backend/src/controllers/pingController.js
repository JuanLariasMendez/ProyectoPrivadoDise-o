//Se estará realizando un controlladore por cada endpoint/ruta que se tenga en el archivo endPoint.js
// Es decir que si en endPoint.js se tiene 5 rutas, se tendrán 5 controladores.
// Ademas de que se tendra la informacion presisa de lo que se esta realizando en cada endpoint.

const connection = require("../models/db"); //Se importa la conexión a la base de datos

//Se exporta la funcion ping que recibe dos parametros, req y res, que son la solicitud y la respuesta respectivamente.
//module.exports nos permite exportar una función para que pueda ser utilizada en otro archivo.
module.exports.ping = (req, res) => {
  const consult = "SELECT * FROM login"; //Se crea una consulta SQL para obtener todos los registros de la tabla login

  try {
    connection.query(consult, (error, results) => {
      //Se ejecuta la consulta y se recibe un callback con el error y los resultados
      console.log(results);
      res.json(results); //Se envían los resultados como respuesta en formato JSON
    });
  } catch (e) {}
};
