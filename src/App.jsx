import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import LogReg from "./Pages/LogReg";
import Host from "./Pages/Host";
import Hostform from "./Pages/Hostform";
import ListingDetail from "./Pages/ListingDetail";
import BookingPage from "./Pages/BookingPage";
import MyBookings from "./Pages/MyBookings";
import Navbar from "./Components/Navbar";
import RedirectHandler from "./Components/redirectHandler";

function App() {
  return (
    <>
      <Router>
        <RedirectHandler />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/LogReg" element={<LogReg />} />
          <Route path="/Host" element={<Host />} />
          <Route path="/Hostform" element={<Hostform />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/book/:id" element={<BookingPage />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
