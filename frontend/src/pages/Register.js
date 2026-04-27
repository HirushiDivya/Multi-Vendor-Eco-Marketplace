import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Login.css ම පාවිච්චි කරයි

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        role: 'buyer'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/users/register', formData);
            if (response.status === 201) {
                setSuccess('Account created successfully! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container"> {/* එකම container class එක */}
            <div className="glass-card">
                <div className="brand-icon-wrapper">
                    <div className="brand-icon">
                        <ShoppingBag size={28} />
                    </div>
                </div>
                <h2>Create Account</h2>
                <p className="subtitle">Join our eco-friendly marketplace</p>

                {error && <div className="error-box">{error}</div>}
                {success && <div className="success-box">{success}</div>}

                <form onSubmit={handleRegister}>
                    <label className="form-label-custom">Register as a:</label>
                    <div className="role-selector">
                        <div 
                            className={`role-option ${formData.role === 'buyer' ? 'active' : ''}`}
                            onClick={() => setFormData({...formData, role: 'buyer'})}
                        >
                            Buyer
                        </div>
                        <div 
                            className={`role-option ${formData.role === 'seller' ? 'active' : ''}`}
                            onClick={() => setFormData({...formData, role: 'seller'})}
                        >
                            Seller
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Full Name</label>
                        <div className="input-wrapper">
                            <User size={18} />
                            <input 
                                type="text" 
                                required
                                placeholder="John Doe"
                                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <Mail size={18} />
                            <input 
                                type="email" 
                                required
                                placeholder="john@example.com"
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <Lock size={18} />
                            <input 
                                type="password" 
                                required
                                placeholder="Minimum 6 characters"
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                    </div>

                    <button type="submit" className="signin-btn" disabled={loading}>
                        <span>{loading ? 'Creating Account...' : 'Sign Up'}</span>
                        {!loading && <ArrowRight size={20} />}
                    </button>
                </form>

                <div className="footer-divider">
                    <p>Already have an account?</p>
                    <button className="register-btn" onClick={() => navigate('/login')}>
                        <ArrowLeft size={18} />
                        <span>Back to Login</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;