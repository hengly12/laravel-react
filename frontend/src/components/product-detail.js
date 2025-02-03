import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import '../style/product.css'

const ProductDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(location.state?.cart || []);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const totalCartValue = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handlePayPalCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalCartValue,
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: totalCartValue
              }
            }
          },
          items: cartItems.map(item => ({
            name: item.name,
            unit_amount: {
              currency_code: "USD",
              value: item.price
            },
            quantity: item.quantity
          }))
        }
      ]
    });
  };

  const handlePayPalApprove = async (data, actions) => {
    try {
      const order = await actions.order.capture();
      setPaymentSuccess(true);
      setCartItems([]);
    } catch (err) {
      setPaymentError("Payment failed. Please try again.");
      console.error("PayPal payment error:", err);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="container py-5">
        <div className="alert alert-success" role="alert">
          <h2>Payment Successful!</h2>
          <p>Thank you for your purchase. Your order has been processed.</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (!cartItems.length) {
    return (
      <div className="container py-5">
        <h1>Cart Details</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1>Cart Details</h1>
      <div>
        {cartItems.map((item) => (
          <div key={item.id} className="d-flex justify-content-between align-items-center border-bottom py-2">
            <div className="d-flex align-items-center">
              {item.image ? (
                <img
                  src={`http://localhost:8000${item.image}`}
                  alt={item.name}
                  style={{ width: 100, height: 100, objectFit: 'cover' }}
                />
              ) : (
                <span>No Image</span>
              )}
              <div className="ms-3">
                <h6 className="mb-1">{item.name}</h6>
                <small>Quantity: {item.quantity}</small>
                <p className="mb-0 text-muted">${(item.price * item.quantity)}</p>
              </div>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="btn btn-danger btn-sm"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="mt-4">
          <p className="fw-bold text-end">
            Total: ${totalCartValue}
          </p>
          {paymentError && (
            <div className="alert alert-danger mb-4" role="alert">
              {paymentError}
            </div>
          )}
          <div className="mt-3">
            <PayPalButtons
              createOrder={handlePayPalCreateOrder}
              onApprove={handlePayPalApprove}
              style={{ layout: "vertical" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;