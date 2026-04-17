import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import "../styles/Navbar.scss";

export default function Navbar({ search, setSearch }) {
  const { user, logout, cartCount } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  function handleSignOut() {
    logout();
    navigate("/login");
  }

  function handleLogoClick() {
    navigate("/products");
  }

  function handleSearchKeyDown(e) {
    if (e.key === "Enter") {
      // search is already debounced in ProductsPage
    }
  }

  const showSearch = typeof setSearch === "function";

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={handleLogoClick} role="button" tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleLogoClick()}>
        <span className="logo-icon">🛒</span>
        <span className="logo-text">ShopKart</span>
      </div>

      {showSearch && (
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="search-input"
            aria-label="Search products"
          />
          <button className="search-btn" aria-label="Search">🔍</button>
        </div>
      )}

      <div className="navbar-right">
        {user && (
          <span className="nav-greeting">
            Hello, <strong>{user.firstName}</strong>
          </span>
        )}

        <button
          className="nav-btn cart-nav-btn"
          onClick={() => navigate("/cart")}
          aria-label={`Cart, ${cartCount} items`}
        >
          🛒 Cart
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </button>

        <button className="nav-btn logout-btn" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </nav>
  );
}