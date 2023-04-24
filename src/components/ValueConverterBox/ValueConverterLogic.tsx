import React, { useState, useEffect } from "react";
import axios from "axios";
import { CurrencyData } from "./interfaces/ValueConverterInterfaces";
const apikey = "gTVCIVB5IxBu89uwDvHeLNWpSGVy4Q6HeI35bStO";

export const ValueConverterLogic = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(0);
  const [lastChanged, setLastChanged] = useState<"amount1" | "amount2">(
    "amount1"
  );
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    axios
      .get<CurrencyData>(
        `https://api.freecurrencyapi.com/v1/latest?apikey=${apikey}`
      )
      .then((res) => {
        const data = res.data;
        setCurrencies(Object.keys(data.data));
      });
  }, []);

  const handleConvert = () => {
    if (fromCurrency !== toCurrency) {
      axios
        .get<CurrencyData>(
          `https://api.freecurrencyapi.com/v1/latest?apikey=${apikey}&base_currency=${fromCurrency}`
        )
        .then((res) => {
          const data = res.data;
          const rate = data.data[toCurrency];
          if (lastChanged === "amount1") {
            setAmount2(Number((amount1 * rate).toFixed(3)));
          } else {
            setAmount1(Number((amount2 / rate).toFixed(3)));
          }
        });
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
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
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
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
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
export default ValueConverterLogic;
