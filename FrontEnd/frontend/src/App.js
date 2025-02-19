import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Components/Signup';
import SignIn from './Components/SignIn';
import Home from './Components/Home';
import Profile from './Components/Profile'; 
import Settings from './Components/Settings'; // Import Settings Page
import Feedback from './Components/Feedback';
import Complaint from './Components/Complaint';
//import { ThemeProvider } from './ThemeContext'; // Import ThemeProvider

function App() {
  return (
  
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/complaint" element={<Complaint />} />
          
        </Routes>
      </Router>
   
  );
}

export default App;
