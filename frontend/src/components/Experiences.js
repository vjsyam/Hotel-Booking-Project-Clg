import React from 'react';
import { Link } from 'react-router-dom';
import './Inners.css';
import FloatingShapes from './scenes/FloatingShapes';
import { motion } from 'framer-motion';

const Experiences = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="platform-layout"
    >
      <FloatingShapes theme="experiences" />
      <nav className="platform-nav">
        <div className="nav-left">
          <Link to="/" className="nav-brand">
            <span className="nav-brand-text">HomeySolution.</span>
          </Link>
          <div className="nav-links">
            <Link to="/home">Stays</Link>
            <Link to="/experiences" className="nav-link">Experiences</Link>
            <Link to="/offers">Offers</Link>
          </div>
        </div>
      </nav>

      <div className="inner-page-header">
        <h1>Discover Unforgettable Experiences</h1>
        <p>Book local tours, exclusive dining, and thrilling adventures all in one place.</p>
      </div>

      <main className="content-wrapper">
        <div className="cards-grid">
          <div className="exp-card">
            <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop" alt="Scuba Diving" className="exp-img" />
            <div className="exp-content">
              <h3>Private Scuba Diving</h3>
              <p style={{color: 'var(--color-text-secondary)', marginBottom: '16px'}}>Explore vibrant coral reefs with a certified master diver. Equipment included.</p>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                 <span style={{fontWeight: '700'}}>₹12,000 / person</span>
                 <button className="btn-outline">Book Now</button>
              </div>
            </div>
          </div>

          <div className="exp-card">
            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop" alt="Mountain Trek" className="exp-img" />
            <div className="exp-content">
              <h3>Guided Mountain Trek</h3>
              <p style={{color: 'var(--color-text-secondary)', marginBottom: '16px'}}>A breathtaking half-day hike ending with a gourmet picnic overlooking the valley.</p>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                 <span style={{fontWeight: '700'}}>₹6,800 / person</span>
                 <button className="btn-outline">Book Now</button>
              </div>
            </div>
          </div>

          <div className="exp-card">
            <img src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop" alt="City Tour" className="exp-img" />
            <div className="exp-content">
              <h3>Historic City Night Tour</h3>
              <p style={{color: 'var(--color-text-secondary)', marginBottom: '16px'}}>Walk the illuminated streets and discover hidden culinary gems with a local guide.</p>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                 <span style={{fontWeight: '700'}}>₹4,500 / person</span>
                 <button className="btn-outline">Book Now</button>
              </div>
            </div>
          </div>

          {/* New Experiences */}
          <div className="exp-card">
            <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop" alt="Hot Air Balloon" className="exp-img" />
            <div className="exp-content">
              <h3>Sunrise Hot Air Balloon</h3>
              <p style={{color: 'var(--color-text-secondary)', marginBottom: '16px'}}>Float above the breathtaking landscape at dawn, followed by a champagne breakfast.</p>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                 <span style={{fontWeight: '700'}}>₹15,000 / person</span>
                 <button className="btn-outline">Book Now</button>
              </div>
            </div>
          </div>

          <div className="exp-card">
            <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop" alt="Cooking Class" className="exp-img" />
            <div className="exp-content">
              <h3>Authentic Cooking Class</h3>
              <p style={{color: 'var(--color-text-secondary)', marginBottom: '16px'}}>Learn to prepare traditional dishes from a local chef using fresh, organic ingredients.</p>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                 <span style={{fontWeight: '700'}}>₹3,500 / person</span>
                 <button className="btn-outline">Book Now</button>
              </div>
            </div>
          </div>

          <div className="exp-card">
            <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop" alt="Spa Day" className="exp-img" />
            <div className="exp-content">
              <h3>Holistic Spa Retreat</h3>
              <p style={{color: 'var(--color-text-secondary)', marginBottom: '16px'}}>Rejuvenate with a full-day pass to our award-winning wellness sanctuary and sauna.</p>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                 <span style={{fontWeight: '700'}}>₹9,000 / person</span>
                 <button className="btn-outline">Book Now</button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </motion.div>
  );
};

export default Experiences;
