import React, { useState, useEffect } from 'react'; // useEffect එකත් මෙතනම දාගන්න
import axios from 'axios';
import { Package, Users, DollarSign, TrendingUp, MoreVertical, Plus, X, Image as ImageIcon } from 'lucide-react';
import '../Seller/Seller_Dashboard.css';
import { supabase } from '../../supabaseClient'; // හරිම path එක ලබා දෙන්න
import Swal from 'sweetalert2';

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const BASE_URL = "http://localhost:5000";
    const user = JSON.parse(localStorage.getItem('user'));
    const sellerId = user?.id;

    const [products, setProducts] = useState([]); // බඩු ලැයිස්තුව තබා ගැනීමට
    const [loading, setLoading] = useState(true); // Data එනකම් loading පෙන්වීමට

    //edit 
    const [isEditing, setIsEditing] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);

    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        stock: '',
        description: '',
        category: 'Vegetables',
        sub_category: '',
        image: null
    });

    // 2. 🟢 Database එකෙන් Seller ට අදාළ products ගේන්න function එක
    const fetchProducts = async () => {
        try {
            setLoading(true);
            // ඔයාගේ backend route එක මෙතනට දාන්න (උදා: /api/products/seller/:id)
            const response = await axios.get(`http://localhost:5000/api/products/seller/${sellerId}`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    // 3. 🟢 Page එක load වෙද්දී products ගෙන්න ගන්න
    useEffect(() => {
        if (sellerId) {
            fetchProducts();
        }
    }, [sellerId]);

    const stats = [
        { title: 'Total Revenue', value: 'Rs. 45,200', icon: <DollarSign />, color: '#ecfdf5', iconColor: '#10b981' },
        { title: 'Active Orders', value: '12', icon: <Package />, color: '#eff6ff', iconColor: '#3b82f6' },
        { title: 'Total Customers', value: '148', icon: <Users />, color: '#f5f3ff', iconColor: '#8b5cf6' },
        { title: 'Growth', value: '+14%', icon: <TrendingUp />, color: '#fff7ed', iconColor: '#f59e0b' },
    ];


    // --- New Handlers for Drag, Drop & URL ---

    // 1. Drag Over (පින්තූරය උඩින් අරන් එන විට)
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    // 2. Drop Logic (පින්තූරය අතහැරිය විට)
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setNewProduct({ ...newProduct, image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // 3. URL Paste Logic (URL එකක් පේස්ට් කළ විට)
    const handleUrlChange = (e) => {
        const url = e.target.value;
        setImagePreview(url); // Preview එකට කෙලින්ම URL එක දානවා
        setNewProduct({ ...newProduct, image: null }); // File එකක් නෙවෙයි නිසා image null කරනවා
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewProduct({ ...newProduct, image: file });
            setImagePreview(URL.createObjectURL(file)); // පින්තූරය පෙන්වීමට URL එකක් සාදා ගනී
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            let finalImageUrl = imagePreview;

            // 1. අලුත් පින්තූරයක් තිබේ නම් පමණක් upload කරන්න
            if (newProduct.image) {
                const file = newProduct.image;
                const fileName = `${Date.now()}.${file.name.split('.').pop()}`;
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('product-images')
                    .upload(fileName, file);

                if (!uploadError) {
                    const { data: publicUrlData } = supabase.storage
                        .from('product-images')
                        .getPublicUrl(fileName);
                    finalImageUrl = publicUrlData.publicUrl;
                }
            }

            const productData = {
                title: newProduct.name,
                description: newProduct.description,
                price: parseFloat(newProduct.price),
                category: newProduct.category,
                sub_category: newProduct.sub_category,
                stock_quantity: parseInt(newProduct.stock),
                seller_id: sellerId,
                image_url: finalImageUrl
            };

            if (isEditing) {
                // 🟢 UPDATE 
                await axios.put(`http://localhost:5000/api/products/update/${currentProductId}`, productData);

                // SweetAlert for Success Update
                Swal.fire({
                    title: 'Updated!',
                    text: 'Your product has been updated successfully.',
                    icon: 'success',
                    confirmButtonColor: '#3b82f6'
                });

            } else {
                // 🟢 ADD 
                await axios.post('http://localhost:5000/api/products/add', productData);

                // SweetAlert for Success Add
                Swal.fire({
                    title: 'Added!',
                    text: 'New product has been added to your store.',
                    icon: 'success',
                    confirmButtonColor: '#10b981'
                });
            }

            setIsModalOpen(false);
            resetForm();
            fetchProducts();

        } catch (error) {
            console.error("Error saving product:", error);

            // SweetAlert for Error
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong while saving the product.',
                icon: 'error',
                confirmButtonColor: '#ef4444'
            });
        }
    };


    // Form එක reset කරන්න ලේසි වෙන්න මේක දාගන්න
    const resetForm = () => {
        setIsEditing(false);
        setCurrentProductId(null);
        setNewProduct({ name: '', price: '', stock: '', description: '', category: 'Vegetables', sub_category: '',  image: null });
        setImagePreview(null);
    };

    const handleEdit = (product) => {
        setIsEditing(true);
        setCurrentProductId(product.id);
        setNewProduct({
            name: product.title,
            price: product.price,
            stock: product.stock_quantity,
            description: product.description,
            category: product.category,
            category: product.sub_category,
            image: null // පින්තූරය අලුතින් දානවා නම් විතරක් update කරන්න පුළුවන්
        });
        setImagePreview(product.image_url);
        setIsModalOpen(true);
    };



    // 🟢 මෙතන 'async' අනිවාර්යයෙන්ම තිබිය යුතුයි
    const handleDelete = async (id) => {
        // SweetAlert Confirm Dialog එක පෙන්වීම
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3b82f6', // ඔයාගේ dashboard එකේ blue color එක
            cancelButtonColor: '#ef4444',  // red color එක
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel'
        }).then(async (result) => {
            // User 'Yes' ක්ලික් කළොත් පමණක් delete පියවර ක්‍රියාත්මක වේ
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://localhost:5000/api/products/delete/${id}`);

                    if (response.status === 200) {
                        // සාර්ථකව මැකුණු බව පෙන්වන Alert එක
                        Swal.fire(
                            'Deleted!',
                            'Your product has been deleted.',
                            'success'
                        );
                        fetchProducts(); // Table එක refresh කිරීම
                    }
                } catch (error) {
                    console.error("Error deleting product:", error);
                    Swal.fire(
                        'Error!',
                        'Something went wrong. Could not delete the product.',
                        'error'
                    );
                }
            }
        });
    };
 
    return (
        <div className="dashboard-container">
            {/* Page Header */}
            <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1e293b' }}>Overview</h1>
                    <p style={{ color: '#64748b' }}>Here's what's happening with your store today.</p>
                </div>
                {/* 🟢 Click කළ විට Modal එක Open වේ */}
                <button
                    className="signin-btn"
                    style={{ width: 'auto', padding: '12px 24px' }}
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus size={20} />
                    <span>Add New Product</span>
                </button>
            </header>

            {/* Stat Cards */}
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

            {/* Content Section */}
            <div className="dashboard-content-grid">
                {/* Recent Products Table */}
                <div className="table-container">
                    <div className="table-header">
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>My Products</h2>
                        <MoreVertical size={20} color="#94a3b8" cursor="pointer" />
                    </div>
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>description</th>
                                <th>Category</th>
                                <th>Sub Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Loading products...</td></tr>
                            ) : products.length > 0 ? (
                                products.map((p) => (
                                    <tr key={p.id}>
                                        <td style={{ fontWeight: 600 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                {p.image_url ? (
                                                    <img
                                                        src={p.image_url} // මෙතනට localhost කෑලි එකතු කරන්න එපා
                                                        alt={p.title}
                                                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }}
                                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }} // Load වුණේ නැත්නම් මේක පේනවා
                                                    />
                                                ) : (
                                                    <div style={{ width: '40px', height: '40px', background: '#f1f5f9', borderRadius: '5px' }} />
                                                )}
                                                {p.title}
                                            </div>
                                        </td>
                                        <td>Rs. {p.price}</td>
                                        <td>
                                            <span style={{ color: p.stock_quantity === 0 ? '#ef4444' : 'inherit' }}>
                                                {p.stock_quantity} units
                                            </span>
                                        </td>
                                        <td>{p.description}</td>
                                        <td>{p.category}</td>
                                        <td>{p.sub_category}</td>

                                        <td>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                {/* Edit Button */}
                                                <button
                                                    onClick={() => handleEdit(p)}
                                                    style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontWeight: 600 }}
                                                >
                                                    Edit
                                                </button>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => handleDelete(p.id)}
                                                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 600 }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No products found. Add your first product!</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>



                {/* Side Activity/Info Box */}
                <div className="table-container">
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px' }}>Top Categories</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {['Vegetables', 'Fruits', 'Dairy', 'Grains'].map((cat, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#f8fafc', borderRadius: '12px' }}>
                                <span style={{ fontWeight: 600, color: '#475569' }}>{cat}</span>
                                <span style={{ color: '#22c55e', fontWeight: 700 }}>{Math.floor(Math.random() * 100)}%</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>


            {/* 🔴 ADD PRODUCT MODAL 🔴 */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                                {isEditing ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <X size={24} cursor="pointer" onClick={() => setIsModalOpen(false)} />
                        </div>

                        <form onSubmit={handleAddProduct} className="space-y-4">



                            {/* 📷 Image Upload Section */}
                            <div className="form-group">
                                <label>Product Image (Drag & Drop or Paste URL)</label>

                                {/* Drag & Drop Area */}
                                <div
                                    className="image-upload-wrapper"
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    onClick={() => document.getElementById('imageInput').click()}
                                    style={{
                                        border: '2px dashed #cbd5e1',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        padding: '20px',
                                        background: '#f8fafc',
                                        minHeight: '150px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="preview-img" style={{ maxWidth: '100%', maxHeight: '140px', borderRadius: '8px' }} />
                                    ) : (
                                        <div className="upload-icon-text">
                                            <ImageIcon size={32} color="#94a3b8" />
                                            <p style={{ fontSize: '14px', color: '#64748b' }}>Drag & Drop Image or Click to Upload</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        id="imageInput"
                                        hidden
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </div>

                                {/* URL Input Area */}
                                <div style={{ marginTop: '10px' }}>
                                    <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Or Paste Image URL:</p>
                                    <input
                                        type="text"
                                        placeholder="https://example.com/image.jpg"
                                        className="url-input"
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            borderRadius: '8px',
                                            border: '1px solid #e2e8f0',
                                            fontSize: '14px'
                                        }}
                                        onChange={handleUrlChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Product Name</label>
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        placeholder="Ex: Organic Tomatoes"
                                        required
                                        value={newProduct.name}
                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label>Price (Rs.)</label>
                                    <div className="input-wrapper">
                                        <input
                                            type="number"
                                            placeholder="500"
                                            required
                                            value={newProduct.price}
                                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label>Stock Qty</label>
                                    <div className="input-wrapper">
                                        <input
                                            type="number"
                                            placeholder="20"
                                            required
                                            value={newProduct.stock}
                                            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Product description</label>
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        placeholder="Ex: Organic Tomatoes"
                                        required
                                        value={newProduct.description}
                                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
                                    value={newProduct.category}
                                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                >
                                    <option>Vegetables</option>
                                    <option>Fruits</option>
                                    <option>Dairy</option>
                                    <option>Grains</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Product sub_category</label>
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        placeholder="carret"
                                        required
                                        value={newProduct.sub_category}
                                        onChange={(e) => setNewProduct({ ...newProduct, sub_category: e.target.value })}
                                    />
                                </div>
                            </div>



                            <div className="modal-footer">
                                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="signin-btn" style={{ flex: 2 }}>{isEditing ? 'Update Changes' : 'Save Product'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;