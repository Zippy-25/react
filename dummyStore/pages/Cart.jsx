export default function Cart({ cart, setCart, onBack }) {

  function increment(id) {
    setCart(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
    );
  }

  function decrement(id) {
    setCart(prev => {
      const item = prev.find(i => i.id === id);
      if (item.quantity === 1) {
        return prev.filter(i => i.id !== id);
      }
      return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
    });
  }

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  return (
    <div className="cart-page">
      <button className="back-btn" onClick={onBack}>← Back to Products</button>
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="no-results">Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div>
                <h3>{item.title}</h3>
                <p>₹ {item.price} each</p>
                <p>Subtotal: ₹ {(Number(item.price) * item.quantity).toFixed(2)}</p>
              </div>
              <div className="cart-item-controls">
                <button className="qty-btn" onClick={() => decrement(item.id)}>−</button>
                <span className="qty-value">{item.quantity}</span>
                <button className="qty-btn" onClick={() => increment(item.id)}>+</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <p>Total Items: {totalQuantity}</p>
            <p>Total Price: ₹ {totalPrice.toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  );
}