const mysql = require("mysql"); //crea una conexión a la base de datos MySQL

//Se crea una conexión a la base de datos
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "privadodiseño",
});

module.exports = connection; //permite exportar la conexión para que pueda ser utilizada en otro archivo
