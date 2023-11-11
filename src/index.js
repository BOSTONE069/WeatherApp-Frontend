import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import AppContextProvider from './Context/applicationContext';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppContextProvider>
     <Router>
      <App />
    </Router>
    <Toaster
      toastOptions={{
        duration: 5000,
        style: {
          background: "#7e0bdb",
          color: "#fff",
        }
      }}
    />
  </AppContextProvider> 
);