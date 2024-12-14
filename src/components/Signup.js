// src/components/Signup.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    // Perform signup validation here
    // Assuming signup is successful, navigate to the homepage
    navigate('/home');
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <h2>Register</h2>
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Enter your username" required />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" required />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" placeholder="Confirm your password" required />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
      <div className="signup-right">
        <h2>Welcome to Signup</h2>
        <p>Already have an account?</p>
        <button onClick={() => navigate('/')} className="login-button">Sign In</button>
      </div>
    </div>
  );
};

export default Signup;
