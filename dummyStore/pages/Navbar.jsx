export default function Navbar({ isLoggedIn, setIsLoggedIn, search, setSearch, cart, setShowCart }) {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <span className="logo-text">🛒 ShopKart</span>
      </div>

      {/* Search Bar */}
      {isLoggedIn && (
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button className="search-btn">🔍</button>
        </div>
      )}

      {/* Right Side */}
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <button className="nav-btn cart-nav-btn" onClick={() => setShowCart(true)}>
              🛒 Cart
              {cart.length > 0 && (
                <span className="cart-badge">{cart.length}</span>
              )}
            </button>
            <button className="nav-btn logout-btn" onClick={() => setIsLoggedIn(false)}>
              Sign Out
            </button>
          </>
        ) : (
          <span className="nav-greeting">Welcome, Guest</span>
        )}
      </div>
    </nav>
  );
}