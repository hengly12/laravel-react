import { useLocation, useNavigate } from 'react-router-dom';

const ProductDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = location.state || {};  // Access the cart and setCart passed in the state

  if (!cart) {
    return <p>No cart data available.</p>;
  }

  console.log(cart, 'cart');

  const removeItem = (id) => {
    console.log(id, 'id');
    const removeItem = cart.filter((item) => item.id !== id);
    console.log(removeItem, 'removeItem');
  };

  return (
    <div className="container py-5">
      <h1>Cart Details</h1>
      {cart.length > 0 ? (
        <div>
          {cart.map((item) => (
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
                <div>
                  <h6 className="mb-1">{item.name}</h6>
                  <small>Quantity: {item.quantity}</small>
                  <p className="mb-0 text-muted">${(item.price * item.quantity).toFixed(2)}</p>
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
              Total: ${(cart.reduce((total, item) => total + (item.price * item.quantity), 0)).toFixed(2)}
            </p>
            <button className="btn btn-success w-100" onClick={() => navigate('/checkout')}>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default ProductDetailPage;
