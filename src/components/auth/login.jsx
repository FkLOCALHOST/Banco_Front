import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../../assets/styles/login.css";
import useLogin from "../../shared/hooks/auth/useLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login data:", { email, password }); // Debug
    await login({ email, password });
  };

  return (
    <div className="login">
      <div className="banco-information">
        <h1 className="banco-title">BAMGUATE</h1>
        <p className="banco-description">Welcome back to your account!</p>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-input">
          <input
            type="text"
            placeholder="Email"
            className="login-input-text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="login-input-text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
        <button className="login-button" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && (
          <p style={{ color: "#EE3A57" }}>
            {error.response?.data?.message || "Credenciales erróneas"}
          </p>
        )}
        <p>You do not have an account? </p>
        <button className="register-button" type="button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
