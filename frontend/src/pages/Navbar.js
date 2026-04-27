import React from 'react';
import { Search, LogOut, Bell, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    
    // LocalStorage එකෙන් User ගේ දත්ත ලබා ගැනීම
    const userData = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.clear(); // Token සහ User data අයින් කරන්න
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                <span className="brand-name">EcoMarket <span style={{color: '#22c55e'}}>Dashboard</span></span>
            </div>

            <div className="nav-right">
                {/* Search Bar */}
                <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                    <Search size={18} style={{position: 'absolute', left: '12px', color: '#94a3b8'}} />
                    <input type="text" placeholder="Search products..." className="nav-search" style={{paddingLeft: '40px'}} />
                </div>

                {/* Notifications */}
                <div className="nav-icon-btn">
                    <Bell size={22} color="#64748b" />
                </div>

                {/* User Profile */}
                <div className="user-profile-nav">
                    <div className="user-avatar">
                        {userData?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="user-info-text">
                        <span className="user-name">{userData?.email.split('@')[0]}</span>
                        <span className="user-role">{userData?.user_metadata?.role || 'User'}</span>
                    </div>
                </div>

                {/* Logout */}
                <div className="logout-btn-nav" onClick={handleLogout} title="Logout">
                    <LogOut size={20} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;