import "./Login.css";

const Login = () => {
  return (
    <div>
      <form action="">
        <label className="custom-label">Username:</label>
        <input type="text" className="custom-input" />
        <label className="custom-label">Password:</label>
        <input type="password" className="custom-input" />
        <button type="submit" className="custom-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
