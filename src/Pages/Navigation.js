import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  // Now checking for the root path
  const isRootPath = location.pathname === '/';

  if (isRootPath) {
    return (
      <nav className="App-header">
        <div className="auth-links">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </div>
      </nav>
    );
  }

  // Return null or other navigation links if it's not the root path
  return null;
}

export default Navigation;
