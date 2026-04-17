import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Navbar from "../components/Navbar";
import "../styles/CheckoutPage.scss";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartCount, cartTotal, setCart } = useApp();

  const [form, setForm] = useState({ name: "", address: "" });
  const [error, setError] = useState("");
  const [placed, setPlaced] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);

  // Derived
  const tax        = cartTotal * 0.18;
  const grandTotal = cartTotal + tax;

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  function handlePlaceOrder(e) {
    e.preventDefault();

    if (!form.name.trim() || !form.address.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setOrderSummary({
      items: cartCount,
      total: grandTotal
    });

    setPlaced(true);
    setCart([]);  // clear cart after order
  }

  // Empty cart 
  if (cart.length === 0 && !placed) {
    return (
      <>
        <Navbar />
        <div className="checkout-page">
          <p>Your cart is empty.</p>
          <button onClick={() => navigate("/products")}>
            Browse Products
          </button>
        </div>
      </>
    );
  }

  // Success screen 
  if (placed) {
    return (
      <>
        <Navbar />
        <div className="checkout-page">
          <div className="checkout-success">
            <h1>✓ Order Placed!</h1>
            <p>Thank you, <strong>{form.name}</strong>!</p>
            <p>Your order of <strong>{orderSummary.items} items</strong> worth 
              <strong> ₹{orderSummary.total.toFixed(2)}</strong> has been placed.
            </p>
            <button onClick={() => navigate("/products")}>
              Continue Shopping
            </button>
          </div>
        </div>
      </>
    );
  }

  // Main checkout 
  return (
    <>
      <Navbar />

      <div className="checkout-page">
        <button onClick={() => navigate("/cart")}>← Back to Cart</button>

        <h1>Checkout</h1>

        <div className="checkout-layout">

          <form onSubmit={handlePlaceOrder}>
            <h2>Delivery Details</h2>

            {error && <p className="error">{error}</p>}

            <div className="co-field">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>

            <div className="co-field">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="123, MG Road, Chennai"
              />
            </div>

            <button type="submit" className="place-order-btn">
              Place Order · ₹{grandTotal.toFixed(2)}
            </button>
          </form>

          <div className="checkout-summary">
            <h2>Order Summary</h2>

            {cart.map((item) => (
              <div key={item.id} className="checkout-item">
                <img src={item.thumbnail} alt={item.title} />
                <div>
                  <p>{item.title}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="checkout-totals">
              <div>
                <span>Subtotal ({cartCount} items)</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div>
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div>
                <span>GST (18%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="checkout-grand-total">
                <span>Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}