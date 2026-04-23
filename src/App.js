import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Payment from './components/Payment';
import Checkout from './components/Checkout';
import Dashboard from './components/Dashboard'; 
import Offers from './components/Offers';
import Experiences from './components/Experiences';
import AnimatedRoutes from './components/AnimatedRoutes';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
