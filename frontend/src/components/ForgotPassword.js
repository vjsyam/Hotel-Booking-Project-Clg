import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import { motion } from 'framer-motion';
import FloatingShapes from './scenes/FloatingShapes';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const navigate = useNavigate();

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);
    setSuccess(null);

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/forgot-password/request`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        
        if (response.ok) {
            setSuccess("OTP has been sent to your email. Please check your inbox (and spam folder).");
            setStep(2);
        } else {
            setError(data.error);
        }
    } catch (err) {
        setError("Failed to connect to server");
    } finally {
        setIsProcessing(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
        setError("Passwords do not match"); 
        return;
    }
    
    setIsProcessing(true);
    setError(null);

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/forgot-password/reset`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, otp, newPassword })
        });
        const data = await response.json();
        
        if (response.ok) {
            alert("Password reset successfully! You can now log in.");
            navigate('/login');
        } else {
            setError(data.error);
        }
    } catch (err) {
        setError("Failed to connect to server");
    } finally {
        setIsProcessing(false);
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
        <h2 className="auth-heading">Reset Password</h2>
        <p className="auth-subtext">
            {step === 1 ? "Enter your email to receive an OTP." : "Enter your OTP and new password."}
        </p>
        
        {step === 1 && (
            <form onSubmit={handleRequestOtp} className="auth-form-minimal">
              {error && <div style={{color: '#f87171', fontSize: '0.9rem'}}>{error}</div>}
              {success && <div style={{color: 'var(--color-cyan)', fontSize: '0.9rem'}}>{success}</div>}
              
              <div className="auth-input-group">
                <input 
                   type="email" 
                   placeholder="Enter your registered email" 
                   value={email}
                   onChange={(e)=>setEmail(e.target.value)}
                   required 
                   className="auth-input" 
                />
              </div>

              <button type="submit" className="btn-primary auth-submit-btn" disabled={isProcessing}>
                  {isProcessing ? 'Requesting...' : 'Get OTP'}
              </button>
            </form>
        )}

        {step === 2 && (
            <form onSubmit={handleResetPassword} className="auth-form-minimal">
              {error && <div style={{color: '#f87171', fontSize: '0.9rem'}}>{error}</div>}
              
              <div className="auth-input-group">
                <input 
                   type="text" 
                   placeholder="6-digit OTP" 
                   value={otp}
                   onChange={(e)=>setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                   required 
                   className="auth-input" 
                   style={{letterSpacing: '4px', textAlign: 'center'}}
                />
              </div>

              <div className="auth-input-group">
                <input 
                   type={showPassword ? "text" : "password"} 
                   placeholder="New Password" 
                   value={newPassword}
                   onChange={(e)=>setNewPassword(e.target.value)}
                   required 
                   className="auth-input" 
                   style={{paddingRight: '40px'}}
                />
                <button 
                  type="button" 
                  className="toggle-password-btn" 
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <div className="auth-input-group">
                <input 
                   type={showPassword ? "text" : "password"} 
                   placeholder="Confirm New Password" 
                   value={confirmPassword}
                   onChange={(e)=>setConfirmPassword(e.target.value)}
                   required 
                   className="auth-input" 
                   style={{paddingRight: '40px'}}
                />
              </div>

              <button type="submit" className="btn-primary auth-submit-btn" disabled={isProcessing}>
                  {isProcessing ? 'Resetting...' : 'Reset Password'}
              </button>
              
              <button 
                  type="button" 
                  className="btn-outline auth-submit-btn" 
                  style={{marginTop: '8px'}}
                  onClick={() => setStep(1)}
              >
                  Back
              </button>
            </form>
        )}
        
        <div className="auth-footer-links">
          <Link to="/login" className="auth-text-link">← Back to Login</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
