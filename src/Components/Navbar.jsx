import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { useEffect } from "react";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = ({ onSearch }) => {
  const getActiveClass = (isActive, type) => {
    if (!isActive) return "";

    switch (type) {
      case "home":
        return "ring-2 ring-slate-500";
      case "host":
        return "ring-2 ring-emerald-600";
      case "login":
        return "ring-2 ring-blue-600";
    }
  };

  const [users, setUsers] = useState(null);

  useEffect(() => {
    try {
      const localuser = localStorage.getItem("user");
      if (localuser) {
        setUsers(JSON.parse(localuser));
      }
    } catch (error) {
      console.error("Invalid user data in localStorage:", error);
      localStorage.removeItem("user"); 
      setUsers(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
    setUsers(null);
  };

  const navigate = useNavigate();

  return (
    <nav className="flex h-[180px] justify-between items-center bg-gray-100 px-6  shadow w-full fixed ">
      <div className="ml-4 -mt-[35px]">
        <img className="w-40 h-auto " src={logo} alt="" />
      </div>
      {users?.role === "host" ? (
        <h2 className="text-2xl font-bold text-center mb-6">Host Dashboard</h2>
      ) : 
       typeof onSearch === "function" ? (
  <SearchBar onSearch={onSearch} />
) : null}

      {/* )} */}
      <div className="flex gap-6 mr-4 -mt-[35px]">
        {users?.role === "host" ? (
          <button
            onClick={() => navigate("/Hostform")}
            className="mb-4 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
          >
            + Add Stay
          </button>
        ) : (
          <>
            <NavLink
              className={({ isActive }) =>
                `border border-slate-400 py-2 px-4 rounded-xl shadow bg-slate-600 text-slate-100 hover:text-slate-600 hover:bg-slate-100 transaction duration-700 ${getActiveClass(
                  isActive,
                  "home"
                )}`
              }
              to="/"
            >
              Home
            </NavLink>
          </>
        )}

        {users ? (
          <ProfileDropdown user={users} onLogout={handleLogout} />
        ) : (
          <NavLink
            className={({ isActive }) =>
              `border border-blue-400 py-2 px-3 rounded-xl shadow bg-blue-500 text-slate-200 hover:bg-slate-100 hover:text-blue-500 transaction duration-700 ${getActiveClass(
                isActive,
                "login"
              )}`
            }
            to="/LogReg"
          >
            Login | Register
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
