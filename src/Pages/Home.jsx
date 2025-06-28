import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [stays, setStays] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/listings`)
      .then((res) => setStays(res.data))
      .catch((err) => console.error("Error fetching listings:", err));
  }, []);

const handleSearch = async (filters) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/listings`, {
      params: filters,
    });
    setStays(response.data);
  } catch (err) {
    console.error("Error during search:", err);
  }
};


  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="pt-[200px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stays.map((stay) => (
            <div
              key={stay._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition transform hover:scale-105"
              onClick={() => navigate(`/listings/${stay._id}`)}
            >
              <img
                src={stay.mainImage}
                alt={stay.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{stay.title}</h2>
                <p className="text-gray-500">{stay.location}</p>
                <p className="text-green-600 font-bold mt-2">
                  ₹{stay.price} / night
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
