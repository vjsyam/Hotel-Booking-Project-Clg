import React, { useState, useContext } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './Checkout.css';
import cardLogo from './card.png';
import upiLogo from './upi.png';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import FloatingShapes from './scenes/FloatingShapes';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, token, logout } = useContext(AuthContext);
    
    const { 
      totalCost = 0, roomCost = 0, gstAmount = 0, serviceFee = 0,
      roomName = 'Unknown', roomId = null, 
      checkIn = '', checkOut = '', nights = 1,
      guestName = '', guestPhone = '', guestEmail = '', specialRequests = ''
    } = location.state || {};
    
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState({});
    
    // Payment simulation states
    const [paymentStep, setPaymentStep] = useState('details'); // details, otp, upi-waiting
    const [otpCode, setOtpCode] = useState('');

    // Card fields
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvc, setCardCvc] = useState('');
    const [cardName, setCardName] = useState('');
    // UPI field
    const [upiId, setUpiId] = useState('');

    const formatCardNumber = (value) => {
      const v = value.replace(/\D/g, '').slice(0, 16);
      return v.replace(/(.{4})/g, '$1 ').trim();
    };

    const formatExpiry = (value) => {
      const v = value.replace(/\D/g, '').slice(0, 4);
      if (v.length >= 3) return v.slice(0, 2) + '/' + v.slice(2);
      return v;
    };

    const validate = () => {
      const errs = {};
      if (paymentMethod === 'card') {
        const rawCard = cardNumber.replace(/\s/g, '');
        if (rawCard.length !== 16) errs.cardNumber = 'Enter valid 16-digit card number';
        if (!cardName.trim()) errs.cardName = 'Cardholder name required';
        if (cardExpiry.length !== 5) errs.cardExpiry = 'Enter valid MM/YY';
        if (cardCvc.length < 3) errs.cardCvc = 'Enter valid CVC';
      } else {
        if (!upiId.includes('@')) errs.upiId = 'Enter valid UPI ID (e.g., name@upi)';
      }
      setErrors(errs);
      return Object.keys(errs).length === 0;
    };

    const processInitialPayment = () => {
       if (!user) {
          alert("Unauthorized. Please log in.");
          return;
       }
       if (!validate()) return;

       if (paymentMethod === 'card') {
           setPaymentStep('otp');
       } else {
           setPaymentStep('upi-waiting');
           setIsProcessing(true);
           setTimeout(() => {
               finalizePayment();
           }, 4000); // 4 second wait for UPI
       }
    };

    const verifyOtpAndPay = () => {
        if (otpCode.length < 4) {
            setErrors({ otp: 'Enter a valid OTP (at least 4 digits)' });
            return;
        }
        setIsProcessing(true);
        finalizePayment();
    };

    const finalizePayment = async () => {
       try {
           const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/bookings`, {
               method: 'POST',
               headers: { 
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`
               },
               body: JSON.stringify({
                   userId: user.id,
                   roomName,
                   hotelId: roomId,
                   checkIn,
                   checkOut,
                   nights,
                   roomCost,
                   gstAmount,
                   serviceFee,
                   totalCost,
                   paymentMethod,
                   guestName,
                   guestPhone,
                   guestEmail,
                   specialRequests
               })
           });

           if (response.status === 401 || response.status === 403) {
               logout();
               navigate('/login');
               return;
           }

           if (!response.ok) throw new Error('Booking failed');
           
           alert(`Booking confirmed! Confirmation details sent to ${guestEmail}`);
           navigate('/profile');
       } catch (err) {
           alert("Server error processing payment");
           setIsProcessing(false);
           setPaymentStep('details');
       }
    };

    return (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="auth-layout"
        >
            <FloatingShapes theme="checkout" />
            <nav className="platform-nav" style={{position: 'absolute', top: 0, left: 0, width: '100%'}}>
              <div className="nav-left">
                <Link to="/home" className="nav-link" style={{fontSize: '1.2rem'}}>
                   ← Cancel Booking
                </Link>
              </div>
            </nav>

            <div className="checkout-box">
                <h2 className="checkout-heading">Secure Checkout</h2>
                
                {/* Booking Summary */}
                <div className="checkout-summary" style={{flexDirection: 'column', gap: '8px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                      <span>{roomName}</span>
                      <span style={{color: 'var(--color-cyan)'}}>₹{totalCost.toLocaleString('en-IN')}</span>
                    </div>
                    <div style={{display: 'flex', gap: '24px', fontSize: '0.85rem', color: 'var(--color-text-secondary)'}}>
                      <span>{checkIn} to {checkOut}</span>
                      <span>{nights} night{nights > 1 ? 's' : ''}</span>
                    </div>
                    <div style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)'}}>
                      <span>{guestName} • {guestPhone}</span>
                    </div>
                </div>

                {/* Bill Breakdown */}
                <div style={{padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '16px'}}>
                  <div className="bill-line"><span>Room Cost</span><span>₹{roomCost.toLocaleString('en-IN')}</span></div>
                  <div className="bill-line"><span>GST (18%)</span><span>₹{gstAmount.toLocaleString('en-IN')}</span></div>
                  <div className="bill-line"><span>Service Fee</span><span>₹{serviceFee.toLocaleString('en-IN')}</span></div>
                  <div className="bill-line" style={{fontWeight: '700', color: '#fff', fontSize: '1.1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px', marginTop: '6px'}}>
                    <span>Total</span><span style={{color: 'var(--color-cyan)'}}>₹{totalCost.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {paymentStep === 'details' && (
                    <>
                        {/* Payment Methods */}
                        <div className="payment-methods">
                            <label className={`pm-label ${paymentMethod === 'card' ? 'active' : ''}`}>
                                <input type="radio" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                                <img src={cardLogo} alt="Card" className="pm-icon" />
                                Credit / Debit Card
                            </label>
                            {paymentMethod === 'card' && (
                                <div className="pm-details">
                                    <div className="pm-input-group full">
                                      <label>Cardholder Name *</label>
                                      <input type="text" placeholder="Name on card" value={cardName} onChange={e => setCardName(e.target.value)} className={`pm-input ${errors.cardName ? 'input-error' : ''}`} />
                                      {errors.cardName && <span className="field-error">{errors.cardName}</span>}
                                    </div>
                                    <div className="pm-input-group full">
                                      <label>Card Number *</label>
                                      <input type="text" placeholder="0000 0000 0000 0000" value={cardNumber} onChange={e => setCardNumber(formatCardNumber(e.target.value))} className={`pm-input ${errors.cardNumber ? 'input-error' : ''}`} />
                                      {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
                                    </div>
                                    <div className="pm-row">
                                      <div className="pm-input-group">
                                        <label>Expiry *</label>
                                        <input type="text" placeholder="MM/YY" value={cardExpiry} onChange={e => setCardExpiry(formatExpiry(e.target.value))} className={`pm-input ${errors.cardExpiry ? 'input-error' : ''}`} />
                                        {errors.cardExpiry && <span className="field-error">{errors.cardExpiry}</span>}
                                      </div>
                                      <div className="pm-input-group">
                                        <label>CVC *</label>
                                        <input type="text" placeholder="123" maxLength={4} value={cardCvc} onChange={e => setCardCvc(e.target.value.replace(/\D/g, ''))} className={`pm-input ${errors.cardCvc ? 'input-error' : ''}`} />
                                        {errors.cardCvc && <span className="field-error">{errors.cardCvc}</span>}
                                      </div>
                                    </div>
                                </div>
                            )}

                            <label className={`pm-label ${paymentMethod === 'upi' ? 'active' : ''}`}>
                                <input type="radio" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                                <img src={upiLogo} alt="UPI" className="pm-icon" />
                                UPI / Virtual ID
                            </label>
                            {paymentMethod === 'upi' && (
                                <div className="pm-details">
                                    <div className="pm-input-group full">
                                      <label>Enter UPI ID *</label>
                                      <input type="text" placeholder="yourname@paytm" value={upiId} onChange={e => setUpiId(e.target.value)} className={`pm-input ${errors.upiId ? 'input-error' : ''}`} />
                                      {errors.upiId && <span className="field-error">{errors.upiId}</span>}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button onClick={processInitialPayment} className="btn-primary checkout-submit-btn">
                          Pay ₹{totalCost.toLocaleString('en-IN')}
                        </button>
                    </>
                )}

                {paymentStep === 'otp' && (
                    <div className="payment-methods" style={{textAlign: 'center', padding: '24px 0'}}>
                        <h3 style={{marginBottom: '16px'}}>Bank Authentication</h3>
                        <p style={{color: 'var(--color-text-secondary)', marginBottom: '24px', fontSize: '0.9rem'}}>
                            Please enter the OTP sent to your registered mobile number ending in ****{guestPhone.slice(-4) || 'XXXX'}
                        </p>
                        <div className="pm-input-group full" style={{maxWidth: '300px', margin: '0 auto 24px'}}>
                            <input 
                                type="text" 
                                placeholder="Enter OTP" 
                                value={otpCode} 
                                onChange={e => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                className={`pm-input ${errors.otp ? 'input-error' : ''}`} 
                                style={{textAlign: 'center', letterSpacing: '4px', fontSize: '1.2rem'}}
                            />
                            {errors.otp && <span className="field-error">{errors.otp}</span>}
                        </div>
                        <button onClick={verifyOtpAndPay} disabled={isProcessing} className="btn-primary checkout-submit-btn">
                          {isProcessing ? 'Verifying...' : 'Verify & Pay'}
                        </button>
                        <button onClick={() => setPaymentStep('details')} className="btn-outline checkout-submit-btn" style={{marginTop: '12px'}}>
                          Cancel
                        </button>
                    </div>
                )}

                {paymentStep === 'upi-waiting' && (
                    <div className="payment-methods" style={{textAlign: 'center', padding: '40px 0'}}>
                        <div style={{marginBottom: '24px'}}>
                            <div className="spinner" style={{width: '40px', height: '40px', border: '3px solid rgba(0, 242, 254, 0.2)', borderTopColor: 'var(--color-cyan)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto'}}></div>
                        </div>
                        <h3 style={{marginBottom: '16px'}}>Awaiting Approval</h3>
                        <p style={{color: 'var(--color-text-secondary)', fontSize: '0.9rem', maxWidth: '300px', margin: '0 auto'}}>
                            Please open your UPI app ({upiId}) and approve the payment of ₹{totalCost.toLocaleString('en-IN')}
                        </p>
                        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Checkout;
