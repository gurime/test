import  { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [users, setUsers] = useState([]);

  const getData = async() => {
    const res = await axios.get('/users')
    setUsers(res.data)
  }

  useEffect(() => {
    getData()
  }, [])

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    try {
      await logout();
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error(error);
      // handle the error
    }
  };
  return (
    <>
  <nav className="navbar"  >
  <div className="logo">
    <Link to="/">Logo</Link>
  </div>

  <ul className="navlinks">
    <li><Link to="/">Home</Link></li>
    <li><Link to="/about">About</Link></li>
    <li><Link to="/contact">Contact</Link></li>
    {users.length === 0 ? (
  <>
    <li><Link to="/login">Login</Link></li>
    <li><Link to="/register">Register</Link></li>
  </>
) : (
  <>
    {users.map(u => (
      <li key={u.id}>
        <span style={{color:'#fff'}}>{u.firstName}</span>
        <span style={{padding:'0 1rem',color:'#fff'}}>{u.lastName}</span>
        <button data-user-id={u.id} onClick={handleLogout}>Logout</button>
      </li>
    ))}
  </>
)}

    {/* login info */}
  </ul>
</nav>

    </>
  );
};

export default Navbar;
