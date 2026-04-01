import { useState, useEffect } from "react";

export default function ProductsPage({ user }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false); // toggle between products and cart

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const fetchProducts = async () => {
    setLoading(true);
    let url =
      search === ""
        ? "https://dummyjson.com/products?limit=20"
        : `https://dummyjson.com/products/search?q=${search}`;

    const res = await fetch(url);
    const data = await res.json();
    setProducts(data.products);
    setLoading(false);
  };

  const addToCart = (product) => {
    // check if product already in cart
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      // if yes, just increase quantity
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // if no, add it with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // total number of items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // grand total price
  const grandTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ---- CART PAGE ----
  if (showCart) {
    return (
      <div className="products-container">
        <button onClick={() => setShowCart(false)}>← Back to Products</button>
        <h2>Your Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} />
                <div>
                  <p>{item.title}</p>
                  <p>${item.price} x {item.quantity}</p>
                  <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}

            <div className="cart-summary">
              <p>Total Items: {totalItems}</p>
              <p>Grand Total: ${grandTotal.toFixed(2)}</p>
            </div>
          </>
        )}
      </div>
    );
  }

  // ---- PRODUCTS PAGE ----
  return (
    <div className="products-container">

      {/* top bar */}
      <div className="top-bar">
        <h2>Welcome, {user.firstName}!</h2>
        <button onClick={() => setShowCart(true)}>
          Cart ({totalItems})
        </button>
      </div>

      {/* search */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {loading && <p>Loading...</p>}

      {/* products grid */}
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p className="price">${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

    </div>
  );
}
