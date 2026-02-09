import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="navbar-container">
        {/* BRAND */}
        <Link to="/" className="navbar-brand">
          ⚡ <span>QuickQR</span>
        </Link>

        {/* HAMBURGER */}
        <button
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* MENU */}
        <AnimatePresence>
          {(menuOpen || window.innerWidth > 768) && (
            <motion.div
              className="navbar-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {isAuthenticated ? (
                <>
                  <ul className="nav-links">
                    <li>
                      <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link to="/history" onClick={() => setMenuOpen(false)}>
                        History
                      </Link>
                    </li>
                  </ul>

                  <div className="user-section">
                    <span className="user-name">
                      {user?.name || user?.email}
                    </span>
                    <button className="logout-btn" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="auth-links">
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" className="register-btn" onClick={() => setMenuOpen(false)}>
                    Get Started
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
