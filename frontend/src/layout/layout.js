import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

function AdminLayout() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Retrieve user information from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    // Clear token and user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect to login
    navigate('/login');
  };

  return (
    <div className="container-dashboard">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto nav-flex fl-pf">
          <div className='nav-fl'>
            <li className="nav-item">
              <NavLink
                to="/admin/listing-product"
                className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
              >
                Listing Product
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/product"
                className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
              >
                Create Product
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/user-listing"
                className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
              >
                User
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/admin/create-user"
                className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
              >
                Create User
              </NavLink>
            </li>
          </div>

          <div className="profile position-relative">
            {user?.profilePic ? (
            <img
              src={user.profilePic}
              alt="User Profile"
              className="rounded-circle"
              style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px' }}
            />
          ) : (
            // Fallback for when profilePic is unavailable
            <div
              className="rounded-circle bg-secondary d-flex justify-content-center align-items-center"
              style={{ width: '40px', height: '40px', marginRight: '10px' }}
            >
              <span style={{ color: '#fff', fontWeight: 'bold' }}>{user?.name?.[0] || '?'}</span>
            </div>
          )}

          {/* User's Name */}
          <span className="text-light me-3">{user?.name || 'Profile'}</span>

          {/* Logout Button */}
          <button
            className="btn btn-outline-light"
            onClick={handleLogout}
            style={{ whiteSpace: 'nowrap' }}
          >
            Logout
          </button>
          </div>
        </div>
      </nav>

      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
