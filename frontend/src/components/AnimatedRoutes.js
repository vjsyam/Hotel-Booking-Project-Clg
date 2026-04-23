import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Payment from './Payment';
import Checkout from './Checkout';
import Dashboard from './Dashboard'; 
import Offers from './Offers';
import Experiences from './Experiences';
import Profile from './Profile';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/payment/:roomId" element={<Payment />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
