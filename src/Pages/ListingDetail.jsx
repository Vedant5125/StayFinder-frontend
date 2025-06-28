import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ListingDetail = () => {
  const { id } = useParams(); // Get listing ID from URL
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/stays/listing/${id}`
        );
        setListing(response.data);
      } catch (err) {
        console.error("Error fetching listing:", err);
      }
    };

    fetchListing();
  }, [id]);

  const navigate = useNavigate();

  if (!listing) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="relative max-w-5xl shadow-2xl mx-auto mt-16 px-4 py-8">
      <button
        onClick={() => navigate("/")}
        className="absolute -top-5 right-4 text-4xl text-gray-500 hover:text-red-600"
        aria-label="Close"
      >
        &times;
      </button>
      <div className="mb-4 flex gap-[40px]">
        <img
          src={listing.mainImage}
          alt={listing.title}
          className="w-1/2 h-96 object-cover rounded-xl shadow-md"
        />

        {listing.supportImages?.length > 0 && (
          <div className="mt-4 flex items-start justify-center flex-col gap-[20px]">
            {listing.supportImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Support ${index + 1}`}
                className="w-full h-[110px] object-cover rounded-lg shadow"
              />
            ))}
          </div>
        )}
      </div>
      <hr className="shadow w-full h-[2px] bg-slate-300 my-6" />
      <div className="flex items-center gap-96">
        <div>
          <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
          <p className="text-gray-600 text-lg mb-4">{listing.location}</p>
          <p className="text-xl font-semibold text-green-700 mb-4">
            ₹{listing.price}/night
          </p>
          <p className="text-gray-800 leading-relaxed">{listing.description}</p>
        </div>

        <button
          type="button"
          
          onClick={() => {

            console.log("Booking for ID:", listing._id);
            navigate(`/book/${listing._id}`)}
          }
          className="bg-blue-600 text-white px-6 py-2 rounded-xl h-12 hover:bg-blue-700 transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ListingDetail;
