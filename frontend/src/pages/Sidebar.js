import React, { useState } from 'react';
import { Filter, Star, ChevronDown, ChevronRight } from 'lucide-react';
import './sidebar.css';

const Sidebar = ({ priceRange, setPriceRange, selectedSubCategories = [],  setSelectedSubCategories}) => {
    // Category සහ ඒවට අදාළ ලංකාවේ එළවළු/පළතුරු ලිස්ට් එක
    const categoryData = [
        {
            name: 'Vegetables',
            items: ['Carrot', 'Tomato', 'Leeks', 'Brinjal', 'Pumpkin', 'Beans']
        },
        {
            name: 'Fruits',
            items: ['Mango', 'Banana', 'Papaya', 'Pineapple', 'Watermelon']
        },
        {
            name: 'Grains',
            items: ['Red Rice', 'Keeri Samba', 'Dhal', 'Kurakkan']
        }
    ];

    const [expandedCats, setExpandedCats] = useState(['Vegetables']); // Default එකක් open කරලා තිබ්බා


    // Expand/Collapse logic
    const toggleExpand = (catName) => {
        if (expandedCats.includes(catName)) {
            setExpandedCats(expandedCats.filter(c => c !== catName)); // තිබ්බොත් අයින් කරන්න
        } else {
            setExpandedCats([...expandedCats, catName]); // නැත්නම් එකතු කරන්න
        }
    };

    // Sub-category select කරන logic එක
    const handleCheckboxChange = (item) => {
        if (selectedSubCategories.includes(item)) {
            setSelectedSubCategories(selectedSubCategories.filter(i => i !== item));
        } else {
            setSelectedSubCategories([...selectedSubCategories, item]);
        }
    };


    // දැනට open වෙලා තියෙන category එක track කරන්න
    const [openCategory, setOpenCategory] = useState(null);

    const toggleCategory = (catName) => {
        setOpenCategory(openCategory === catName ? null : catName);
    };

    return (
        <div className="sidebar">
            <aside className="filter-sidebar">
                {/* Category Section */}
                <div className="sidebar-section">
                    <div className="filter-label">
                        <Filter size={18} /> <span>Filter by Category:</span>
                    </div>

                    <div className="category-list">
                        {categoryData.map((cat) => (
                            <div key={cat.name} className="category-group">
                                {/* Header */}
                                <div
                                    className={`sidebar-item ${expandedCats.includes(cat.name) ? 'active' : ''}`}
                                    onClick={() => toggleExpand(cat.name)}
                                >
                                    {expandedCats.includes(cat.name) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                    <span className="cat-name-text">{cat.name}</span>
                                </div>

                                {/* Multi-expand Sub Items with Checkbox */}
                                {expandedCats.includes(cat.name) && (
                                    <div className="sub-category-list">
                                        {cat.items.map((item) => (
                                            <label key={item} className="sub-item-label">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedSubCategories.includes(item)}
                                                    onChange={() => handleCheckboxChange(item)}
                                                />
                                                <span className="checkmark"></span>
                                                <span className="item-name">{item}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Price Filter Section */}
                    <div className="sidebar-section">
                        <h4>Price Range</h4>
                        <input
                            type="range"
                            min="0"
                            max="5000"
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="price-slider"
                        />
                        <div className="price-display">Up to Rs. {parseFloat(priceRange).toLocaleString()}</div>
                    </div>


                    {/* Ratings Section */}
                    <div className="sidebar-section">
                        <h4>Product Rating</h4>
                        {[5, 4, 3].map(star => (
                            <label key={star} className="rating-checkbox">
                                <input type="checkbox" />
                                <div className="stars-wrapper">
                                    {Array(star).fill(0).map((_, i) => (
                                        <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />
                                    ))}
                                    <span> & above</span>
                                </div>
                            </label>
                        ))}
                    </div>
                    </div>


            </aside>
        </div>
    );
};

export default Sidebar;



