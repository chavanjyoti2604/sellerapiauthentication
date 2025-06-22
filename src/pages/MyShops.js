// src/pages/MyShops.js
import { useEffect, useState } from "react";
import axios from "axios";
import "./MyShops.css";

export default function MyShops() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get("http://localhost:8070/seller/my-shops", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setShops(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load shops.");
      }
    };

    fetchShops();
  }, []);

  return (
    <div className="shop-list">
      <h2>My Shops</h2>
      {shops.length === 0 ? (
        <p>No shops found.</p>
      ) : (
        <ul>
          {shops.map((shop) => (
            <li key={shop.id}>
              <strong>{shop.name}</strong> - {shop.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
