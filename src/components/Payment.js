import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Payment.css';
import standard from '../components/standard.jpeg';
import delexue from '../components/delexue.jpeg';
import suite from '../components/suite.jpeg';
import Acc from '../components/Acc.jpeg';
import family from '../components/family.jpeg';
import oceanview from '../components/oceanview.jpg';
import connecting from '../components/connecting.jpg';
import villa from '../components/villa.jpg';

// Sample room data (in a real app, you might fetch this from an API or state)
const roomData = [
  {
    id: 1,
    name: 'Standard Room',
    description: 'A cozy room with essential amenities.',
    price: 100,
    image: standard
  },
  {
    id: 2,
    name: 'Deluxe Room',
    description: 'A spacious room with premium amenities.',
    price: 150,
    image: delexue
  },
  {
    id: 3,
    name: 'Suite',
    description: 'Luxurious suite with extra space and high-end amenities.',
    price: 250,
    image: suite
  },
  {
    id: 4,
    name: 'Accessible rooms',
    description: 'Designed for disabled guests, with larger bathrooms, lower beds, and handrails.',
    price: 69,
    image: Acc
  },
  {
    id: 5,
    name: 'Family Suite Rooms',
    description: 'Perfect for a family with up to 3 children.',
    price: 100,
    image: family
  },
  {
    id: 6,
    name: 'Ocean View Rooms',
    description: 'Enjoy a full view of the Indian Ocean from our Ocean View Suite.',
    price: 169,
    image: oceanview
  },
  {
    id: 7,
    name: 'Connecting Family Room',
    description: 'Separate rooms joined by a door, ideal for families or friends.',
    price: 169,
    image: connecting
  },
  {
    id: 8,
    name: 'Villas',
    description: 'A luxurious villa designed for comfort and relaxation.',
    price: 200,
    image: villa
  },
];

const Payment = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [bookingDateTime, setBookingDateTime] = useState('');
  const [nights, setNights] = useState(1); // Default to 1 night
  const navigate = useNavigate();

  useEffect(() => {
    const selectedRoom = roomData.find((room) => room.id === parseInt(roomId));
    setRoom(selectedRoom);
  }, [roomId]);

  const totalCost = room ? room.price * nights : 0;

  const handlePayment = () => {
    if (!bookingDateTime || nights < 1) {
      alert('Please select a valid booking date, time, and number of nights.');
      return;
    }

    const confirmed = window.confirm(
      `Proceed to checkout for ${nights} night(s) at $${totalCost}?`
    );
    if (confirmed) {
      navigate('/checkout', { state: { totalCost } }); // Navigate to Checkout with totalCost
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      {room && (
        <div className="room-details">
          <img src={room.image} alt={room.name} className="room-image" />
          <h3>{room.name}</h3>
          <p>{room.description}</p>
          <p>${room.price}/night</p>
        </div>
      )}
      <div className="booking-details">
        <label>
          Booking Date and Time:
          <input
            type="datetime-local"
            value={bookingDateTime}
            onChange={(e) => setBookingDateTime(e.target.value)}
            required
          />
        </label>
        <label>
          Number of Nights:
          <input
            type="number"
            min="1"
            value={nights}
            onChange={(e) => setNights(parseInt(e.target.value))}
            required
          />
        </label>
      </div>
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
};

export default Payment;
