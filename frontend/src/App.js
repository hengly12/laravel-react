import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/admin.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

// Import necessary components
import HomePage from './components/home-page';
import AdminLayout from './layout/layout'; // Create this layout component
import Home from './pages/home';
import Create from './pages/create';
import Edit from './pages/edit';
import View from './pages/view';
import Product from './pages/create-product';
import ListingProduct from './pages/listing-product';
import EditProduct from './pages/edit-product';
import ViewProduct from './pages/view-product';
import Login from './auth/login';
import PrivateRoute from './auth/private-route';
import ProductDetailPage from './components/product-detail';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product-detail" element={<ProductDetailPage />} />
      <Route path="/login" element={<Login />} />
      
      <Route path="/admin" element={<PrivateRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="user-listing" element={<Home />} />
          <Route path="create-user" element={<Create />} />
          <Route path="product" element={<Product />} />
          <Route path="listing-product" element={<ListingProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="view-product/:id" element={<ViewProduct />} />
          <Route path="edit/:id" element={<Edit />} />
          <Route path="view/:id" element={<View />} />
        </Route>
      </Route>
    </Routes>
  </Router>
  );
}

export default App;
