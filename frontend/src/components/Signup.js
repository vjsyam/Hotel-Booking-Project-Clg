import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import FloatingShapes from './scenes/FloatingShapes';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        setError("Passwords do not match"); return;
    }

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();
        
        if (response.ok) {
            login(data.user, data.token);
            navigate('/home');
        } else {
            setError(data.error);
        }
    } catch (err) {
        setError("Failed to connect to server");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="auth-layout"
    >
      <FloatingShapes theme="login" />
      <nav className="platform-nav" style={{position: 'absolute', top: 0, left: 0, width: '100%'}}>
        <div className="nav-left">
          <Link to="/" className="nav-brand">
            <span className="nav-brand-text">HomeySolution.</span>
          </Link>
        </div>
      </nav>

      <div className="auth-box">
        <h2 className="auth-heading">Register</h2>
        <p className="auth-subtext">Welcome to Homey Solution.</p>
        
        <form onSubmit={handleSignup} className="auth-form-minimal">
          {error && <div style={{color: '#f87171', fontSize: '0.9rem'}}>{error}</div>}
          <div className="auth-input-group">
            <input type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required className="auth-input" />
          </div>

          <div className="auth-input-group">
            <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required className="auth-input" />
          </div>

          <div className="auth-input-group">
            <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required className="auth-input" />
          </div>
          
          <div className="auth-input-group">
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} required className="auth-input" />
          </div>

          <button type="submit" className="btn-primary auth-submit-btn">Sign Up</button>
        </form>
        
        <div className="auth-footer-links">
          <span className="auth-text-muted">Already have an account?</span>
          <Link to="/login" className="auth-text-link">Sign In</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Signup;
