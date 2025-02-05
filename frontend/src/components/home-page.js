import React, { useState, useEffect,useRef  } from 'react';
import { ShoppingCart } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import http from "../http";
import { Link } from 'react-router-dom'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import '../style/home.css';
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
  const swiperRef = useRef(null);

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
        <h1 className="text-primary">Shop</h1>
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

       <div className="position-relatives">
        <button
          className="btn btn-primary position-absolute start-0 top-50 translate-middle-y z-3"
          onClick={() => swiperRef.current?.slidePrev()}
          style={{ zIndex: 10 }}
        >
          <i class="fa-solid fa-arrow-left"></i>
        </button>

        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={20}
          slidesPerView={3}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="card h-100 shadow-sm img-product">
                {product.image ? (
                  <img
                    src={`http://localhost:8000${product.image}`}
                    alt={product.name}
                    style={{ width: '100%', height: 150, objectFit: 'cover' }}
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
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="btn btn-primary position-absolute end-0 top-50 translate-middle-y z-3"
          onClick={() => swiperRef.current?.slideNext()}
          style={{ zIndex: 10 }}
        >
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <div className="container">
        <div className="hero-section">
            <div className="left-content">
                <h1>ALL YOUR ECOMMERCE BUSINESS IN ONE PLATFORM</h1>
                <p className="description">Transform your business with our comprehensive ecommerce solution. Manage inventory, process orders, and grow your online presence seamlessly. Start selling in minutes.</p>
                <a  className="cta-button">
                    Get Started
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                </a>
                <p className="already-started">
                    Already started? <a>Complete your setup</a>
                </p>
            </div>
            <div className="feature-card">
                <h2 className="feature-title">Why Choose Our Ecommerce Platform?</h2>
                <div className="feature-text">
                    <p>In today's digital age, having a robust ecommerce platform is essential for business success. Our platform offers everything you need to thrive in the online marketplace:</p>
                    <br/>
                    <p>• Integrated payment solutions with multiple gateway options</p>
                    <p>• Smart inventory management system with real-time tracking</p>
                    <p>• Advanced analytics and sales reporting</p>
                    <p>• Mobile-responsive storefront templates</p>
                    <p>• Automated order processing and fulfillment</p>
                    <br/>
                    <p>Our platform is designed to scale with your business, whether you're just starting out or managing multiple online stores. With built-in SEO tools, marketing integrations, and customer relationship management features, we provide everything you need to grow your online presence and increase sales.</p>
                </div>
            </div>
        </div>
    </div>
      <div className="row g-4 cc-row">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-md-4">
            <div className="card h-100 shadow-sm img-product">
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

      
    <div className="container-3">
      <div className="left-section">
          <h1>
              Transform Your Business with <br/> E-commerce

          </h1>
          <p className="description">
              Explore a curated selection of homes that fit your lifestyle and preferences.
          </p>
          <a className="cta-button">
              View Properties
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
          </a>
   
          </div>
          <div className="right-section">
              <img src="../assets/pc-2.png" alt="Featured Property"/>
          </div>
      </div>
    </div>
);
};

export default HomePage;
