import React from "react";

const SearchField = ({ label, type, placeholder, id, value, onChange  }) => {
  const hoverCss = () => "hover:cursor-pointer rounded-3xl";

  return (
    <label
      htmlFor={id}
      className={`group relative flex flex-col justify-end px-6 py-4 w-full ease-in-out origin-center hover:scale-110 hover:bg-slate-300  focus-within:bg-slate-100 focus-within:scale-110 duration-700 ${hoverCss()}`}
    >
      <span
        className={`absolute top-1 left-5 bg-gray-100 px-1 text-xs ease-in-out origin-center text-black font-semibold 
          group-hover:bg-slate-300 group-focus-within:bg-slate-100 duration-700`}
      >
        {label}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`bg-gray-100 w-full text-sm outline-none ease-in-out origin-center duration-700 hover:cursor-pointer ${hoverCss()} hover:rounded-none group-hover:bg-slate-300 group-focus-within:bg-slate-100 focus:rounded-none`}
      />
    </label>
  );
};

export default SearchField;