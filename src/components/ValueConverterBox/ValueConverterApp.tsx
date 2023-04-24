import React from "react";
import { ValueConverterLogic } from "./ValueConverterLogic";
import { Link } from "react-router-dom";

export const ValueConverterApp = () => {
  return (
    <div className="value-box app-box">
      <Link className="no-underline" to="/valueconverter">
        <h1>Value Converter</h1>
      </Link>
      <ValueConverterLogic />
    </div>
  );
};

export default ValueConverterApp;
