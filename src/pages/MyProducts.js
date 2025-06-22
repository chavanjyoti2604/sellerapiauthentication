// src/pages/MyProducts.js
import { useEffect, useState } from "react";
import axios from "axios";
import "./MyProducts.css";

export default function MyProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8070/seller/my-products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch products.");
      });
  }, []);

  return (
    <div className="product-list">
      <h2>My Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <strong>{product.name}</strong> - ₹{product.price}
              <br />
              <small>{product.description}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
