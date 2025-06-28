import React, { useState, useEffect } from 'react';
import SearchField from './SearchField';

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [people, setPeople] = useState("");

const handleSubmit = () => {
  console.log("Search clicked", { location, checkIn, checkOut, guests: people });
  onSearch({
    location,
    checkIn,
    checkOut,
    guests: people
  });
};

  
    useEffect(() => {
    if (location.trim() === "") {
      onSearch({});
    }
  }, [location]);

  return (
    <div className="flex items-stretch bg-gray-100 border border-gray-300 rounded-3xl shadow relative top-[40px] overflow-hidden">
      <SearchField
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Search destinations"
        className="p-2"
      />
      <SearchField
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        className="p-2"
      />
      <SearchField
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        className="p-2"
      />
      <SearchField
        type="number"
        value={people}
        onChange={(e) => setPeople(e.target.value)}
        className="p-2"
        placeholder="Guests"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 ml-1 w-full text-white px-4 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

