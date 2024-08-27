// src/components/Loader.js

import React from "react";
import "./Loader.css"; // Assuming you want to add some styling
import logo from "../Logo2.png";
const Loader = () => {
  return (
    <div className="loader">
      <img
        src={logo}
        alt="Logo"
        className="w-12 sm:w-16 md:w-18 lg:w-32 h-auto object-contain max-w-fit mr-5"
      />
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
