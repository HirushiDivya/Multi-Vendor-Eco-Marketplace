import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Navbar from './pages/Navbar';
import BuyerDashboard from './pages/BuyerDashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* මුලින්ම ලින්ක් එකට එද්දී Login පෙන්වන්න */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Login වුණාට පස්සේ යන Dashboard එක */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Bdashboard" element={<BuyerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;