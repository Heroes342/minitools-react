import React from "react";
import CalculatorLogic from "./CalculatorLogic";
import { Link } from "react-router-dom";

function CalculatorApp() {
  return (
    <div className="calculator-box app-box">
      <Link className="no-underline" to="/calculator">
        <h1>Calculator</h1>
      </Link>
      <CalculatorLogic />
    </div>
  );
}

export default CalculatorApp;
