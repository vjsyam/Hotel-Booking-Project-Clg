import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './Payment.css';
import { hotelData } from '../data/hotels';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import FloatingShapes from './scenes/FloatingShapes';

const Payment = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Booking fields
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [nights, setNights] = useState(1);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const selectedRoom = hotelData.find((r) => r.id === parseInt(roomId));
    setRoom(selectedRoom);
    if (user) {
      setGuestName(user.username || '');
      setGuestEmail(user.email || '');
    }
  }, [roomId, user]);

  // Auto-calculate checkout from check-in + nights
  useEffect(() => {
    if (checkIn && nights >= 1) {
      const d = new Date(checkIn);
      d.setDate(d.getDate() + nights);
      setCheckOut(d.toISOString().split('T')[0]);
    }
  }, [checkIn, nights]);

  const roomCost = room ? room.price * nights : 0;
  const gstAmount = Math.round(roomCost * 0.18);
  const serviceFee = 500;
  const totalCost = roomCost + gstAmount + serviceFee;

  const validate = () => {
    const errs = {};
    if (!checkIn) errs.checkIn = 'Check-in date is required';
    if (!guestName.trim()) errs.guestName = 'Guest name is required';
    if (!guestPhone.trim() || guestPhone.length < 10) errs.guestPhone = 'Valid phone number required';
    if (!guestEmail.trim() || !guestEmail.includes('@')) errs.guestEmail = 'Valid email required';
    if (nights < 1) errs.nights = 'Minimum 1 night';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePayment = () => {
    if (!user) {
      alert('You must be logged in to book a room.');
      navigate('/login');
      return;
    }
    if (!validate()) return;

    navigate('/checkout', { 
      state: { 
        totalCost, roomCost, gstAmount, serviceFee,
        roomName: room.name, roomId: room.id, 
        checkIn, checkOut, nights,
        guestName, guestPhone, guestEmail, specialRequests
      } 
    });
  };

  if (!room) return <div style={{padding: '100px', textAlign: 'center', color: '#fff'}}>Loading...</div>;

  const today = new Date().toISOString().split('T')[0];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="auth-layout" 
      style={{justifyContent: 'flex-start'}}
    >
      <FloatingShapes theme="payment" />
      <nav className="platform-nav" style={{position: 'absolute', top: 0, left: 0, width: '100%'}}>
        <div className="nav-left">
          <Link to="/home" className="nav-link" style={{fontSize: '1.2rem'}}>
             ← Back to Explore
          </Link>
        </div>
      </nav>

      <div className="payment-box">
        <h2 className="payment-heading">Review Booking</h2>
        
        {/* Room Preview */}
        <div className="payment-room-preview">
           <div className="pr-left">
             <img src={room.image} alt={room.name} />
           </div>
           <div className="pr-right">
             <h4>{room.name} ({room.rating} ⭐)</h4>
             <span style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem'}}>{room.location}</span>
             <span className="pr-price" style={{marginTop: '4px'}}>₹{room.price.toLocaleString('en-IN')} / night</span>
           </div>
        </div>

        <div className="payment-form">
          {/* Dates Row */}
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
            <div className="payment-input-group">
              <label>Check-in Date *</label>
              <input
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) => setCheckIn(e.target.value)}
                className={`payment-input ${errors.checkIn ? 'input-error' : ''}`}
              />
              {errors.checkIn && <span className="field-error">{errors.checkIn}</span>}
            </div>
            <div className="payment-input-group">
              <label>Check-out Date</label>
              <input
                type="date"
                value={checkOut}
                readOnly
                className="payment-input"
                style={{opacity: 0.6, cursor: 'not-allowed'}}
              />
            </div>
          </div>
          
          <div className="payment-input-group">
            <label>Duration (Nights)</label>
            <select
              value={nights}
              onChange={(e) => setNights(parseInt(e.target.value))}
              className="payment-input"
            >
              {[1,2,3,4,5,6,7,10,14,21,30].map(n => <option key={n} value={n}>{n} Night{n > 1 ? 's' : ''}</option>)}
            </select>
          </div>

          {/* Guest Info */}
          <div style={{borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', marginTop: '4px'}}>
            <label style={{fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-cyan)', marginBottom: '12px', display: 'block'}}>Guest Information</label>
          </div>

          <div className="payment-input-group">
            <label>Full Name *</label>
            <input
              type="text"
              placeholder="Enter guest's full name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className={`payment-input ${errors.guestName ? 'input-error' : ''}`}
            />
            {errors.guestName && <span className="field-error">{errors.guestName}</span>}
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
            <div className="payment-input-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className={`payment-input ${errors.guestPhone ? 'input-error' : ''}`}
              />
              {errors.guestPhone && <span className="field-error">{errors.guestPhone}</span>}
            </div>
            <div className="payment-input-group">
              <label>Email *</label>
              <input
                type="email"
                placeholder="guest@email.com"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className={`payment-input ${errors.guestEmail ? 'input-error' : ''}`}
              />
              {errors.guestEmail && <span className="field-error">{errors.guestEmail}</span>}
            </div>
          </div>

          <div className="payment-input-group">
            <label>Special Requests (Optional)</label>
            <textarea
              placeholder="e.g., Late check-in, extra pillows, airport pickup..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="payment-input"
              rows={3}
              style={{resize: 'vertical', fontFamily: 'inherit'}}
            />
          </div>

          {/* Bill Breakdown */}
          <div style={{borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px'}}>
            <div className="bill-line">
              <span>Room ({nights} night{nights > 1 ? 's' : ''} × ₹{room.price.toLocaleString('en-IN')})</span>
              <span>₹{roomCost.toLocaleString('en-IN')}</span>
            </div>
            <div className="bill-line">
              <span>GST (18%)</span>
              <span>₹{gstAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="bill-line">
              <span>Service Fee</span>
              <span>₹{serviceFee.toLocaleString('en-IN')}</span>
            </div>
            <div className="payment-summary" style={{marginTop: '8px'}}>
              <span>Total Payable</span>
              <span>₹{totalCost.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {!user && (
            <div style={{color: '#f87171', fontSize: '0.9rem', textAlign: 'center'}}>
              You must log in to checkout.
            </div>
          )}

          <button onClick={handlePayment} className="btn-primary payment-submit-btn">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Payment;
