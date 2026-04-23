import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Inners.css';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import ProfileOrb from './scenes/ProfileOrb';
import FloatingShapes from './scenes/FloatingShapes';

const Profile = () => {
  const navigate = useNavigate();
  const { user, login, logout } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('trips');
  const [expandedBooking, setExpandedBooking] = useState(null);

  // Rewards calculation
  const points = 2500 + bookings.reduce((sum, b) => sum + Math.floor((b.totalCost || 0) / 10), 0);
  // Settings state
  const [settingsForm, setSettingsForm] = useState({ username: '', email: '', phone: '', currentPassword: '', newPassword: '' });
  const [settingsMsg, setSettingsMsg] = useState({ text: '', type: '' });

  // AI Concierge State
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState('');

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    setSettingsForm({ username: user.username, email: user.email, phone: user.phone || '', currentPassword: '', newPassword: '' });
    
    fetch(`http://localhost:5000/api/bookings/${user.id}`)
      .then(res => res.json())
      .then(data => { setBookings(data.bookings || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [user, navigate]);

  const generateItinerary = (hotelName) => {
     setAiGenerating(true); setAiResult('');
     setTimeout(() => {
        setAiResult(`Based on your stay at ${hotelName}:\n\nDay 1: Arrival & Local Market Tour\nDay 2: Guided Historical Walk & Fine Dining\nDay 3: Relaxation & Spa Package\n\nYour AI Concierge has notified the front desk of your interests!`);
        setAiGenerating(false);
     }, 2000);
  };

  const handleSaveSettings = async () => {
    setSettingsMsg({ text: '', type: '' });
    try {
      const response = await fetch(`http://localhost:5000/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsForm)
      });
      const data = await response.json();
      if (response.ok) {
        login(data.user); // Update context + localStorage
        setSettingsMsg({ text: '✅ Profile updated successfully!', type: 'success' });
        setSettingsForm(prev => ({ ...prev, currentPassword: '', newPassword: '' }));
      } else {
        setSettingsMsg({ text: data.error, type: 'error' });
      }
    } catch { setSettingsMsg({ text: 'Failed to connect to server', type: 'error' }); }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${bookingId}/cancel`, { method: 'PUT' });
      if (res.ok) {
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' } : b));
      }
    } catch { alert('Failed to cancel booking'); }
  };

  if (!user) return null;

  const statusColor = (status) => {
    if (status === 'Confirmed') return '#34d399';
    if (status === 'Cancelled') return '#f87171';
    return 'var(--color-text-secondary)';
  };

  return (
    <motion.div 
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: -20 }}
       transition={{ duration: 0.6 }}
       className="platform-layout"
    >
      <FloatingShapes theme="login" />
      <nav className="platform-nav">
        <div className="nav-left">
          <Link to="/" className="nav-brand"><span className="nav-brand-text">HomeySolution.</span></Link>
          <div className="nav-links">
            <Link to="/home">Stays</Link>
            <Link to="/experiences">Experiences</Link>
            <Link to="/offers">Offers</Link>
          </div>
        </div>
        <div className="nav-right">
           <button onClick={() => { logout(); navigate('/'); }} className="btn-outline">Sign Out</button>
        </div>
      </nav>

      <main className="content-wrapper" style={{paddingTop: '60px'}}>
        <div className="profile-grid">
           
           <aside className="profile-sidebar">
             <ProfileOrb />
             <h2 style={{textAlign: 'center'}}>{user.username}</h2>
             <p style={{textAlign: 'center', color: 'var(--color-text-secondary)'}}>{user.email}</p>
             
             <div className="profile-menu">
               <div className={`profile-menu-item ${activeTab === 'trips' ? 'active' : ''}`} onClick={() => setActiveTab('trips')}>🏨 My Trips</div>
               <div className={`profile-menu-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>⚙️ Account Settings</div>
               <div className="profile-menu-item">🎁 Rewards ({points.toLocaleString('en-IN')} pts)</div>
             </div>
           </aside>

           <div className="profile-content">
             
             {/* ─── MY TRIPS TAB ─── */}
             {activeTab === 'trips' && (
               <>
                 {/* AI Concierge */}
                 <div className="promo-card" style={{padding: '32px', marginBottom: '32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                    <h2 style={{marginBottom: '16px', color: 'var(--color-cyan)'}}>✨ AI Concierge Assistant</h2>
                    <p style={{color: 'var(--color-text-secondary)', marginBottom: '16px'}}>Generate an intelligent day-by-day itinerary for any of your upcoming stays.</p>
                    {aiGenerating ? (
                       <div style={{color: 'var(--color-cyan)', fontStyle: 'italic'}}>Analyzing location data... Synthesizing itinerary...</div>
                    ) : aiResult ? (
                       <div style={{background: 'rgba(0,0,0,0.5)', padding: '16px', borderRadius: '12px', width: '100%', whiteSpace: 'pre-line', border: '1px solid rgba(0, 242, 254, 0.3)'}}>
                          {aiResult}
                       </div>
                    ) : (
                       <button onClick={() => generateItinerary(bookings.length > 0 ? bookings[0].roomName : 'Your Next Destination')} className="btn-primary" disabled={bookings.length === 0}>
                          {bookings.length === 0 ? "Book a room first" : "Generate Itinerary"}
                       </button>
                    )}
                 </div>

                 {/* Booking History */}
                 <div className="profile-main-card">
                    <h2>Booking History</h2>
                    
                    {loading ? <p>Loading trips...</p> : bookings.length === 0 ? (
                      <div style={{marginTop: '24px', padding: '24px', border: '1px dashed var(--color-border)', borderRadius: '8px', textAlign: 'center'}}>
                         <h3 style={{marginBottom: '8px'}}>No upcoming trips</h3>
                         <p style={{color: 'var(--color-text-secondary)', marginBottom: '16px'}}>Time to start planning your next great adventure.</p>
                         <button onClick={() => navigate('/home')} className="btn-primary">Start Exploring</button>
                      </div>
                    ) : (
                      <div style={{marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
                        {bookings.map((booking) => (
                           <div key={booking.id} style={{
                             background: 'rgba(10,10,16,0.5)', 
                             border: '1px solid rgba(255,255,255,0.05)', 
                             borderRadius: '12px', 
                             overflow: 'hidden',
                             transition: 'all 0.3s ease'
                           }}>
                             {/* Summary Row */}
                             <div 
                               style={{display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', cursor: 'pointer'}}
                               onClick={() => setExpandedBooking(expandedBooking === booking.id ? null : booking.id)}
                             >
                               <div style={{background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px', fontSize: '1.5rem'}}>🏨</div>
                               <div style={{flex: 1}}>
                                 <h4 style={{marginBottom: '4px'}}>{booking.roomName}</h4>
                                 <p style={{color: 'var(--color-text-secondary)', fontSize: '0.85rem'}}>
                                   📅 {booking.checkIn}{booking.checkOut ? ` → ${booking.checkOut}` : ''} • 🌙 {booking.nights} Night{booking.nights > 1 ? 's' : ''}
                                 </p>
                               </div>
                               <div style={{textAlign: 'right'}}>
                                 <span style={{color: statusColor(booking.status), fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px'}}>{booking.status}</span>
                                 <p style={{color: 'var(--color-cyan)', fontWeight: 'bold', marginTop: '4px'}}>₹{(booking.totalCost || 0).toLocaleString('en-IN')}</p>
                               </div>
                               <span style={{color: 'var(--color-text-secondary)', fontSize: '1.2rem'}}>{expandedBooking === booking.id ? '▲' : '▼'}</span>
                             </div>

                             {/* Expanded Details */}
                             {expandedBooking === booking.id && (
                               <div style={{
                                 padding: '0 20px 20px', 
                                 borderTop: '1px solid rgba(255,255,255,0.05)',
                                 display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px',
                                 paddingTop: '16px'
                               }}>
                                 <div><span style={{color: 'var(--color-text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase'}}>Guest Name</span><p>{booking.guestName || user.username}</p></div>
                                 <div><span style={{color: 'var(--color-text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase'}}>Phone</span><p>{booking.guestPhone || 'N/A'}</p></div>
                                 <div><span style={{color: 'var(--color-text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase'}}>Email</span><p>{booking.guestEmail || user.email}</p></div>
                                 <div><span style={{color: 'var(--color-text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase'}}>Payment</span><p style={{textTransform: 'capitalize'}}>{booking.paymentMethod || 'Card'}</p></div>
                                 <div><span style={{color: 'var(--color-text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase'}}>Room Cost</span><p>₹{(booking.roomCost || booking.totalCost || 0).toLocaleString('en-IN')}</p></div>
                                 <div><span style={{color: 'var(--color-text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase'}}>GST + Fees</span><p>₹{((booking.gstAmount || 0) + (booking.serviceFee || 0)).toLocaleString('en-IN')}</p></div>
                                 {booking.specialRequests && (
                                   <div style={{gridColumn: '1 / -1'}}>
                                     <span style={{color: 'var(--color-text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase'}}>Special Requests</span>
                                     <p>{booking.specialRequests}</p>
                                   </div>
                                 )}
                                 <div style={{gridColumn: '1 / -1', display: 'flex', gap: '12px', marginTop: '8px'}}>
                                   <span style={{fontSize: '0.8rem', color: 'var(--color-text-secondary)'}}>Booking ID: {booking.id}</span>
                                   {booking.status === 'Confirmed' && (
                                     <button 
                                       onClick={() => handleCancelBooking(booking.id)}
                                       style={{marginLeft: 'auto', background: 'rgba(248, 113, 113, 0.15)', border: '1px solid rgba(248, 113, 113, 0.4)', color: '#f87171', padding: '6px 16px', borderRadius: '8px', fontSize: '0.85rem', cursor: 'pointer'}}
                                     >
                                       Cancel Booking
                                     </button>
                                   )}
                                 </div>
                               </div>
                             )}
                           </div>
                        ))}
                      </div>
                    )}
                 </div>
               </>
             )}

             {/* ─── SETTINGS TAB ─── */}
             {activeTab === 'settings' && (
               <div className="profile-main-card">
                 <h2 style={{marginBottom: '32px'}}>Account Settings</h2>
                 
                 {settingsMsg.text && (
                   <div style={{
                     padding: '12px 16px', borderRadius: '8px', marginBottom: '20px',
                     background: settingsMsg.type === 'success' ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)',
                     border: `1px solid ${settingsMsg.type === 'success' ? 'rgba(52,211,153,0.3)' : 'rgba(248,113,113,0.3)'}`,
                     color: settingsMsg.type === 'success' ? '#34d399' : '#f87171'
                   }}>
                     {settingsMsg.text}
                   </div>
                 )}

                 <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                   <div className="payment-input-group" style={{flex: 1}}>
                     <label style={{fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-purple)', marginBottom: '8px'}}>Username</label>
                     <input type="text" value={settingsForm.username} onChange={e => setSettingsForm({...settingsForm, username: e.target.value})} className="auth-input" />
                   </div>
                   <div className="payment-input-group">
                     <label style={{fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-purple)', marginBottom: '8px'}}>Email</label>
                     <input type="email" value={settingsForm.email} onChange={e => setSettingsForm({...settingsForm, email: e.target.value})} className="auth-input" />
                   </div>
                   <div className="payment-input-group">
                     <label style={{fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-purple)', marginBottom: '8px'}}>Phone Number</label>
                     <input type="tel" placeholder="+91 98765 43210" value={settingsForm.phone} onChange={e => setSettingsForm({...settingsForm, phone: e.target.value})} className="auth-input" />
                   </div>

                   <div style={{borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', marginTop: '8px'}}>
                     <label style={{fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-cyan)', marginBottom: '16px', display: 'block'}}>Change Password</label>
                   </div>
                   <div className="payment-input-group">
                     <label style={{fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-purple)', marginBottom: '8px'}}>Current Password</label>
                     <input type="password" placeholder="Enter current password" value={settingsForm.currentPassword} onChange={e => setSettingsForm({...settingsForm, currentPassword: e.target.value})} className="auth-input" />
                   </div>
                   <div className="payment-input-group">
                     <label style={{fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-purple)', marginBottom: '8px'}}>New Password</label>
                     <input type="password" placeholder="Enter new password" value={settingsForm.newPassword} onChange={e => setSettingsForm({...settingsForm, newPassword: e.target.value})} className="auth-input" />
                   </div>

                   <button onClick={handleSaveSettings} className="btn-primary" style={{padding: '14px', marginTop: '8px'}}>Save Changes</button>
                 </div>
               </div>
             )}

           </div>
        </div>
      </main>
    </motion.div>
  );
};

export default Profile;
