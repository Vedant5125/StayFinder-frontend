import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogReg = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="relative max-w-md mx-auto mt-20 p-12 rounded-3xl shadow-xl bg-white border">
      <button
        onClick={() => navigate("/")}
        className="absolute top-1 right-4 text-4xl text-gray-500 hover:text-red-600"
        aria-label="Close"
      >
        &times;
      </button>
      <div className="flex justify-between mb-6">
        <button
          className={`w-1/2 py-2 rounded-l-2xl font-semibold transition-all duration-300 ${
            isLogin ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`w-1/2 py-2 rounded-r-2xl font-semibold transition-all duration-300 ${
            !isLogin ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>

      {isLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

//Login Form
const LoginForm = () => {
  const floatLabel = () => {
    return "text-sm font-semibold relative top-2 left-4 p-2 bg-white";
  };
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: "onSubmit" });

  const onSubmit = async (data) => {
    try {
      const result = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login`, {
        email: data.email.toLowerCase(),
        password: data.password,
        role: data.isHostLogin ? "host" : "user"
      });

      console.log("Login success:", result.data);
      const user = result.data.user;
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));

      if (result.data.user.role === "host") {
        navigate("/Host");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err.result?.data || err.message);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="relative">
        <label className={`${floatLabel()}`}>Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          {...register("email", {
            required: "Email is required",
            minLength: { value: 6, message: "Min 6 characters" },
            maxLength: { value: 50, message: "Max 50 characters" }
          })}
          className="w-full p-4 border rounded-lg"
        />
        {errors.Email && (
          <p className="text-red-600 text-sm">{errors.Email.message}</p>
        )}
      </div>

      <div>
        <label className={`${floatLabel()}`}>Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Min 6 characters" }
          })}
          className="w-full p-4 border rounded-lg"
        />
        {errors.Password && (
          <p className="text-red-600 text-sm">{errors.Password.message}</p>
        )}
      </div>

      <div>
        <label className="p-2">
          <input
            type="checkbox"
            {...register("isHostLogin")}
            className="scale-125 mr-3"
          />
          Login as Host
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
      >
        Login
      </button>
    </form>
  );
};

//Register Form
const RegisterForm = () => {
  const floatLabel = () => {
    return "text-sm font-semibold relative top-2 left-4 p-2 bg-white";
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({ mode: "onSubmit" });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/register`, {
        name: data.name,
        email: data.email.toLowerCase(),
        password: data.password,
        role: data.isHost ? "host" : "user"
      });

      if (result.data.error) {
        alert("Registration failed: " + result.data.error);
        return;
      }

      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));
      alert("Registration Successful");

      if (result.data.user.role === "host") {
        navigate("/Host");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(
        "Registration error:",
        err.response?.data?.error || err.message
      );
      alert(
        "Registration failed: " + (err.response?.data?.error || "Server error")
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className={`${floatLabel()}`}>Name</label>
        <input
          placeholder="Enter Name"
          type="text"
          {...register("name", { required: "Name is required" })}
          className="w-full p-4 border rounded-lg"
        />
        {errors.name && (
          <p className="text-red-600 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className={`${floatLabel()}`}>Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          {...register("email", {
            required: "Email is required",
            minLength: { value: 6, message: "Min 6 characters" },
            maxLength: { value: 50, message: "Max 50 characters" }
          })}
          className="w-full p-4 border rounded-lg"
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label className={`${floatLabel()}`}>Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Min 6 characters" }
          })}
          className="w-full p-4 border rounded-lg"
        />
        {errors.Password && (
          <p className="text-red-600 text-sm">{errors.Password.message}</p>
        )}
      </div>

      <div>
        <label className={`${floatLabel()} p-2`}>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match"
          })}
          className="w-full p-4 border rounded-lg"
        />
        {errors.confirmPassword && (
          <p className="text-red-600 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div>
        <label className="p-2">
          <input
            type="checkbox"
            {...register("isHost")}
            className="scale-125 mr-3"
          />
          I want to become a host
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
      >
        Register
      </button>
    </form>
  );
};

export default LogReg;
