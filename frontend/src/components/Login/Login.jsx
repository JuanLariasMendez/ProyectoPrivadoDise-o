import "./Login.css";
import { useState } from "react";
import Home from "../Home/Home";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loginSuccessful, setLoginSuccess] = useState(false);

  /**
   * Maneja el evento de inicio de sesión.
   *
   * @param {Event} e - El evento de envío del formulario.
   * @returns {void}
   */
  const handdleLogin = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };

    // Hacer una solicitud POST a la API para iniciar sesión y manda las credeciales al servidor
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json()) // Recibe la respuesta del servidor
      .then((result) => {
        //comprobamos si el token existe
        if (result.token) {
          localStorage.setItem("token", result.token); //setteamos globalmente el token, ademas de que lo valida
          setLoginSuccess(true);
        } else {
          setLoginSuccess(false);
        }
        //console.log(result.token); // Muestra el token de la autenticacion en la consola
      })
      .catch((error) => {
        // Muestra el error en la consola
        console.error("Error:", error);
      });
  };

  return (
    <>
      {loginSuccessful ? (
        <Home />
      ) : (
        <div className="grid h-screen w-screen place-items-center bg-gray-50">
          <Card className="w-[400px] shadow-lg">
            <CardHeader>
              <CardTitle>Inicio de Sesión</CardTitle>
              <CardDescription>
                Ingresa tus credenciales para acceder al sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant="default"
                onClick={handdleLogin}
              >
                Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default Login;
