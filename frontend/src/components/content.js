import React, { useRef } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import '../style/home.css';
import { useAuth } from '../context/AuthContext';

const HomeContent = ({ products, addToCart }) => {
  const swiperRef = useRef(null);
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

  return (
    <div className="content-area">
      <div className="position-relatives back-img">
        <button
          className="btn btn-primary position-absolute start-0 top-50 translate-middle-y z-3"
          onClick={() => swiperRef.current?.slidePrev()}
          style={{ zIndex: 10 }}
        >
          <i className="fa-solid fa-arrow-left"></i>
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
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <div className="container">
        <div className="hero-section">
          <div className="left-content">
            <h1>ALL YOUR ECOMMERCE BUSINESS IN ONE PLATFORM</h1>
            <p className="description">Transform your business with our comprehensive ecommerce solution. Manage inventory, process orders, and grow your online presence seamlessly. Start selling in minutes.</p>
            <a className="cta-button">
              Get Started
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
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
          <Link to={`/product/${product.id}`} key={product.id} className="col-12 col-md-4">
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
                      onClick={(e) => handleAddToCart(e, product)}
                    className="btn btn-primary"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </a>
        </div>
        <div className="right-section">
          <img src="../assets/pc-2.png" alt="Featured Property"/>
        </div>
      </div>

      {/* Cart Sidebar */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="cartSidebar"
        aria-labelledby="cartSidebarLabel"
      >
        {/* Cart content would be here */}
      </div>
    </div>
  );
};

export default HomeContent;