// client/src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="navbar-brand-mark" />
          <span className="navbar-brand-copy">
            <strong>AlgoVista</strong>
            <small>Algorithm Visualization Studio</small>
          </span>
        </Link>

        <div className="navbar-menu">
          <Link
            to="/"
            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/library"
            className={`navbar-link ${isActive('/library') ? 'active' : ''}`}
          >
            Library
          </Link>
          <Link
            to="/lessons"
            className={`navbar-link ${isActive('/lessons') ? 'active' : ''}`}
          >
            DSA Lessons
          </Link>
          <Link
            to="/study-guide"
            className={`navbar-link ${isActive('/study-guide') ? 'active' : ''}`}
          >
            Study Guide
          </Link>
        </div>

        <Link to="/about" className="navbar-cta">
          About Us
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
