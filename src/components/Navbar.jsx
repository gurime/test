import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:4005/logout', null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error(error);
      // handle the error
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <NavLink to="/">Logo</NavLink>
        </div>

        <ul className="navlinks">
          <NavLink
            to="/"
            style={({ isActive }) =>
              isActive ? { backgroundColor: 'blue' } : {}
            }
          >
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {user ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
