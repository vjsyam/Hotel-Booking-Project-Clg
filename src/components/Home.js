import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import standard from '../components/standard.jpeg';
import deluxe from '../components/delexue.jpeg';
import suite from '../components/suite.jpeg';
import accessible from '../components/Acc.jpeg';
import family from '../components/family.jpeg';
import oceanview from '../components/oceanview.jpg';
import connecting from '../components/connecting.jpg';
import villa from '../components/villa.jpg';
import spain from '../components/spain.jpg'; 
import london from '../components/london.jpg';
import croatia from '../components/croatia.jpg'; 
import germany from '../components/germany.jpeg';
import france from '../components/france.jpeg'; 
import italy from '../components/italy.jpeg';
import swiss from '../components/swiss.jpeg';
import india from '../components/india.jpeg';
import japan from '../components/japan.jpeg'; 
import china from '../components/china.jpeg';
import singapore from '../components/singapore.jpeg';
import southafr from '../components/southafr.jpeg';

// Sample data for rooms
const rooms = [
  {
    id: 1,
    name: 'Standard Room',
    description: 'A cozy room with essential amenities.',
    price: '$100/night',
    image: standard
  },
  {
    id: 2,
    name: 'Deluxe Room',
    description: 'A spacious room with premium amenities.',
    price: '$150/night',
    image: deluxe
  },
  {
    id: 3,
    name: 'Suite',
    description: 'Luxurious suite with extra space and high-end amenities.',
    price: '$250/night',
    image: suite
  },
  {
    id: 4,
    name: 'Accessible Room',
    description: 'Designed for disabled guests with larger bathrooms, lower beds, and handrails.',
    price: '$69/night',
    image: accessible
  },
  {
    id: 5,
    name: 'Family Suite',
    description: 'Perfect choice for a family with up to 3 children.',
    price: '$100/night',
    image: family
  },
  {
    id: 6,
    name: 'Ocean View Room',
    description: 'Enjoy a full view of the ocean from our Ocean View Suite.',
    price: '$169/night',
    image: oceanview
  },
  {
    id: 7,
    name: 'Connecting Family Room',
    description: 'Families, friends, and other travelling parties may request connecting rooms – separate rooms that are joined by a door.',
    price: '$100/night',
    image: connecting
  },
  {
    id: 8,
    name: 'Villas',
    description: 'A villa is a type of house that was originally an ancient Roman upper class country house',
    price: '$200/night',
    image: villa
  },
];

// Sample data for popular destinations
const destinations = [
  {
    id: 1,
    name: 'Spain',
    image: spain,
  },
  {
    id: 2,
    name: 'London',
    image: london,
  },
  {
    id: 3,
    name: 'Croatia',
    image: croatia,
  },
  {
    id: 4,
    name: 'Germany',
    image: germany,
  },
  {
    id: 5,
    name: 'France',
    image: france,
  },
  {
    id: 6,
    name: 'Italy',
    image: italy,
  },
  {
    id: 7,
    name: 'Switzerland',
    image: swiss,
  },
  {
    id: 8,
    name: 'India',
    image: india,
  },
  {
    id: 9,
    name: 'Japan',
    image: japan,
  },
  {
    id: 10,
    name: 'China',
    image: china,
  },
  {
    id: 11,
    name: 'Singapore',
    image: singapore,
  },
  {
    id: 12,
    name: 'South Africa',
    image: southafr,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [isScrolling, setIsScrolling] = useState(true); // New state for controlling scrolling

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    const filteredDestinations = destinations.filter((destination) =>
      destination.name.toLowerCase().includes(query)
    );
    
    const filteredRooms = rooms.filter((room) =>
      room.name.toLowerCase().includes(query)
    );
    
    setFilteredDestinations(filteredDestinations);
    setFilteredRooms(filteredRooms);

    // Stop scrolling when there is input in the search box
    setIsScrolling(query === '');
  };

  const handleBookRoom = (roomId) => {
    navigate(`/payment/${roomId}`);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Book your stay with Us</h1>
        <p>1,480,086 rooms around the world are waiting for you!</p>
        <div className="booking-options">
          <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Location" />
          <input type="date" placeholder="Check-in" />
          <input type="date" placeholder="Check-out" />
          <input type="number" placeholder="Guests" min="1" />
          <button className="search-button">Search</button>
        </div>
      </header>

      <section className={`popular-destinations ${isScrolling ? 'scrolling' : ''}`}>
        <h2>Popular Destinations</h2>
        <div className="destination-list">
          {filteredDestinations.map((destination) => (
            <div key={destination.id} className="destination-card">
              <img src={destination.image} alt={destination.name} className="destination-image" />
              <h3>{destination.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="room-options">
        <h2>Our Room Options</h2>
        <div className="room-list">
          {filteredRooms.map((room) => (
            <div key={room.id} className="room-card">
              <img src={room.image} alt={room.name} className="room-image" />
              <h3>{room.name}</h3>
              <p>{room.description}</p>
              <p className="room-price">{room.price}</p>
              <button className="book-room-button" onClick={() => handleBookRoom(room.id)}>Book Room</button>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Guests Say</h2>
        <div className="testimonial-list scrolling">
          <div className="testimonial">
            <p>"Amazing experience! The room was clean and comfortable, and the service was top-notch."</p>
            <p>- John Doe</p>
          </div>
          <div className="testimonial">
            <p>"The view from the Ocean View Room was breathtaking. Highly recommend!"</p>
            <p>- Jane Smith</p>
          </div>
          <div className="testimonial">
            <p>"A perfect getaway for our family. The kids loved the Family Suite!"</p>
            <p>- Emily Johnson</p>
          </div>
          <div className="testimonial">
            <p>"The view from the Ocean View Room was spectacular. It made our vacation unforgettable!"</p>
            <p>- Olivia Brown</p>
          </div>

          <div className="testimonial">
            <p>"Exceptional service and a very comfortable stay. The staff went above and beyond!"</p>
            <p>- Michael Smith</p>
          </div>

          <div className="testimonial">
            <p>"Highly recommend the Deluxe Room! It was spacious, modern, and exceeded our expectations."</p>
            <p>- Sarah Davis</p>
          </div>

          <div className="testimonial">
            <p>"Our family enjoyed every moment. The Family Suite was perfect for our kids!"</p>
            <p>- Andrew Wilson</p>
          </div>

          <div className="testimonial">
            <p>"Such a luxurious stay. The Suite had all the amenities we needed and more!"</p>
            <p>- James Thompson</p>
          </div>

          <div className="testimonial">
            <p>"The staff was so friendly and helpful. We will definitely come back for another stay."</p>
            <p>- Jessica Williams</p>
          </div>

          <div className="testimonial">
            <p>"The breakfast buffet was amazing, and the room service was prompt and delicious."</p>
            <p>- David Martinez</p>
          </div>

          <div className="testimonial">
            <p>"We stayed in the Ocean View Room, and it was magical. Worth every penny!"</p>
            <p>- Laura White</p>
          </div>

          <div className="testimonial">
            <p>"Best vacation ever! The Family Suite was comfortable, and the kids had a blast."</p>
            <p>- Thomas Taylor</p>
          </div>

          <div className="testimonial">
            <p>"Absolutely loved the peaceful ambiance. The perfect getaway for some relaxation!"</p>
            <p>- Sophia Anderson</p>
          </div>

          <div className="testimonial">
            <p>"The accessible room was well-designed, and the staff was incredibly accommodating."</p>
            <p>- Lisa Garcia</p>
          </div>
        </div>
      </section>

      <section className="contact-us">
        <h2>Contact Us</h2>
        <p>Have questions? Reach out to our customer support team 24/7 via phone or email.</p>
      </section>

      <footer className="site-footer">
        <p>&copy; 2024 Vj LTD. All Rights Reserved.</p>
        <p>Follow us on:</p>
        <div className="social-media-icons">
          <a href="https://facebook.com">Facebook</a> | 
          <a href="https://twitter.com">Twitter</a> | 
          <a href="https://instagram.com">Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
