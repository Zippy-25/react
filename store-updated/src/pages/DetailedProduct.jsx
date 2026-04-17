import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Navbar from "../components/Navbar";
import "../styles/DetailedProduct.scss";

export default function DetailedProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useApp();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`https://dummyjson.com/products/${productId}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch {
        setError("Could not load product. It may not exist.");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  function handleAddToCart() {
    if (!product) return;
    addToCart(product);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  }

  return (
    <>
      <Navbar />

      <main className="detail-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        {loading && (
          <div className="detail-status">
            <span className="spinner" /> Loading product…
          </div>
        )}

        {error && !loading && (
          <div className="detail-error" role="alert">⚠ {error}</div>
        )}

        {!loading && product && (
          <div className="detail-card">
            {/* Left: image */}
            <div className="detail-img-col">
              <img src={product.thumbnail} alt={product.title} />
              {product.images?.length > 1 && (
                <div className="detail-thumbnails">
                  {product.images.slice(0, 4).map((img, i) => (
                    <img key={i} src={img} alt={`${product.title} view ${i + 1}`} />
                  ))}
                </div>
              )}
            </div>

            {/* Right: info */}
            <div className="detail-info-col">
              <span className="detail-category">{product.category}</span>
              <h1 className="detail-title">{product.title}</h1>

              <div className="detail-rating">
                {"★".repeat(Math.round(product.rating))}
                {"☆".repeat(5 - Math.round(product.rating))}
                <span>{product.rating} / 5</span>
              </div>

              <p className="detail-price">₹{product.price}</p>

              {product.discountPercentage > 0 && (
                <p className="detail-discount">
                  {product.discountPercentage}% off
                </p>
              )}

              <p className="detail-description">{product.description}</p>

              <div className="detail-meta">
                {product.brand && <div><span>Brand</span><strong>{product.brand}</strong></div>}
                <div><span>Stock</span><strong>{product.stock} units</strong></div>
                {product.warrantyInformation && (
                  <div><span>Warranty</span><strong>{product.warrantyInformation}</strong></div>
                )}
                {product.shippingInformation && (
                  <div><span>Shipping</span><strong>{product.shippingInformation}</strong></div>
                )}
              </div>

              <button
                className={`add-cart-btn ${addedFeedback ? "added" : ""}`}
                onClick={handleAddToCart}
              >
                {addedFeedback ? "✓ Added to Cart!" : "Add to Cart"}
              </button>
            </div>
          </div>
        )}

        {/* Reviews */}
        {!loading && product?.reviews?.length > 0 && (
          <section className="reviews-section">
            <h2>Customer Reviews</h2>
            <div className="reviews-list">
              {product.reviews.map((rev, i) => (
                <div key={i} className="review-card">
                  <div className="review-header">
                    <strong>{rev.reviewerName}</strong>
                    <span className="review-rating">
                      {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                    </span>
                    <time>{new Date(rev.date).toLocaleDateString()}</time>
                  </div>
                  <p>{rev.comment}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}