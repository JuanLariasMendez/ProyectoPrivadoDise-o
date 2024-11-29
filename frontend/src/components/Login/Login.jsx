import "./Login.css";
import { useState } from "react";

// Funcion para decodificar el token de autenticacion
function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

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
        // Muestra el resultado en la consola
        console.log(parseJwt(result.token)); // Decodifica el token de la autenticacion y lo muestra en la consola
      })
      .catch((error) => {
        // Muestra el error en la consola
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <form action="">
        <label className="custom-label">Username:</label>
        <input
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          placeholder="username"
          className="custom-input"
          type="text"
        />
        <label className="custom-label">Password:</label>
        <input
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="password"
          className="custom-input"
          type="password"
        />
        <button type="submit" className="custom-button" onClick={handdleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
