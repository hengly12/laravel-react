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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };


  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
    },
    header: {
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '20px 0',
      marginBottom: '30px',
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
    },
    headerTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333333',
      margin: '0',
    },
    mainContent: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '30px',
      marginBottom: '50px',
    },
    contactInfoSection: {
      flex: '1 1 400px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      padding: '30px',
    },
    contactFormSection: {
      flex: '1 1 400px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      padding: '30px',
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#333333',
      marginTop: '0',
      marginBottom: '24px',
    },
    contactItem: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '20px',
    },
    icon: {
      width: '24px',
      height: '24px',
      marginRight: '12px',
      color: '#4F46E5',
    },
    contactLabel: {
      fontSize: '16px',
      fontWeight: '500',
      color: '#333333',
      margin: '0 0 4px 0',
    },
    contactText: {
      fontSize: '14px',
      color: '#666666',
      margin: '0',
    },
    socialSection: {
      marginTop: '30px',
    },
    socialTitle: {
      fontSize: '16px',
      fontWeight: '500',
      color: '#333333',
      marginBottom: '16px',
    },
    socialLinks: {
      display: 'flex',
      gap: '16px',
    },
    socialLink: {
      color: '#999999',
      transition: 'color 0.2s',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#333333',
      marginBottom: '8px',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '14px',
      border: '1px solid #dddddd',
      borderRadius: '4px',
      boxSizing: 'border-box',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      fontSize: '14px',
      border: '1px solid #dddddd',
      borderRadius: '4px',
      minHeight: '120px',
      boxSizing: 'border-box',
    },
    submitButton: {
      backgroundColor: '#4F46E5',
      color: '#ffffff',
      border: 'none',
      borderRadius: '4px',
      padding: '12px 20px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      width: '100%',
      transition: 'background-color 0.2s',
    },
    successMessage: {
      backgroundColor: '#ECFDF5',
      padding: '16px',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'flex-start',
    },
    successIcon: {
      width: '20px',
      height: '20px',
      color: '#10B981',
      marginRight: '12px',
    },
    successTitle: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#065F46',
      margin: '0 0 4px 0',
    },
    successText: {
      fontSize: '14px',
      color: '#047857',
      margin: '0',
    },
    faqSection: {
      marginTop: '60px',
      marginBottom: '50px',
    },
    faqTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: '30px',
    },
    faqContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      overflow: 'hidden',
    },
    faqItem: {
      padding: '24px',
      borderBottom: '1px solid #eeeeee',
    },
    faqQuestion: {
      fontSize: '16px',
      fontWeight: '500',
      color: '#333333',
      margin: '0 0 8px 0',
    },
    faqAnswer: {
      fontSize: '14px',
      color: '#666666',
      margin: '0',
    },
    footer: {
      backgroundColor: '#1F2937',
      color: '#ffffff',
      padding: '50px 0 20px',
    },
    footerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '30px',
    },
    footerColumn: {
      flex: '1 1 200px',
      marginBottom: '30px',
    },
    footerTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#ffffff',
      marginTop: '0',
      marginBottom: '16px',
    },
    footerText: {
      fontSize: '14px',
      color: '#D1D5DB',
      margin: '0 0 16px 0',
    },
    footerLinks: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
    },
    footerLinkItem: {
      marginBottom: '10px',
    },
    footerLink: {
      color: '#D1D5DB',
      textDecoration: 'none',
      fontSize: '14px',
      transition: 'color 0.2s',
    },
    newsletterForm: {
      display: 'flex',
      marginTop: '16px',
    },
    newsletterInput: {
      padding: '10px',
      fontSize: '14px',
      border: 'none',
      borderRadius: '4px 0 0 4px',
      flex: '1',
    },
    newsletterButton: {
      backgroundColor: '#4F46E5',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0 4px 4px 0',
      padding: '10px 16px',
      fontSize: '14px',
      cursor: 'pointer',
    },
    copyright: {
      borderTop: '1px solid #374151',
      marginTop: '30px',
      paddingTop: '20px',
      textAlign: 'center',
    },
    copyrightText: {
      fontSize: '14px',
      color: '#D1D5DB',
    }
  };

  return (
    <div className="container-fluid">
      <Header
        cart={cart}
        totalCartItems={totalCartItems}
      />
       <div style={styles.container}>
        <main>
          <div style={styles.mainContent}>
            {/* Contact Information */}
            <div style={styles.contactInfoSection}>
              <h2 style={styles.sectionTitle}>Get in Touch</h2>
              
              <div>
                <div style={styles.contactItem}>
                  <svg style={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p style={styles.contactLabel}>Phone</p>
                    <p style={styles.contactText}>+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div style={styles.contactItem}>
                  <svg style={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p style={styles.contactLabel}>Email</p>
                    <p style={styles.contactText}>support@yourstore.com</p>
                  </div>
                </div>
                
                <div style={styles.contactItem}>
                  <svg style={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p style={styles.contactLabel}>Location</p>
                    <p style={styles.contactText}>123 E-Commerce St, Suite 100</p>
                    <p style={styles.contactText}>San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>
              
              <div style={styles.socialSection}>
                <h3 style={styles.socialTitle}>Connect With Us</h3>
                <div style={styles.socialLinks}>
                  <a href="#" style={styles.socialLink}>
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" style={styles.socialLink}>
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" style={styles.socialLink}>
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div style={styles.contactFormSection}>
              <h2 style={styles.sectionTitle}>Send Us a Message</h2>
              
              {submitted ? (
                <div style={styles.successMessage}>
                  <svg style={styles.successIcon} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 style={styles.successTitle}>Message Sent</h3>
                    <p style={styles.successText}>Thank you for your message! We'll get back to you as soon as possible.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={styles.formGroup}>
                    <label htmlFor="name" style={styles.label}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      style={styles.input}
                      required
                    />
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      style={styles.input}
                      required
                    />
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label htmlFor="subject" style={styles.label}>
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      style={styles.input}
                      required
                    />
                  </div>
                  
                  <div style={styles.formGroup}>
                    <label htmlFor="message" style={styles.label}>
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      style={styles.textarea}
                      required
                    />
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      style={styles.submitButton}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#4338CA';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#4F46E5';
                      }}
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          {/* FAQ Section */}
          <div style={styles.faqSection}>
            <h2 style={styles.faqTitle}>Frequently Asked Questions</h2>
            
            <div style={styles.faqContainer}>
              <div style={styles.faqItem}>
                <h3 style={styles.faqQuestion}>What are your shipping options?</h3>
                <p style={styles.faqAnswer}>We offer standard shipping (3-5 business days), express shipping (1-2 business days), and international shipping (7-14 business days).</p>
              </div>
              
              <div style={styles.faqItem}>
                <h3 style={styles.faqQuestion}>What is your return policy?</h3>
                <p style={styles.faqAnswer}>We accept returns within 30 days of purchase. Items must be in original condition with tags attached.</p>
              </div>
              
              <div style={styles.faqItem}>
                <h3 style={styles.faqQuestion}>How can I track my order?</h3>
                <p style={styles.faqAnswer}>You can track your order by logging into your account or using the tracking number provided in your shipping confirmation email.</p>
              </div>
              
              <div style={styles.faqItem}>
                <h3 style={styles.faqQuestion}>Do you ship internationally?</h3>
                <p style={styles.faqAnswer}>Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
      
     
      <Footer />
    </div>
  );
};

export default ShopPage;