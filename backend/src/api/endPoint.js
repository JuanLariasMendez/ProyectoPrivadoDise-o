/* Un endpoint es una URL específica en una API que permite a los clientes (como aplicaciones web o móviles) 
 interactuar con el servidor. Cada endpoint está asociado con una ruta y un método HTTP (GET, POST, PUT, DELETE, etc.)
 y define cómo se debe manejar una solicitud en esa ruta. Por ejemplo, un endpoint podría ser "/users" con el método GET
 para obtener una lista de usuarios, o "/users" con el método POST para crear un nuevo usuario. */

const express = require("express"); //Se importa el modulo express
const router = express.Router(); //Se crea una instancia de Router de express
const { ping } = require("../controllers/pingController"); //Se importa la funcion ping del controlador pingController
const { login } = require("../controllers/loginController"); //Se importa la funcion login del controlador loginController

router.get("/ping", ping); //Se crea una ruta que recibe un GET y llama a la funcion ping

router.post("/login", login); //Se crea una ruta que recibe un POST y llama a la funcion login

module.exports = router; //Se exporta el router para que pueda ser utilizado en otro archivo
