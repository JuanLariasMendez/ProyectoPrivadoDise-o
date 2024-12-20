import Login from "../Login/Login.jsx";
import Home from "../Home/Home.jsx";

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

let tokenExistAndStillValid = false;
const token = localStorage.getItem("token");
if (token) {
  const parsedToken = parseJwt(token);
  tokenExistAndStillValid = parsedToken.exp * 1000 > Date.now();
}

const Main = () => {
  return <>{tokenExistAndStillValid ? <Home /> : <Login />}</>; // Si el token existe y es valido, se muestra la pagina principal, de lo contrario se muestra la pagina de login
};

export default Main;
