import axios from 'axios';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
      const token = localStorage.getItem('token');
    
      try {
        await axios.post("http://localhost:3005/logout", null, { headers: { Authorization: `Bearer ${token}` } });
        localStorage.clear();
        navigate('/login');
      } catch (error) {
        console.error(error);
        // handle error appropriately
      }
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