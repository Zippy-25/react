import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Navbar from "../components/Navbar";
import "../styles/Cart.scss";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, incrementCart, decrementCart, cartCount, cartTotal } = useApp();

  return (
    <>
      <Navbar />

      <main className="cart-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Continue Shopping
        </button>

        <h1>Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <span>🛒</span>
            <p>Your cart is empty.</p>
            <button className="cart-shop-btn" onClick={() => navigate("/products")}>
              Browse Products
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.thumbnail} alt={item.title} />
                  <div className="cart-item-info">
                    <h3
                      className="cart-item-title"
                      onClick={() => navigate(`/products/${item.id}`)}
                    >
                      {item.title}
                    </h3>
                    <p className="cart-item-price">₹{item.price} each</p>
                    <p className="cart-item-subtotal">
                      Subtotal: <strong>₹{(Number(item.price) * item.quantity).toFixed(2)}</strong>
                    </p>
                  </div>
                  <div className="cart-item-controls">
                    <button className="qty-btn" onClick={() => decrementCart(item.id)}>−</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => incrementCart(item.id)}>+</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="cart-summary-row">
                <span>Items ({cartCount})</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Shipping</span>
                <span className="free-shipping">Free</span>
              </div>
              <div className="cart-summary-total">
                <span>Total</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <button className="checkout-btn" onClick={() => navigate("/checkout")}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}