import { useState } from "react";
import api from "../services/api"; // Reusable Axios wrapper
import "./AddShop.css";

export default function AddShop() {
  const [shop, setShop] = useState({ name: "", location: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Update shop state on input change
  const handleChange = (e) => {
    setShop({ ...shop, [e.target.name]: e.target.value });
  };

  // Submit shop data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await api.post("/shop/add", shop); // ✅ Uses api.js wrapper with token and baseURL
      setMessage("✅ Shop added successfully!");
      setShop({ name: "", location: "" }); // Reset form
    } catch (err) {
      console.error("Failed to add shop:", err);
      if (err.response?.status === 403) {
        setError("❌ Only approved sellers can add shops.");
      } else if (err.response?.status === 401) {
        setError("❌ Unauthorized. Please log in again.");
      } else if (err.response?.status === 404) {
        setError("❌ Endpoint not found. Check backend route.");
      } else {
        setError("❌ Failed to add shop. Please try again.");
      }
    }
  };

  return (
    <div className="add-shop-form">
      <h2>Add New Shop</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Shop Name"
          value={shop.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={shop.location}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Shop</button>
      </form>

      {/* Show status messages */}
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
