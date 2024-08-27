// src/components/NotFound.js

import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"; // Assuming you want to add some styling

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/">Go to Homepage</Link>
    </div>
  );
};

export default NotFound;
