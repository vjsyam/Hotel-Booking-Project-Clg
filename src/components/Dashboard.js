import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Assuming you'll add your CSS here
import logo from '../components/logo.png'; // Your logo image
import videoBackground from '../components/back.mp4'; // Your background video

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Video Background */}
      <video autoPlay loop muted className="video-background">
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <header className="centered-header">
        <div className="logo">
          <img src={logo} alt="Homey Solution Logo" className="center-logo" />
          <span className="company-name">Homey Solution</span>
        </div>
        <div className="auth-buttons centered-auth-buttons">
          <Link to="/signup" className="signup-btn">Sign Up</Link>
          <Link to="/login" className="login-btn">Login</Link>
        </div>
      </header>
    </div>
  );
};

export default Dashboard;
