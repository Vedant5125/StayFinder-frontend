import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Hostform = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ mode: "onSubmit" });

  const [previewMain, setPreviewMain] = useState(null);
  const [previewSupport, setPreviewSupport] = useState([]);
  const navigate = useNavigate();
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onSubmit = async (data) => {
    try {
      const mainFile = data.mainImage[0];
      if (!mainFile) {
        alert("Main image is required");
        return;
      }

      const mainBase64 = await toBase64(mainFile);

      const supportBase64 = [];
      for (let file of data.supportImages || []) {
        const b64 = await toBase64(file);
        supportBase64.push(b64);
      }

      const token = localStorage.getItem("token");

      const stayData = {
        title: data.title,
        description: data.description,
        location: data.location,
        price: data.price,
        mainImage: mainBase64,
        supportImages: supportBase64
      };

    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/stays/stay`, stayData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/listings`, stayData, {
      headers: { Authorization: `Bearer ${token}` }
    });

      alert("Stay Added!");
      reset();
      setPreviewMain(null);
      setPreviewSupport([]);
      navigate("/Host");
    } catch (err) {
      console.error("Error submitting stay:", err);
      alert("Failed to add stay.");
    }
  };

  const handleMainImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewMain(URL.createObjectURL(file));
    }
  };

  const handleSupportImages = (e) => {
    const files = Array.from(e.target.files);
    const total = previewSupport.length + files.length;

    if (total > 3) {
      alert("You can only upload up to 3 support images.");
      e.target.value = "";
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewSupport((prev) => [...prev, ...newPreviews]);
  };

  const handleCancel = () => {
    reset();
    setPreviewMain(null);
    setPreviewSupport([]);
    navigate("/Host");
  };

  return (
    <div className=" relative max-w-3xl mx-auto p-6 mt-24 bg-white shadow-md rounded-xl">
      <button
        onClick={() => navigate("/")}
        className="absolute top-1 right-4 text-4xl text-gray-500 hover:text-red-600"
        aria-label="Close"
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold text-center mb-6">Host Dashboard</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 mb-6 p-6 bg-gray-100 rounded shadow-md"
      >
        <input
          {...register("title", { required: true })}
          placeholder="Stay Title"
          className="w-full p-2 border rounded"
        />
        <textarea
          {...register("description", { required: true })}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("location", { required: true })}
          placeholder="Location"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("price", { required: true })}
          type="number"
          placeholder="Price per night"
          className="w-full p-2 border rounded"
        />

        <div>
          <label className="block font-semibold">Main Image:</label>
          <input
            type="file"
            accept="image/*"
            {...register("mainImage", { required: true })}
            onChange={handleMainImage}
            className="block mt-1"
          />
          {previewMain && (
            <img
              src={previewMain}
              alt="Main Preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        <div>
          <label className="block font-semibold">Support Images (Max 3):</label>
          <input
            type="file"
            accept="image/*"
            multiple
            {...register("supportImages")}
            onChange={handleSupportImages}
            className="block mt-1"
          />
        </div>
        {previewSupport.length > 0 && (
          <div className="flex gap-4 mt-2">
            {previewSupport.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Support Preview ${index + 1}`}
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Hostform;
