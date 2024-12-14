// src/components/Login.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // Perform login validation here
    // Assuming login is successful, navigate to the homepage
    navigate('/home');
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h2>Sign In</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Enter your username" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required />
          </div>
          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="#forgot-password"> Forgot Password</a>
          </div>
          <button type="submit" className="login-button">Sign In</button>
        </form>
      </div>
      <div className="login-right">
        <h2>Welcome to Login</h2>
        <p>Don't have an account?</p>
        <button onClick={() => navigate('/signup')} className="signup-button">Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
