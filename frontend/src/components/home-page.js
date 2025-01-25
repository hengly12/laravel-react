import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialProducts = [
  { 
    id: 1, 
    name: 'Stylish Sneakers', 
    price: 79.99, 
    image: '/api/placeholder/300/300', 
    description: 'Comfortable and trendy sneakers for everyday wear' 
  },
  { 
    id: 2, 
    name: 'Leather Jacket', 
    price: 129.99, 
    image: '/api/placeholder/300/300', 
    description: 'Classic leather jacket with modern design' 
  },
  { 
    id: 3, 
    name: 'Designer Sunglasses', 
    price: 99.50, 
    image: '/api/placeholder/300/300', 
    description: 'Stylish sunglasses with UV protection' 
  }
];

const HomePage = () => {
  const [cart, setCart] = useState([]);
  const [products] = useState(initialProducts);

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

  return (
    <div className="container-fluid py-5">
      {/* Header with Cart */}
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">Our Products</h1>
        <div className="position-relative">
          <button
            className="btn btn-outline-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#cartSidebar"
          >
            <ShoppingCart size={24} />
            {totalCartItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Product Grid */}
      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-md-4">
            <div className="card h-100 shadow-sm">
              <img 
                src={product.image} 
                alt={product.name} 
                className="card-img-top" 
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted">{product.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-primary fw-bold">${product.price.toFixed(2)}</span>
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

      {/* Cart Sidebar */}
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
