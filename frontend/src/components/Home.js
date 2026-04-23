import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';
import { hotelData } from '../data/hotels';
import FloatingShapes from './scenes/FloatingShapes';
import { motion } from 'framer-motion';

const VIBES = ['All', 'Relaxation', 'City Center', 'Adventure', 'Family', 'Luxury', 'Nightlife'];

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVibe, setSelectedVibe] = useState('All');

  const filteredRooms = hotelData.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVibe = selectedVibe === 'All' || hotel.tags.includes(selectedVibe);
    return matchesSearch && matchesVibe;
  });

  const handleBookRoom = (roomId) => {
    navigate(`/payment/${roomId}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.5 }}
      className="platform-layout"
    >
      <FloatingShapes />
      <nav className="platform-nav">
        <div className="nav-left">
          <Link to="/" className="nav-brand">
            <span className="nav-brand-text">HomeySolution.</span>
          </Link>
          <div className="nav-links">
            <Link to="/home" className="nav-link">Stays</Link>
            <Link to="/experiences">Experiences</Link>
            <Link to="/offers">Offers</Link>
          </div>
        </div>
        <div className="nav-right">
          <Link to="/profile" className="btn-outline" style={{padding: '8px 16px', fontSize: '0.9rem'}}>My Account</Link>
        </div>
      </nav>

      <main className="home-main content-wrapper">
        <div className="filter-header">
           <div className="search-bar">
             <span style={{fontSize: '1.2rem'}}>🔍</span>
             <input 
               type="text" 
               placeholder="Search by hotel name or location..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
           </div>

           <div className="vibe-matcher">
             <span className="vibe-title">Find Your Vibe:</span>
             <div className="vibe-tags">
               {VIBES.map(vibe => (
                 <button 
                   key={vibe} 
                   className={`vibe-tag ${selectedVibe === vibe ? 'active' : ''}`}
                   onClick={() => setSelectedVibe(vibe)}
                 >
                   {vibe}
                 </button>
               ))}
             </div>
           </div>
        </div>

        <div className="results-meta">
           <p>{filteredRooms.length} properties matched your search</p>
        </div>

        <div className="huge-grid">
          {filteredRooms.map(hotel => (
            <div key={hotel.id} className="platform-card" onClick={() => handleBookRoom(hotel.id)}>
              <div className="card-img-wrapper">
                <img src={hotel.image} alt={hotel.name} />
                <div className="rating-badge">⭐ {hotel.rating}</div>
              </div>
              <div className="card-details">
                <div className="card-top-row">
                  <h3>{hotel.name}</h3>
                </div>
                <p className="card-location">{hotel.location}</p>
                <p className="card-desc">{hotel.description.substring(0, 80)}...</p>
                
                <div className="card-amenities">
                  {hotel.amenities.slice(0,2).map((am, i) => (
                    <span key={i} className="am-tag">{am}</span>
                  ))}
                  {hotel.amenities.length > 2 && <span className="am-tag">+{hotel.amenities.length - 2}</span>}
                </div>

                <div className="card-bottom">
                  <span className="price-tag"><b>₹{hotel.price.toLocaleString('en-IN')}</b> / night</span>
                  <button className="btn-primary small-btn" onClick={(e) => { e.stopPropagation(); handleBookRoom(hotel.id); }}>Book</button>
                </div>
              </div>
            </div>
          ))}

          {filteredRooms.length === 0 && (
             <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0'}}>
                <h2>No matches found for that vibe.</h2>
                <button onClick={() => {setSearchQuery(''); setSelectedVibe('All');}} className="btn-outline" style={{marginTop: '20px'}}>Clear Filters</button>
             </div>
          )}
        </div>
      </main>
    </motion.div>
  );
};

export default Home;
