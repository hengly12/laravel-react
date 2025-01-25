import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className='container-dashboard'>
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <div className='navbar-nav mr-auto nav-flex'>
          <li className='nav-item'>
            <NavLink 
              to="/admin/listing-product"  
              className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
            >
              Listing Product
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink 
              to="/admin/product" 
              className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
            >
              Create Product
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink 
              to="/admin/user-listing" 
              className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
            >
              User
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink 
              to="/admin/create-user" 
              className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
            >
              Create User
            </NavLink>
          </li>
        </div>
      </nav>

      <div className='container'>
        <Outlet /> {/* This will render child routes */}
      </div>
    </div>
  );
}

export default AdminLayout;