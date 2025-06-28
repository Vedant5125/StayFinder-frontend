import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { useLocation } from "react-router-dom";

const Host = () => {
  const [stays, setStays] = useState([]);
  const navigate = useNavigate();

  const fetchStays = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/stays/my-stays`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStays(res.data);
    } catch (err) {
      console.error("Failed to fetch stays:", err);
    }
  }
  useEffect(() => {
    fetchStays();
  }, []);

  
const location = useLocation();

useEffect(() => {
  fetchStays();
}, [location.pathname]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/stays/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setStays((prev) => prev.filter((stay) => stay._id !== id));
    } catch (err) {
      console.error("Failed to delete stay", err);
      alert("Error deleting stay");
    }
  };

  return (
    <>
    <div className="fixed top-0">
    <Navbar/>
    </div>
    <div className="max-w-7xl mx-auto p-6 mt-60 bg-white shadow-md rounded-xl">
      {/* List of stays */}
      {stays.length > 0 ? (
        <div className="space-y-4">
          {stays.map((stay) => (
            <div
              key={stay._id}
              className="border p-4 rounded shadow flex justify-between items-start"
            >
              <div className="flex gap-8">
                <div>
                  <img
                    className="h-20 w-20 object-cover rounded"
                    src={stay.mainImage}
                    alt={stay.title || "Stay image"}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{stay.title}</h3>
                  <p>{stay.description}</p>
                  <p className="text-sm text-gray-500">
                    📍 {stay.location} | 💰 ₹{stay.price} | 👥 {stay.capacity} guests
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(stay._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No stays added yet.</p>
      )}
    </div>
    </>
  );
};

export default Host;
