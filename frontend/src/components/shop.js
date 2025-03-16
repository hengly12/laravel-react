import React, { useState, useEffect } from 'react';
import http from "../http";
import Header from '../components/header';
import Footer from '../components/footer';
import { useNavigate  } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ShopPage = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth(); 

  const handleAddToCart = (e, product) => {
    e.preventDefault(); 
    if (user) {
      addToCart(product);
    } else {
      navigate('/login-user');
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = () => {
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

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

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
      <div className="center-content">
        <div className="shop-content py-4">
          <h2 className="mb-4">Shop All Products</h2>
          <div className="row g-4">
            {products.map((product) => (
              <div key={product.id} className="col-12 col-md-4 col-lg-3">
                <div className="card h-100 shadow-sm">
                  {product.image ? (
                    <img
                      src={`http://localhost:8000${product.image}`}
                      alt={product.name}
                      className="card-img-top"
                      style={{ height: 200, objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="card-img-top bg-light d-flex justify-content-center align-items-center" style={{ height: 200 }}>
                      <span className="text-muted">No Image</span>
                    </div>
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-muted">{product.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-primary fw-bold">${product.price}</span>
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="btn btn-primary"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ShopPage;