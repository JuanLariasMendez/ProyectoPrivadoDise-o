//Se estará realizando un controlladore por cada endpoint/ruta que se tenga en el archivo endPoint.js
// Es decir que si en endPoint.js se tiene 5 rutas, se tendrán 5 controladores.
// Ademas de que se tendra la informacion presisa de lo que se esta realizando en cada endpoint.

//Se exporta la funcion ping que recibe dos parametros, req y res, que son la solicitud y la respuesta respectivamente.
module.exports.ping = (req, res) => {
  //module.exports nos permite exportar una función para que pueda ser utilizada en otro archivo.
  res.send("Soy un ping");
};
