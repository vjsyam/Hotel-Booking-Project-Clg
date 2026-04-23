import React from 'react';
import { Link } from 'react-router-dom';
import './Inners.css';
import FloatingShapes from './scenes/FloatingShapes';
import { motion } from 'framer-motion';

const Offers = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="platform-layout"
    >
      <FloatingShapes theme="offers" />
      <nav className="platform-nav">
        <div className="nav-left">
          <Link to="/" className="nav-brand">
            <span className="nav-brand-text">HomeySolution.</span>
          </Link>
          <div className="nav-links">
            <Link to="/home">Stays</Link>
            <Link to="/experiences">Experiences</Link>
            <Link to="/offers" className="nav-link">Offers</Link>
          </div>
        </div>
      </nav>

      <div className="inner-page-header">
        <h1>Exclusive Deals & Offers</h1>
        <p>Members save 10% or more on thousands of properties. Unlock special rates today.</p>
      </div>

      <main className="content-wrapper">
        <div className="cards-grid">
          <div className="offer-card">
            <span className="badge">Early Bird</span>
            <h3>Book 60+ Days in Advance</h3>
            <p>Plan ahead and save up to 25% on your total stay when you book early.</p>
            <Link to="/home"><button className="btn-primary">Find a stay</button></Link>
          </div>
          
          <div className="offer-card">
            <span className="badge" style={{color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)'}}>Last Minute</span>
            <h3>Weekend Getaways</h3>
            <p>Spontaneous trip? Get jaw-dropping deals on remaining rooms this weekend.</p>
            <Link to="/home"><button className="btn-outline">Browse Deals</button></Link>
          </div>

          <div className="offer-card">
            <span className="badge" style={{color: '#10b981', background: 'rgba(16, 185, 129, 0.1)'}}>Eco Travel</span>
            <h3>Sustainable Stays Discount</h3>
            <p>Support the environment. Get 15% off when booking our Certified Eco-Lodges.</p>
            <Link to="/home"><button className="btn-outline">See Eco-Lodges</button></Link>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default Offers;
