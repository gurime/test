import axios from 'axios';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    function handleLogout() {
      const token = localStorage.getItem('token');
    
      axios.post('http://localhost:4005/logout', null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data.message); // success message
        localStorage.removeItem('token');
navigate('login')      
})
      .catch((error) => {
        console.error(error);
        // handle the error
      });
    }
    
    
    
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