import axios from 'axios';
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.delete('http://localhost:3003/logout')
          .then(response => {
            // Clear any local storage or session storage items
            localStorage.clear();
            sessionStorage.clear();
            // Redirect the user to the login page or home page
            navigate('login');
          })
          .catch(error => {
            console.error('Error logging out', error);
          });
      };

return (
<>
<nav className='navbar'>
<div className='logo'>
    <NavLink to='/'>
     Logo
    </NavLink>
    </div>
   

<ul className='navlinks'>

<NavLink 
to='/' 
style={({ isActive }) => isActive ? {backgroundColor:'blue'} : {}}>
Home
</NavLink>

<NavLink to='about'>About</NavLink>
<NavLink to='contact'>Contact</NavLink>
<button onClick={handleLogout}>Logout</button>
</ul>
</nav>
</>
)
}

export default Navbar