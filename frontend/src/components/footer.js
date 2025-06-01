import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>SHOP</h3>
          <p>© 2025 SHOP. All rights reserved.</p>
          <p>Designed by ADMIN | Powered by SHOP</p>
        </div>
        <div className="footer-section">
          <h3>MENU</h3>
          <ul>
            <Link to="/" ><li>Home</li></Link>
            <Link to="/shop" ><li>Shop</li></Link>
            <Link to="/contact" ><li>Contact</li></Link>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>CONTACT US</h3>
          <ul>
            <li><a href="mailto:support@yourstore.com">support@gmail.com</a></li>
            <li><a href="tel:+1234567890">+1 234 567 890</a></li>
            <li><a href="#">123 E-commerce </a></li>
            <li><a href="#">Follow Us on Social Media</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="payment-methods">
          <img src="../assets/pay.png" alt="pay" className="payment-icon"/>
        </div>
      </div>  
    </footer>
  );
};

export default Footer;