import "./Login.css";
import { useState } from "react";

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
    // const username = e.target[0].value;
    // const password = e.target[1].value;
    console.log({
      username: username,
      password: password,
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
