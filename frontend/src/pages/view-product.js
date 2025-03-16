import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import http from "../http";
import '../style/home.css';
import Header from '../components/header';
import Footer from '../components/footer';
import { useAuth } from '../context/AuthContext';

const ViewProduct = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = () => {
    setIsLoading(true);
    http.get(`/product/${id}`)
      .then(res => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching product:", error);
        setIsLoading(false);
      });
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

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

  if (!product) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Product not found. <Link to="/shop">Return to shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <Header
        cart={cart}
        totalCartItems={totalCartItems}
      />
      
      <div className="container-fluid">
    

      <div className="container py-4">
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-outline-secondary mb-4"
        >
          <ArrowLeft size={16} className="me-2" /> Back to products
        </button>
        
        <div className="row">
          <div className="col-md-6">
            <div className="card border-0 shadow-sm">
              {product.image ? (
                <img
                  src={`http://localhost:8000${product.image}`}
                  alt={product.name}
                  className="card-img-top img-fluid p-4"
                  style={{ objectFit: 'contain', height: '400px' }}
                />
              ) : (
                <div className="bg-light d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
                  <span className="text-muted">No Image Available</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="col-md-6">
            <h2 className="mb-3">{product.name}</h2>
            <h4 className="text-primary mb-4">${product.price}</h4>
            
            <div className="mb-4">
              <h5>Description</h5>
              <p className="text-muted">{product.description}</p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="quantity" className="form-label">Quantity</label>
              <div className="input-group" style={{ width: '150px' }}>
                <button 
                  className="btn btn-outline-secondary" 
                  type="button"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  className="form-control text-center none-margin"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                />
                <button 
                  className="btn btn-outline-secondary" 
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            <button 
              onClick={() => addToCart(product)}
              className="btn btn-primary btn-lg d-block w-100 mb-3"
            >
              Add to Cart
            </button>
            
           
          </div>
        </div>
      </div>
    </div>
      
      <Footer />
    </div>
  );
};

export default ViewProduct;