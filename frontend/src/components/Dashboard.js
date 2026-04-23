import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { destinations } from '../data/hotels';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import HeroScene from './scenes/HeroScene';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 2
  });

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, y: 20 }} 
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="platform-layout"
    >
      {/* Premium Navbar */}
      <nav className="platform-nav">
        <div className="nav-left">
          <Link to="/" className="nav-brand">
            <span className="nav-brand-text">HomeySolution.</span>
          </Link>
          <div className="nav-links">
            <Link to="/home">Stays</Link>
            <Link to="/experiences">Experiences</Link>
            <Link to="/offers">Offers</Link>
          </div>
        </div>
        <div className="nav-right">
          {user ? (
            <Link to="/profile" className="btn-primary" style={{padding: '8px 16px', fontSize: '0.9rem'}}>Dashboard</Link>
          ) : (
            <>
              <Link to="/login" className="nav-link">Sign In</Link>
              <Link to="/signup" className="btn-primary" style={{padding: '8px 16px', fontSize: '0.9rem'}}>Register</Link>
            </>
          )}
        </div>
      </nav>

      {/* Massive 3D Hero Section */}
      <div className="hero-section" style={{ background: 'none' }}>
        <HeroScene />
        <div className="hero-overlay" style={{ background: 'linear-gradient(180deg, rgba(3, 3, 5, 0) 0%, var(--color-bg) 100%)' }}></div>
        <div className="hero-content">
          <h1>Find your next stay</h1>
          <p>Search low prices on hotels, luxury homes, and much more...</p>
        </div>

        {/* Booking Widget */}
        <div className="booking-widget-wrapper">
          <form className="booking-widget" onSubmit={handleSearch}>
            <div className="widget-field">
              <label>Where are you going?</label>
              <input 
                type="text" 
                placeholder="City, region, or specific hotel" 
                value={searchParams.location}
                onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
              />
            </div>
            <div className="widget-field divider">
              <label>Check-in</label>
              <input 
                type="date"
                value={searchParams.checkIn}
                onChange={(e) => setSearchParams({...searchParams, checkIn: e.target.value})}
              />
            </div>
            <div className="widget-field divider">
              <label>Check-out</label>
              <input 
                type="date"
                value={searchParams.checkOut}
                onChange={(e) => setSearchParams({...searchParams, checkOut: e.target.value})}
              />
            </div>
            <div className="widget-field divider">
              <label>Guests</label>
              <select 
                value={searchParams.guests}
                onChange={(e) => setSearchParams({...searchParams, guests: parseInt(e.target.value)})}
              >
                <option value={1}>1 adult</option>
                <option value={2}>2 adults</option>
                <option value={3}>3 adults</option>
                <option value={4}>4 adults</option>
                <option value={5}>Family</option>
              </select>
            </div>
            <button type="submit" className="btn-primary search-btn">Search</button>
          </form>
        </div>
      </div>

      <main className="dashboard-main content-wrapper">
        {/* Trending Destinations Row */}
        <section className="destinations-section">
           <h2>Trending destinations</h2>
           <p className="section-subtitle">Most popular choices for travelers this month</p>
           
           <div className="destinations-grid">
              {destinations.slice(0, 6).map(dest => (
                <div className="dest-card" key={dest.id} onClick={() => navigate('/home')}>
                  <img src={dest.image} alt={dest.name} />
                  <div className="dest-scrim"></div>
                  <h3>{dest.name}</h3>
                </div>
              ))}
           </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section className="how-it-works-section">
          <h2>How It Works</h2>
          <p className="section-subtitle">Book your dream stay in just 3 simple steps</p>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon">🔍</div>
              <div className="step-number">01</div>
              <h3>Search & Discover</h3>
              <p>Browse 24+ curated properties across India and the world. Filter by vibe, budget, or location.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">📅</div>
              <div className="step-number">02</div>
              <h3>Book & Pay Securely</h3>
              <p>Choose your dates, fill in guest details, and pay securely via Card or UPI. Get instant confirmation.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">🏨</div>
              <div className="step-number">03</div>
              <h3>Check-in & Enjoy</h3>
              <p>Show up, check in with your booking ID, and enjoy a world-class stay. Let our AI Concierge plan your day.</p>
            </div>
          </div>
        </section>

        {/* ═══ GUEST INFORMATION ═══ */}
        <section className="guest-info-section">
          <h2>Guest Information</h2>
          <p className="section-subtitle">Everything you need to know for a smooth stay</p>
          <div className="info-grid">
            <div className="info-card">
              <h4>🕐 Check-in & Check-out</h4>
              <p>Standard check-in is <strong>2:00 PM</strong> and check-out is <strong>11:00 AM</strong>. Early check-in and late check-out are subject to availability — add a note in Special Requests.</p>
            </div>
            <div className="info-card">
              <h4>❌ Cancellation Policy</h4>
              <p><strong>Free cancellation</strong> up to 48 hours before check-in. Cancellations within 48 hours will be charged 50% of the first night. No-shows are charged the full amount.</p>
            </div>
            <div className="info-card">
              <h4>🧳 What to Bring</h4>
              <p>A valid government-issued ID (Aadhaar, Passport, or Driver's License) is required at check-in. Towels, toiletries, and Wi-Fi are complimentary at all properties.</p>
            </div>
            <div className="info-card">
              <h4>🔒 Safety & Security</h4>
              <p>All properties are verified and audited. Your payments are protected with 256-bit SSL encryption. In-room safes are available at most locations.</p>
            </div>
            <div className="info-card">
              <h4>📞 24/7 Support</h4>
              <p>Need help? Our support team is available round the clock. Call <strong>+91 1800-123-4567</strong> (toll-free) or email <strong>support@homeysolution.com</strong>.</p>
            </div>
            <div className="info-card">
              <h4>💳 Payment Options</h4>
              <p>We accept all major Credit/Debit cards (Visa, Mastercard, Rupay), UPI (GPay, PhonePe, Paytm), and Net Banking. All prices include GST.</p>
            </div>
          </div>
        </section>

        {/* ═══ TESTIMONIALS ═══ */}
        <section className="testimonials-section">
          <h2>What Our Guests Say</h2>
          <p className="section-subtitle">Trusted by over 50,000 travelers across India</p>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"Absolutely stunning experience at the Taj Lake Palace. The booking process was seamless and the AI Concierge actually planned a better itinerary than I could have!"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">PA</div>
                <div>
                  <h5>Priya Agarwal</h5>
                  <span>Udaipur, Dec 2025</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"The Kerala houseboat stay was a dream come true. HomeySolution made it so easy — checked in with just my booking ID. The special requests feature really helped."</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">RK</div>
                <div>
                  <h5>Rahul Kumar</h5>
                  <span>Kerala, Jan 2026</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★☆</div>
              <p className="testimonial-text">"Great prices on the Goa resort. Found a last-minute deal through the Offers page that saved us 25%. The UPI payment was instant. Will book again for sure!"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">SM</div>
                <div>
                  <h5>Sneha Mehta</h5>
                  <span>Goa, Feb 2026</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ NEWSLETTER ═══ */}
        <section className="newsletter-section">
          <div className="newsletter-card">
            <h3>Get Exclusive Deals Delivered</h3>
            <p>Subscribe to our newsletter and be the first to know about flash sales, new destinations, and members-only pricing.</p>
            <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('✅ Subscribed successfully!'); }}>
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </div>
        </section>

        {/* Offers Promo block */}
        <section className="promo-section">
           <div className="promo-card">
              <div className="promo-text">
                 <h3>Special Early Bird Offers</h3>
                 <p>Save 15% or more when you book and stay before the end of the year.</p>
                 <Link to="/offers" className="btn-primary">View all deals</Link>
              </div>
           </div>
        </section>
      </main>

      <footer className="platform-footer">
        <div className="content-wrapper">
          <p>&copy; 2026 HomeySolution. All rights reserved.</p>
          <div className="footer-links">
             <Link to="/">Terms</Link>
             <Link to="/">Privacy</Link>
             <Link to="/">Contact</Link>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Dashboard;
