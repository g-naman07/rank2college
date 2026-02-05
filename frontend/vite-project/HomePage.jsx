import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">Rank2College</div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#predict">Predictor</a>
          <a href="#colleges">Colleges</a>
          <a href="#about">About Us</a>
        </div>
      </nav>

      <header className="hero" id="home">
        <div className="hero-content">
          <h1>Find Your Dream Engineering College</h1>
          <p>Enter your JEE Rank and get accurate college predictions based on previous years' cutoffs.</p>
          <div className="cta-buttons">
            <button className="btn primary">Predict Now</button>
            <button className="btn secondary">View Cutoffs</button>
          </div>
        </div>
      </header>

      <section className="features" id="predict">
        <h2>Why Choose Us?</h2>
        <div className="feature-cards">
          <div className="card">
            <div className="icon">🎯</div>
            <h3>Accurate Predictions</h3>
            <p>Based on official JOSAA and CSAB data analysis.</p>
          </div>
          <div className="card">
            <div className="icon">⚡</div>
            <h3>Instant Results</h3>
            <p>Get your college list in seconds.</p>
          </div>
          <div className="card">
            <div className="icon">📊</div>
            <h3>Detailed Insights</h3>
            <p>Category-wise and quota-wise filtering.</p>
          </div>
        </div>
      </section>
      
      <footer className="footer">
        <p>© 2024 Rank2College. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;