import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Register = () => {
const navigate = useNavigate()
const [errorMessage, setErrorMessage] = useState("");
const [user, setUser] = useState({
userName: "",
firstName: "",
lastName: "",
email: "",
password: "",
confirmpassword: ""
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
if (user.password !== user.confirmpassword) {
setErrorMessage("Passwords do not match");
return;
}
const res = await axios.post("http://localhost:3003/register", user);
console.log(res.data);
navigate("/");
} catch (error) {
console.error(error);
}
};
return (
<>
<div className="regWrapper">
<form className="regform" onSubmit={handleSubmit}>
<h1>User Registration Form</h1> 
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

<label htmlFor="confirmpassword">Confirm Password</label>
<input
type="password"
name="confirmpassword"
id="confirmpassword"
value={user.confirmpassword}
onChange={handleInputChange}
required
/>

</div>

<button type="submit">Register</button>
{errorMessage && (
<p style={{ color: "red",textAlign:'center' }}>{errorMessage}</p>
)}
</form>
</div>
</>
)
}

export default Register