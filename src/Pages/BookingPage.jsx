import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookingPage = () => {
  const { id } = useParams(); // listingId
  const navigate = useNavigate();

  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to make a booking.");
      navigate("/LogReg");
      return;
    }

    if (
      !form.checkIn ||
      !form.checkOut ||
      new Date(form.checkOut) <= new Date(form.checkIn)
    ) {
      alert("Please enter valid check-in and check-out dates.");
      return;
    }

    const pricePerNight = 1000; 
    const days =
      (new Date(form.checkOut) - new Date(form.checkIn)) /
      (1000 * 60 * 60 * 24);
    const totalPrice = pricePerNight * days;

    console.log("Booking Request Payload:", {
      listingId: id,
      ...form,
      totalPrice,
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/bookings`,
        {
          listingId: id,
          ...form,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking successful!");
      navigate("/my-bookings");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-20 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Confirm Your Booking</h2>

      <label className="block mb-2">Check-In</label>
      <input
        type="date"
        name="checkIn"
        value={form.checkIn}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded mb-4"
      />

      <label className="block mb-2">Check-Out</label>
      <input
        type="date"
        name="checkOut"
        value={form.checkOut}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded mb-4"
      />

      <label className="block mb-2">Guests</label>
      <input
        type="number"
        name="guests"
        value={form.guests}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded mb-6"
      />

      <button
        onClick={handleBooking}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingPage;
