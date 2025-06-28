import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";

const ProfileDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 rounded-xl bg-slate-200 shadow-xl hover:bg-slate-300 text-gray-800 font-semibold flex items-center gap-3 cursor-pointer"
      >
        <CgProfile className="text-2xl" /> {user.name}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {user?.role === "host" ? (
            <button
              onClick={() => {
                navigate("/LogReg");
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Become a User
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/LogReg");
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Become a Host
            </button>
          )}
          {user?.role === "user" ? (
            <button
              onClick={() => navigate("/my-bookings")}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              My Bookings
            </button>
          ) : (
            <></>
          )}

          <button
            onClick={() => {
              onLogout();
              setIsOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
          >
            <span>
              Logout <IoLogOutOutline className="inline" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
