export default function DetailedProduct({ product, onBack, AddToCart }) {
  return (
    <div className="detailed-product">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <button className="add-cart-btn" onClick={() => AddToCart(product)}>Add To Cart</button>

      <h2>{product.title}</h2>
      <img src={product.thumbnail} alt={product.title} />

      <p>{product.description}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Rating:</strong> {product.rating} ⭐️</p>
      <p><strong>Stock:</strong> {product.stock}</p>
      <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
      <p><strong>Shipping:</strong> {product.shippingInformation}</p>

      <div className="reviews-section">
        <h3>Customer Reviews</h3>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((rev, index) => (
            <div key={index} className="review-item">
              <p>
                <strong>{rev.reviewerName}</strong> &nbsp;
                <span style={{ color: "#999", fontSize: "0.85rem" }}>
                  {new Date(rev.date).toLocaleDateString()}
                </span>
              </p>
              <p>Rating: {rev.rating} ⭐</p>
              <p>{rev.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}