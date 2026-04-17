export default function ProductDisplay({ products, onProductClick }) {
  return (
    <div className="ProductDisplayGrid">
      {products.map((i) =>
        <div key={i.id} className="product" onClick={() => onProductClick(i)} style={{ cursor: "pointer" }}>
          <img src={i.thumbnail} alt={i.title} />
          <h3>{i.title}</h3>
          <p>₹ {i.price}</p>
        </div>
      )}
    </div>
  )
}
