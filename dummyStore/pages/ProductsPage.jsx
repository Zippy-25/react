import { useState, useEffect } from "react";

export default function ProductsPage({ user }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // fetch just one product
    fetch("https://dummyjson.com/products/99")
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="products-container">
      <h2>Welcome, {user.firstName}!</h2>

      <div className="product-card">
        <img src={product.thumbnail} alt={product.title} />
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p className="price">${product.price}</p>
        <button>Add to Cart</button>
      </div>
    </div>
  );
}
