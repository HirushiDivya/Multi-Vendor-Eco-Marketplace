import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Seller_Dashboard from './components/Seller/Seller_Dashboard';
import Register from './pages/Register';
import Navbar from './pages/Navbar';
import BuyerDashboard from './components/Buyer/BuyerDashboard';
import ProductDashboard from './pages/Dashbord';
import Footer from './pages/Footer';
import Sidebar from './pages/Sidebar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* මුලින්ම ලින්ක් එකට එද්දී Login පෙන්වන්න */}
        <Route path="/" element={<Navigate to="/pdashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Login වුණාට පස්සේ යන Dashboard එක */}
        <Route path="/sdashboard" element={<Seller_Dashboard />} />
        <Route path="/Bdashboard" element={<BuyerDashboard />} />
        <Route path="/pdashboard" element={<ProductDashboard />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;