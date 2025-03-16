import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>YOURSTORE</h3>
          <p>© 2025 YourStore. All rights reserved.</p>
          <p>Designed by YourTeam | Powered by YourPlatform</p>
        </div>
        <div className="footer-section">
          <h3>CATEGORIES</h3>
          <ul>
            <li><a href="#">Electronics</a></li>
            <li><a href="#">Fashion</a></li>
            <li><a href="#">Jewelry</a></li>
            <li><a href="#">Home & Living</a></li>
            <li><a href="#">Sports</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>INFORMATION</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>MY ACCOUNT</h3>
          <ul>
            <li><a href="#">My Profile</a></li>
            <li><a href="#">My Orders</a></li>
            <li><a href="#">My Wishlist</a></li>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Change Password</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>CONTACT US</h3>
          <ul>
            <li><a href="mailto:support@yourstore.com">support@yourstore.com</a></li>
            <li><a href="tel:+1234567890">+1 234 567 890</a></li>
            <li><a href="#">123 E-commerce Street, Tech City</a></li>
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