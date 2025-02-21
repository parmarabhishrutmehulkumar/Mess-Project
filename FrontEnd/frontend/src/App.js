import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Components/Pages/Signup';
import SignIn from './Components/Pages/SignIn';
import Home from './Components/Pages/Home';
import Profile from './Components/Pages/Profile'; 
import Settings from './Components/Pages/Settings'; // Import Settings Page
import Feedback from './Components/Pages/Feedback';
import Complaint from './Components/Pages/Complaint';
import TicketPurchase from './Components/Pages/TicketPurchase'; // Import TicketPage
//import { ThemeProvider } from './ThemeContext'; // Import ThemeProvider

function App() {
  return (
  
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/purchase-ticket" element={<TicketPurchase />} />
          
        </Routes>
      </Router>
   
  );
}

export default App;
