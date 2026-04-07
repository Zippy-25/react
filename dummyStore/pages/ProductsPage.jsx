import ProductDisplay from "./ProductDisplay"
import DetailedProduct from "./DetailedProduct"
import Cart from "./Cart"
import Navbar from "./Navbar"
import { useState, useEffect } from "react"

export default function ProductsPage({ setIsLoggedIn }) {

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchProducts = async () => {
        setLoading(true)
        let url = "https://dummyjson.com/products?limit=100"
        if (search.trim()) url = `https://dummyjson.com/products/search?q=${search}`
        const res = await fetch(url)
        const data = await res.json()
        setProducts(data.products)
        setLoading(false)
      }
      fetchProducts()
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  function handleAddToCart(prod) {
    setCart(prev => {
      const existing = prev.find(i => i.id === prod.id)
      if (existing) {
        return prev.map(i => i.id === prod.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...prod, quantity: 1 }]
    })
    alert(`${prod.title} added to cart!`)
  }

  return (
    <>
      <Navbar
        isLoggedIn={true}
        setIsLoggedIn={setIsLoggedIn}
        search={search}
        setSearch={setSearch}
        cart={cart}
        setShowCart={setShowCart}
      />
      {showCart ? (
        <Cart cart={cart} setCart={setCart} onBack={() => setShowCart(false)} />
      ) : selectedProduct ? (
        <DetailedProduct
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          AddToCart={handleAddToCart}
        />
      ) : (
        <div className="products-page">
          {loading && <p className="loading-text">Loading...</p>}
          {products.length === 0 && !loading && <p className="no-results">No products found</p>}
          {products.length > 0 && (
            <ProductDisplay
              products={products}
              onProductClick={(prod) => setSelectedProduct(prod)}
            />
          )}
        </div>
      )}
    </>
  )
}