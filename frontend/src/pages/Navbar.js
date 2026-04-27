/*import React from 'react';
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
                <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                    <Search size={18} style={{position: 'absolute', left: '12px', color: '#94a3b8'}} />
                    <input type="text" placeholder="Search products..." className="nav-search" style={{paddingLeft: '40px'}} />
                </div>

                <div className="nav-icon-btn">
                    <Bell size={22} color="#64748b" />
                </div>

                <div className="user-profile-nav">
                    <div className="user-avatar">
                        {userData?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="user-info-text">
                        <span className="user-name">{userData?.email.split('@')[0]}</span>
                        <span className="user-role">{userData?.user_metadata?.role || 'User'}</span>
                    </div>
                </div>

                <div className="logout-btn-nav" onClick={handleLogout} title="Logout">
                    <LogOut size={20} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

*/



import React, { useState } from 'react';
import { Search, LogOut, Bell, ShoppingCart, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onSearch, cartCount = 0 }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    // LocalStorage එකෙන් User දත්ත ගැනීම
    const userData = JSON.parse(localStorage.getItem('user'));
   const isLoggedIn = !!userData; 

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if (onSearch) onSearch(e.target.value); // Parent component එකට search value එක යැවීම
    };

    // 👈 Brand Name එක click කරාම navigate වන ආකාරය
    const handleBrandClick = () => {


        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        const userRole = userData?.user_metadata?.role || userData?.role;

        if (userRole === 'seller') {
            navigate('/sdashboard');
        } else if (userRole === 'buyer') {
            navigate('/Bdashboard');
        } else {
            navigate('/'); // Role එකක් නැත්නම් Home එකට
        }
    };


    return (
        <nav className="navbar">
            <div className="nav-left">
                <span className="brand-name" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <h2> EcoMarket <span className="brand-highlight">Store</span> </h2>
                </span>
            </div>

            {/* Main Functional Search Bar 
            <div className="nav-center">
                <div className="search-container">
                    <Search size={18} className="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Search for fresh items..." 
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="main-nav-search"
                    />
                </div>
            </div>
*/}
            <div className="nav-right">
                {/* Notifications */}
                <div className="nav-icon-btn">
                    <Bell size={22} />
                </div>

                {/* Shopping Cart with Badge */}
                <div className="cart-wrapper" onClick={() => navigate('/cart')}>
                    <ShoppingCart size={24} color="#1e293b" />
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </div>

                {/* User Profile */}
                <div className="user-profile-nav">
                    {isLoggedIn ? (
                        <>
                            <div className="user-avatar">
                                {userData?.email?.charAt(0).toUpperCase()}
                            </div>
                            <div className="user-info-text">
                                <span className="user-name" onClick={handleBrandClick} style={{ cursor: 'pointer' }}>
                                    {userData?.email?.split('@')[0]}
                                </span>
                                <span className="user-role">{userData?.user_metadata?.role || 'Buyer'}</span>
                            </div>
                        </>
                    ) : (
                        <div className="login-link-nav" onClick={() => navigate('/login')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div className="user-avatar guest-avatar">
                                <User size={18} />
                            </div>
                            <span className="user-name">Login</span>
                        </div>
                    )}
                </div>

                {/* Logout - පෙන්වන්නේ log වී ඇත්නම් පමණි */}
                {isLoggedIn && (
                    <button className="logout-nav-btn" onClick={handleLogout} title="Logout">
                        <LogOut size={20} />
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;