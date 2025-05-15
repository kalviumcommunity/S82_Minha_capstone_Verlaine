import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const isLoggedIn = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-petal px-6 py-4 shadow-md text-plum font-elegant">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Verlaine</Link>
        <div className="space-x-4 text-base">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/journal" className="hover:underline">Journal</Link>
          <Link to="/routine" className="hover:underline">Routine</Link>
          <Link to="/product-checker" className="hover:underline">Checker</Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/signup" className="hover:underline">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
