import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.className = theme + '-theme';
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <nav className="topbar">
      <Link className="brand" to="/">
        jeepredictor.in
      </Link>
      <div className="topbar__links">
        <Link to="/">Home</Link>
        <Link to="/josaaa/predictor">College Predictor</Link>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  );
};

export default Header;