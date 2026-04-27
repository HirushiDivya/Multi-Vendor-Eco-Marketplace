import React, { useEffect, useState } from 'react';
import { Search, ShoppingCart, X, Info, ShoppingBag, Filter, TrendingUp } from 'lucide-react';
import axios from 'axios';
import './Dashboard.css';
import Sidebar from './Sidebar';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All'); // Category filter එක සඳහා
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [priceRange, setPriceRange] = useState(5000);

    // Category List එක
    const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Dairy'];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/products');
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
        }
    };

    // Filter Logic (Search + Category)
    const filteredProducts = products.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesPrice = parseFloat(p.price) <= priceRange;
        return matchesSearch && matchesCategory && matchesPrice;
    });

    return (


        <div className="buyer-container">
            {/* Header with Search */}
            <header className="buyer-header">
                <div className="search-wrapper" style={{ alignItems: "center" }}>
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search for fresh items..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            {/* 🥦 Category Filter Bar */}
            <div className="filter-container">
                <div className="filter-label">
                    <Filter size={18} /> <span>Filter by Category:</span>
                </div>
                <div className="category-buttons">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>


            {/* Hero Section */}
            <div className="hero-banner">
                <h1>Fresh & Eco-Friendly Products</h1>
                <p>Support local sellers and get the best quality items delivered to your door.</p>
            </div>

            {/* Layout eka patan ganna thana */}
            <div className="buyer-main-layout">

                {/* 1. Sidebar eka (Wam paththata) */}
                <Sidebar
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                />



                {/* Product Grid */}
                <main className="product-grid">
                    {loading ? (
                        <div className="loader">Loading amazing products...</div>
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
                                <div className="image-container">
                                    <img src={product.image_url || 'https://via.placeholder.com/200'} alt={product.title} />
                                    <span className="category-label">{product.category}</span>
                                </div>
                                <div className="card-body">
                                    <h3>{product.title}</h3>
                                    <p className="seller-name">By {product.profiles?.full_name}</p>
                                    <div className="card-footer">
                                        <span className="price">Rs. {parseFloat(product.price).toLocaleString()}</span>
                                        <button className="view-btn"><Info size={16} /></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-products">No products found in this category.</div>
                    )}
                </main>
                </div>

                {/* Product Details Modal (Popup) */}
                {selectedProduct && (
                    <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <button className="close-btn" onClick={() => setSelectedProduct(null)}><X /></button>
                            <div className="modal-body">
                                <div className="modal-image">
                                    <img src={selectedProduct.image_url} alt={selectedProduct.title} />
                                </div>
                                <div className="modal-info">
                                    <span className="modal-cat">{selectedProduct.category}</span>
                                    <h2>{selectedProduct.title}</h2>
                                    <p className="modal-seller">Sold by: <strong>{selectedProduct.profiles?.full_name}</strong></p>
                                    <div className="modal-desc">
                                        <h4>Description</h4>
                                        <p>{selectedProduct.description || "No description available for this product."}</p>
                                    </div>
                                    <h4><strong>{selectedProduct?.sub_category}</strong></h4>
                                    <div className="modal-meta">
                                        <div className="stock-info">
                                            Availability: <span className={selectedProduct.stock_quantity > 0 ? 'in' : 'out'}>
                                                {selectedProduct.stock_quantity > 0 ? `${selectedProduct.stock_quantity} Units left` : 'Out of Stock'}
                                            </span>
                                        </div>
                                        <div className="modal-price">Rs. {parseFloat(selectedProduct.price).toLocaleString()}</div>
                                    </div>
                                    <button className="purchase-btn" disabled={selectedProduct.stock_quantity <= 0}>
                                        <ShoppingBag size={20} />
                                        {selectedProduct.stock_quantity > 0 ? 'Purchase Now' : 'Out of Stock'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                

            </div>
            );
};

            export default Dashboard;