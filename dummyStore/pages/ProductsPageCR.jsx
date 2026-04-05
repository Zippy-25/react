import ProductDisplay from "./ProductDisplay"
import {useState, useEffect} from "react"

export default function ProductsPage({setIsLoggedIn}){
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts(){
      const res = await fetch("https://dummyjson.com/products")
      const data = await res.json()
      console.log(data)

      setProducts(data.products)
    }
    fetchProducts()}, []
  )
  return(
    <div>
      <h1>Products Page</h1>
      <button onClick = {() => setIsLoggedIn(false)}>Log out</button>
      <ProductDisplay products={products}/>
    </div>
  )
}
