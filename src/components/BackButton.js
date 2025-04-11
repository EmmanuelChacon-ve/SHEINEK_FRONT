// src/components/BackButton.js

import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className="add-date-btn">
      🔙 Volver
    </button>
  );
};

export default BackButton;
