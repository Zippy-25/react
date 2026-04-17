import { useNavigate } from "react-router-dom";
import "../styles/ProductCard.scss";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/products/${product.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/products/${product.id}`)}
      aria-label={`View ${product.title}`}
    >
      <div className="product-card-img-wrap">
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
      </div>
      <div className="product-card-body">
        <h3 className="product-card-title">{product.title}</h3>
        <div className="product-card-meta">
          <span className="product-card-rating">⭐ {product.rating}</span>
          <span className="product-card-category">{product.category}</span>
        </div>
        <p className="product-card-price">₹{product.price}</p>
      </div>
    </div>
  );
}