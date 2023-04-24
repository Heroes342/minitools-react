import React, { useState, useEffect } from "react";

const conversionFactors = {
  Meters: 1,
  Kilometers: 0.001,
  Centimeters: 100,
  Millimeters: 1000,
  Micrometers: 1000000,
  Nanometers: 1000000000,
  Miles: 0.000621371,
  Yards: 1.09361,
  Feet: 3.28084,
  Inches: 39.3701,
};

const UnitsConverterLogic = () => {
  type Unit = keyof typeof conversionFactors;

  const [fromUnit, setFromUnit] = useState<Unit>("Meters");
  const [toUnit, setToUnit] = useState<Unit>("Miles");
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(0);
  const [lastChanged, setLastChanged] = useState<"amount1" | "amount2">(
    "amount1"
  );
  const [showMessage, setShowMessage] = useState(false);

  const handleConvert = () => {
    if (fromUnit !== toUnit) {
      const rate = conversionFactors[toUnit] / conversionFactors[fromUnit];
      if (lastChanged === "amount1") {
        setAmount2(Number((amount1 * rate).toFixed(10)));
      } else {
        setAmount1(Number((amount2 / rate).toFixed(10)));
      }
    } else {
      setAmount2(amount1);
    }
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  return (
    <div className="converter">
      <div className="converter-container">
        <div className="first-curr">
          <input
            type="number"
            value={amount1}
            onChange={(e) => {
              setAmount1(Number(e.target.value));
              setLastChanged("amount1");
            }}
          />
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value as Unit)}
          >
            {Object.keys(conversionFactors).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
        <p className="equals">Equals...</p>
        <div className="second-curr">
          <input
            type="number"
            value={amount2}
            onChange={(e) => {
              setAmount2(Number(e.target.value));
              setLastChanged("amount2");
            }}
          />
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value as Unit)}
          >
            {Object.keys(conversionFactors).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
        <div className="convert-button">
          <button onClick={handleConvert}>Convert</button>
          {showMessage && <div className="add-bubble">Converted...</div>}
        </div>
      </div>
    </div>
  );
};

export default UnitsConverterLogic;
