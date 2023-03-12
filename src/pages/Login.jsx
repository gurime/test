import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login } = AuthContext();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error.response) {
        // If the server responds with an error message
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        // If the request was made but no response was received
        setErrorMessage("Network error, please try again");
      } else {
        // If something else happened
        setErrorMessage("Error, please try again");
      }
    }
  };

  return (
    <>
      <div className="regWrapper">
        <form className="regform" onSubmit={handleSubmit}>
          <h1>User Login Form</h1>
          <Link to="/register" style={{ textAlign: "center" }}>
            Need an account?
          </Link>

          <div className="reginputs">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit">Login</button>
          {errorMessage && (
            <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
          )}
        </form>
      </div>
    </>
  );
};

export default Login;
