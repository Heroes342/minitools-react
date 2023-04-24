import React from "react";
import { CronometerLogic } from "./CronometerLogic";
import { Link } from "react-router-dom";

export const CronometerApp = () => {
  return (
    <div className="cronometer-box app-box">
      <Link className="no-underline" to="/cronometer">
        <h1>Cronometers</h1>
      </Link>
      <div className="cronometers-container">
        <CronometerLogic />
        <CronometerLogic />
        <CronometerLogic />
      </div>
    </div>
  );
};

export default CronometerApp;
