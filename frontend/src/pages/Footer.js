import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <div style={containerStyle}>
                {/* Section 1: About */}
                <div style={sectionStyle}>
                    <h3 style={headingStyle}>EcoMarket</h3>
                    <p style={textStyle}>
                        Your trusted marketplace for organic and sustainable products. 
                        Supporting local vendors and a healthier planet.
                    </p>
                </div>

                {/* Section 2: Quick Links */}
                <div style={sectionStyle}>
                    <h4 style={subHeadingStyle}>Quick Links</h4>
                    <ul style={listStyle}>
                        <li><a href="/" style={linkStyle}>Home</a></li>
                        <li><a href="/shop" style={linkStyle}>Shop</a></li>
                        <li><a href="/dashboard" style={linkStyle}>Vendor Dashboard</a></li>
                        <li><a href="/about" style={linkStyle}>About Us</a></li>
                    </ul>
                </div>

                {/* Section 3: Contact Info */}
                <div style={sectionStyle}>
                    <h4 style={subHeadingStyle}>Contact Us</h4>
                    <div style={contactItemStyle}><FaPhoneAlt style={iconStyle}/> +94 112 345 678</div>
                    <div style={contactItemStyle}><FaEnvelope style={iconStyle}/> support@ecomarket.com</div>
                    <div style={contactItemStyle}><FaMapMarkerAlt style={iconStyle}/> Malabe, Sri Lanka</div>
                </div>

                {/* Section 4: Social Media */}
                <div style={sectionStyle}>
                    <h4 style={subHeadingStyle}>Follow Us</h4>
                    <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                        <FaFacebook style={socialIconStyle} />
                        <FaInstagram style={socialIconStyle} />
                        <FaTwitter style={socialIconStyle} />
                    </div>
                </div>
            </div>

            <div style={bottomBarStyle}>
                <p>&copy; {new Date().getFullYear()} Eco-Marketplace. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

// --- Styles ---
const footerStyle = {
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    padding: '40px 20px 20px 20px',
    marginTop: '17px', // Footer එක පහළම තියාගන්න උදව් වෙනවා
};

const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '30px'
};

const sectionStyle = {
    flex: '1',
    minWidth: '200px'
};

const headingStyle = { fontSize: '24px', color: '#10b981', marginBottom: '15px' };
const subHeadingStyle = { fontSize: '18px', marginBottom: '15px', borderBottom: '2px solid #10b981', display: 'inline-block', paddingBottom: '5px' };
const textStyle = { lineHeight: '1.6', color: '#cbd5e1' };
const listStyle = { listStyle: 'none', padding: 0 };
const linkStyle = { color: '#cbd5e1', textDecoration: 'none', lineHeight: '2', transition: '0.3s' };
const contactItemStyle = { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#cbd5e1' };
const iconStyle = { color: '#10b981' };
const socialIconStyle = { fontSize: '20px', cursor: 'pointer', color: '#10b981' };
const bottomBarStyle = { textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #334155', color: '#94a3b8', fontSize: '14px' };

export default Footer;