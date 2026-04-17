import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductGrid from "../components/ProductGrid";
import "../styles/ProductsPage.scss";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  async function fetchProducts(query) {
    setLoading(true);
    setError("");
    try {
      const url = query.trim()
        ? `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
        : "https://dummyjson.com/products?limit=100";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data.products ?? []);
    } catch {
      setError("Something went wrong while loading products. Please try again.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />

      <main className="products-page">
        <div className="products-page-header">
          <h1>
            {search.trim()
              ? `Results for "${search}"`
              : "All Products"}
          </h1>
          {!loading && products.length > 0 && (
            <span className="products-count">{products.length} items</span>
          )}
        </div>

        {loading && (
          <div className="products-status">
            <span className="spinner" /> Loading products…
          </div>
        )}

        {error && !loading && (
          <div className="products-error" role="alert">
            ⚠ {error}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="products-empty">
            <span>🔍</span>
            <p>No products found{search ? ` for "${search}"` : ""}.</p>
          </div>
        )}

        {!loading && products.length > 0 && (
          <ProductGrid products={products} />
        )}
      </main>
    </>
  );
}