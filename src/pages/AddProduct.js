// src/pages/AddProduct.js
import { useState } from "react";
import axios from "axios";
import "./AddProduct.css";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    shopId: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:8070/seller/products", product, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Product added successfully!");
      setProduct({ name: "", description: "", price: "", shopId: "" });
    } catch (err) {
      console.error(err);
      setMessage("Failed to add product.");
    }
  };

  return (
    <div className="add-product-form">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="shopId"
          placeholder="Shop ID"
          value={product.shopId}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Product</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
