import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import http from "../http";
import { Link } from 'react-router-dom'; 

const HomePage = () => {
  const [cart, setCart] = useState([]); 
  const [products, setProducts] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    fetchAllProduct();
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
    <div className="container-fluid py-5">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">Our Products</h1>
        <div className="position-relative">
        <Link to="/product-detail" state={{ cart }}>
          <button className="btn btn-outline-primary">
            <ShoppingCart size={24} />
            {totalCartItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger">
                {totalCartItems}
              </span>
            )}
          </button>
        </Link>
        </div>
      </header>

      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-md-4">
            <div className="card h-100 shadow-sm">
              {product.image ? (
                <img
                  src={`http://localhost:8000${product.image}`}
                  alt={product.name}
                  style={{ width: 100, height: 100, objectFit: 'cover' }}
                />
              ) : (
                <span>No Image</span>
              )}
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted">{product.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-primary fw-bold">${product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
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

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="cartSidebar"
        aria-labelledby="cartSidebarLabel"
      >
        <div className="offcanvas-header">
          <h5 id="cartSidebarLabel" className="offcanvas-title">Shopping Cart</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {cart.length > 0 ? (
            <>
              {cart.map((item) => (
                <div key={item.id} className="d-flex justify-content-between align-items-center border-bottom py-2">
                  <div>
                    <h6 className="mb-1">{item.name}</h6>
                    <small>Quantity: {item.quantity}</small>
                    <p className="mb-0 text-muted">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="mt-4">
                <p className="fw-bold text-end">Total: ${totalCartValue.toFixed(2)}</p>
                <button className="btn btn-success w-100">Checkout</button>
              </div>
            </>
          ) : (
            <p className="text-center">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
