import React from 'react';
import { ShoppingBag, Heart, CreditCard, Star, Clock, ChevronRight } from 'lucide-react';
import './Dashboard.css'; // පොදු styles
import './BuyerDashboard.css'; // Buyer ට විශේෂ styles

const BuyerDashboard = () => {
    const stats = [
        { title: 'Active Orders', value: '03', icon: <ShoppingBag />, color: '#eff6ff', iconColor: '#3b82f6' },
        { title: 'Total Spent', value: 'Rs. 12,450', icon: <CreditCard />, color: '#ecfdf5', iconColor: '#10b981' },
        { title: 'Wishlist', value: '08 Items', icon: <Heart />, color: '#fff1f2', iconColor: '#f43f5e' },
        { title: 'Eco Points', value: '450', icon: <Star />, color: '#fef9c3', iconColor: '#ca8a04' },
    ];

    const recentOrders = [
        { id: '#ORD-9921', date: 'Oct 12, 2023', total: 'Rs. 2,500', status: 'Shipped' },
        { id: '#ORD-9910', date: 'Oct 05, 2023', total: 'Rs. 4,200', status: 'Delivered' },
    ];

    return (
        <div className="dashboard-container">
            {/* Header */}
            <header style={{ marginBottom: '30px' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1e293b' }}>Hello, Customer! 👋</h1>
                <p style={{ color: '#64748b' }}>Track your orders and explore eco-friendly products.</p>
            </header>

            {/* Stats */}
            <div className="stats-grid">
                {stats.map((item, index) => (
                    <div className="stat-card" key={index}>
                        <div className="stat-icon" style={{ backgroundColor: item.color, color: item.iconColor }}>
                            {item.icon}
                        </div>
                        <div className="stat-info">
                            <h3>{item.title}</h3>
                            <p>{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="buyer-grid">
                {/* Order Tracking */}
                <div className="order-history-card">
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px' }}>Recent Orders</h2>
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => (
                                <tr key={order.id}>
                                    <td style={{ fontWeight: 700 }}>{order.id}</td>
                                    <td>{order.date}</td>
                                    <td>{order.total}</td>
                                    <td>
                                        <span className={`status-badge ${order.status === 'Shipped' ? 'status-shipped' : 'status-delivered'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td><ChevronRight size={18} color="#94a3b8" cursor="pointer" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Wishlist / Suggestions */}
                <div className="order-history-card">
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '15px' }}>Top Picks for You</h2>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="product-mini-card">
                            <div className="product-img-placeholder"></div>
                            <div>
                                <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700 }}>Organic Product {i}</span>
                                <span style={{ color: '#22c55e', fontSize: '0.85rem', fontWeight: 600 }}>Rs. 850.00</span>
                            </div>
                        </div>
                    ))}
                    <button className="register-btn" style={{ width: '100%', marginTop: '10px', fontSize: '0.8rem' }}>
                        Browse Store
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuyerDashboard;