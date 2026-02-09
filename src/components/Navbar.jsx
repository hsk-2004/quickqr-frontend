import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="logo">⚡ QuickQR</span>
        </Link>

        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <ul className="nav-links">
                <li>
                  <Link to="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/history" className="nav-link">
                    History
                  </Link>
                </li>
              </ul>
              <div className="user-section">
                <span className="user-name">{user?.name || user?.email}</span>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link login-link">
                Login
              </Link>
              <Link to="/register" className="nav-link register-link">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
