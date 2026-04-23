import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'; // CRITICAL FIX: The global CSS was not imported

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);