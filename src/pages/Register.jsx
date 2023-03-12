import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

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
      const res = await axios.post("http://localhost:3005/register", user);
      console.log(res.data);
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
          <h1>User Registration Form</h1>
          <Link to='/login' style={{textAlign:'center'}}>Already have an account?</Link>
          <div className="reginputs">
            <label htmlFor="uname">User Name</label>
            <input
              type="text"
              name="userName"
              id="uname"
              value={user.userName}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              name="firstName"
              id="fname"
              value={user.firstName}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lname"
              value={user.lastName}
              onChange={handleInputChange}
              required
            />

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

          <button type="submit">Register</button>
          {errorMessage && (
            <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
          )}
        </form>
      </div>
    </>
  );
};

export default Register;
