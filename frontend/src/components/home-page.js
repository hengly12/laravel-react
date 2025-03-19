// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import http from "../http";
import '../style/home.css';
import Header from '../components/header';
import Footer from '../components/footer';
import HomeContent from '../components/content';

const HomePage = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllProduct();
    fetchAllSlide();
  }, []);

  const fetchAllProduct = () => {
    setIsLoading(true);
    http.get('/product')
      .then(res => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  };

  const fetchAllSlide = () => {
    setIsLoading(true);
    http.get('/slides')
      .then(res => {
        setSlides(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  };

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalCartValue = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <Header
        cart={cart}
        totalCartItems={totalCartItems}
      />
      
      <HomeContent
        products={products}
        slides = {slides}
        addToCart={addToCart}
      />
      
      <Footer />
    </div>
  );
};

export default HomePage;