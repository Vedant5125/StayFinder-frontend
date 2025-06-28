import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

const getActiveClass = (isActive, type) => {
  if (!isActive) return "";
  return "ring-2 ring-slate-500";
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/bookings/my`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setBookings(response.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <>
      <nav className="flex h-[120px] justify-between items-center bg-gray-100 px-6  shadow w-full fixed ">
        <div className="ml-4 -mt-[35px]">
          <img className="w-40 h-auto " src={logo} alt="logo" />
        </div>
        <NavLink
          className={({ isActive }) =>
            `border border-slate-400 mr-40 py-2 px-4 rounded-xl shadow bg-slate-600 text-slate-100 hover:text-slate-600 hover:bg-slate-100 transaction duration-700 ${getActiveClass(
              isActive,
              "home"
            )}`
          }
          to="/"
        >
          Home
        </NavLink>
      </nav>
      <div className="pt-[150px] px-6">
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white shadow rounded-lg p-4 hover:shadow-lg"
              >
                <img
                  src={booking.listingId.mainImage}
                  alt={booking.listingId.title}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h2 className="text-xl font-semibold">
                  {booking.listingId.title}
                </h2>
                <p>{booking.listingId.location}</p>
                <p className="text-sm text-gray-500">
                  {new Date(booking.checkIn).toLocaleDateString()} to{" "}
                  {new Date(booking.checkOut).toLocaleDateString()}
                </p>
                <p className="font-bold text-green-600 mt-2">
                  ₹{booking.totalPrice}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MyBookings;
