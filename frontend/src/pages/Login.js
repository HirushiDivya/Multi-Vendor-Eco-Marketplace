import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, UserPlus, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // External CSS එක සම්බන්ධ කිරීම

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

   /* const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/users/login', {
                email,
                password,
            });

            if (response.data.session) {
                localStorage.setItem('token', response.data.session.access_token);
                localStorage.setItem('user', JSON.stringify(response.data.session.user));
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };*/
    const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
        const response = await axios.post('http://localhost:5000/api/users/login', {
            email,
            password,
        });

        if (response.data.session) {
            const { access_token, user } = response.data.session;

            // 1. LocalStorage වල දත්ත Save කිරීම
            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(user));

            // 2. Role එක හඳුනා ගැනීම (Supabase metadata හෝ response එකේ ඇති ආකාරය අනුව)
            // සාමාන්‍යයෙන් user.user_metadata.role හෝ user.role ලෙස පැවතිය හැක.
            const userRole = user.user_metadata?.role || user.role;

            // 3. Role එක අනුව අදාළ Dashboard එකට Navigate කිරීම
            if (userRole === 'seller') {
                navigate('/sdashboard');
            } else if (userRole === 'buyer') {
                navigate('/bDashbord');
            } else {
                // කිසිවක් නැත්නම් default dashboard එකකට
                navigate('/dashboard');
            }
        }
    } catch (err) {
        setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="login-container">
            <div className="glass-card">

                {/* Header Section */}
                <div className="brand-icon-wrapper">
                    <div className="brand-icon">
                        <ShoppingBag size={28} />
                    </div>
                </div>
                <h2>Eco Market</h2>
                <p className="subtitle">Sign in to your account</p>

                {/* Error Notification */}
                {error && <div className="error-box">{error}</div>}

                {/* Form Section */}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <Mail size={18} />
                            <input
                                type="email"
                                required
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit" className="signin-btn" disabled={loading}>
                        <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
                        {!loading && <ArrowRight size={20} />}
                    </button>
                </form>

                {/* Footer Section */}
                <div className="footer-divider">
                    <p>New to the platform?</p>
                    <button className="register-btn" onClick={() => navigate('/register')}>
                        <UserPlus size={18} />
                        <span>Create Merchant Account</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;