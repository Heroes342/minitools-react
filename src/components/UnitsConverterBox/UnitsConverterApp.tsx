import React from "react";
import UnitsConverterLogic from "./UnitsConverterLogic";
import { Link } from "react-router-dom";

const UnitsConverterApp = () => {
  return (
    <div className="units-box app-box">
      <Link className="no-underline" to="/unitsconverter">
        <h1>Units Converter</h1>
      </Link>
      <UnitsConverterLogic />
    </div>
  );
};

export default UnitsConverterApp;
