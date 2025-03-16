import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, LogOut, User, Settings, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = ({ cart, totalCartItems }) => {
  const { user, logout } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation(); 

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    navigate('/');
  };
  
  const getInitial = () => {
    if (!user) return 'G'; // Guest
    
    if (user.name) {
      return user.name.charAt(0).toUpperCase();
    } else if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    
    return 'U'; 
  };

  const isActive = (path) => {
    return location.pathname === path;
  };


  return (
    <header className="d-flex justify-content-between align-items-center sha">
      <h1 className="text-primary">Shop</h1>
      <div className='d-flex gap-4'>
        <Link to="/" className={`header-txt ${isActive('/') ? 'active' : ''}`}>Home</Link>
        <Link to="/shop"  className={`header-txt ${isActive('/shop') ? 'active' : ''}`}>Shop</Link>
        <Link to="/contact" className={`header-txt ${isActive('/contact') ? 'active' : ''}`}>Contact</Link>
      </div>
      <div className="position-relative d-flex align-items-center gap-3">
        <Link to="/product-detail" state={{ cart }}>
          <button className="btn btn-outline-primary">
            <ShoppingCart size={24} />
            {totalCartItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger lf">
                {totalCartItems}
              </span>
            )}
          </button>
        </Link>
        <div className="position-relative" ref={profileMenuRef}>
          <div 
            className="profile-avatar d-flex justify-content-center align-items-center bg-primary text-white rounded-circle" 
            onClick={toggleProfileMenu}
            style={{ 
              cursor: 'pointer',
              width: '40px',
              height: '40px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {getInitial()}
          </div>
          
          {isProfileMenuOpen && (
            <div className="position-absolute end-0 mt-2 py-2 bg-white rounded-md shadow-lg z-10 menu" 
                style={{ minWidth: '180px', right: 0, top: '100%' }}>
              <div className="py-1">
                {user ? (
                  <>
                    <div className="px-4 py-2 text-sm font-medium border-bottom">
                      {user.name || user.email}
                    </div>
                    <hr className="my-1" />
                    <button 
                      onClick={handleLogout} 
                      className="d-flex align-items-center w-100 px-4 py-2 text-sm text-red-600 hover-bg-gray-100 border-0 bg-transparent"
                    >
                      <LogOut size={16} className="me-2" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login-user" className="d-flex align-items-center px-4 py-2 text-sm text-gray-700 hover-bg-gray-100">
                      <LogIn size={16} className="me-2" />
                      <span>Login</span>
                    </Link>
                    <Link to="/register" className="d-flex align-items-center px-4 py-2 text-sm text-gray-700 hover-bg-gray-100">
                      <User size={16} className="me-2" />
                      <span>Register</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;