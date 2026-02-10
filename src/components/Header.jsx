import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-primary-500 to-secondary-500 shadow-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* BRAND */}
        <Link to="/" className="flex items-center gap-3 text-white font-extrabold text-2xl hover:opacity-90 transition-opacity">
          <span className="text-3xl">⚡</span>
          <span className="hidden sm:inline">QuickQR</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          {isAuthenticated ? (
            <>
              <ul className="flex items-center gap-8">
                <li>
                  <Link 
                    to="/dashboard"
                    className="text-white font-semibold hover:text-primary-50 transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/history"
                    className="text-white font-semibold hover:text-primary-50 transition-colors duration-200"
                  >
                    History
                  </Link>
                </li>
              </ul>

              <div className="flex items-center gap-4 pl-4 border-l border-white border-opacity-20">
                <span className="text-white text-sm font-medium truncate max-w-xs">
                  {user?.name || user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 rounded-full bg-white text-primary-600 font-semibold hover:bg-primary-50 transition-all duration-200 transform hover:scale-105 shadow-md"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                to="/login"
                className="text-white font-semibold hover:text-primary-50 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 rounded-full bg-white text-primary-600 font-semibold hover:bg-primary-50 transition-all duration-200 transform hover:scale-105 shadow-md"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* HAMBURGER */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-white rounded transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-white rounded transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-white rounded transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-gradient-to-b from-primary-500 to-secondary-500 px-4 sm:px-6 pb-6 space-y-4"
          >
            {isAuthenticated ? (
              <div className="flex flex-col items-stretch gap-4">
                <Link 
                  onClick={() => setMenuOpen(false)} 
                  to="/dashboard"
                  className="text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors duration-200 text-center"
                >
                  Dashboard
                </Link>
                <Link 
                  onClick={() => setMenuOpen(false)} 
                  to="/history"
                  className="text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors duration-200 text-center"
                >
                  History
                </Link>

                <div className="pt-2 border-t border-white border-opacity-20">
                  <p className="text-white text-sm font-medium text-center mb-3 truncate">
                    {user?.name || user?.email}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-white text-primary-600 py-2 px-4 rounded-full font-semibold hover:bg-primary-50 transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-stretch gap-4">
                <Link 
                  onClick={() => setMenuOpen(false)} 
                  to="/login"
                  className="text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors duration-200 text-center"
                >
                  Login
                </Link>
                <Link
                  onClick={() => setMenuOpen(false)}
                  to="/register"
                  className="w-full bg-white text-primary-600 py-2 px-4 rounded-full text-center font-semibold hover:bg-primary-50 transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
