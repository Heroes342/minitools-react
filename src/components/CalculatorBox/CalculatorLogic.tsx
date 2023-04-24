import { useContext, useEffect, useState } from "react";

export function CalculatorLogic() {
  const [inputNum, setInputNum] = useState<number>(0);
  const [monitor, setMonitor] = useState<number>(0);
  const [decimal, setDecimal] = useState<boolean>(false);
  const [decimalcount, setDecimalCount] = useState<number>(1);
  const [operator, setOperator] = useState<string>("");
  const [calculatednum, setCalculatednum] = useState<number>(0);

  useEffect(() => {
    setMonitor(inputNum);
  }, [inputNum]);

  useEffect(() => {
    setMonitor(calculatednum);
  }, [calculatednum]);

  const inputNumTotal = (num: number) => {
    if (decimal) {
      num = num / Math.pow(10, decimalcount);
      setDecimalCount(decimalcount + 1);
      setInputNum(parseFloat((inputNum + num).toFixed(decimalcount)));
    } else {
      setInputNum(inputNum * 10 + num);
    }
  };

  const inputOperator = (operator: string) => {
    setOperator(operator);
    calculate();
    setInputNum(0);
  };

  const calculate = () => {
    setDecimal(false);
    setDecimalCount(1);
    if (operator === "/" && inputNum === 0) {
      setCalculatednum(NaN);
      setInputNum(0);
      return;
    }
    if (calculatednum === 0 && inputNum === 0) {
      return;
    }
    switch (operator) {
      case "+":
        setCalculatednum(calculatednum + inputNum);
        break;
      case "/":
        setCalculatednum(calculatednum / inputNum);
        break;
      case "*":
        setCalculatednum(calculatednum * inputNum);
        break;
      case "-":
        setCalculatednum(calculatednum - inputNum);
        break;
    }
    if (operator === "") setCalculatednum(inputNum);
    else setInputNum(0);
    return;
  };

  const equal = () => {
    calculate();
    setOperator("");
  };
  const clearall = () => {
    setInputNum(0);
    setCalculatednum(0);
    setMonitor(0);
    setOperator("");
  };

  return (
    <>
      <div className="calculator">
        <section className="monitor">
          <p>{monitor}</p>
        </section>
        <section className="calcbtnContainer">
          <button onClick={clearall} className="btngrey">
            AC
          </button>
          <button className="btngrey"></button>
          <button className="btngrey"></button>
          <button onClick={() => inputOperator("/")} className="btngrey">
            /
          </button>
          <button onClick={() => inputNumTotal(7)} className="btndavygrey">
            7
          </button>
          <button onClick={() => inputNumTotal(8)} className="btndavygrey">
            8
          </button>
          <button onClick={() => inputNumTotal(9)} className="btndavygrey">
            9
          </button>
          <button onClick={() => inputOperator("*")} className="btngrey">
            *
          </button>
          <button onClick={() => inputNumTotal(4)} className="btndavygrey">
            4
          </button>
          <button onClick={() => inputNumTotal(5)} className="btndavygrey">
            5
          </button>
          <button onClick={() => inputNumTotal(6)} className="btndavygrey">
            6
          </button>
          <button onClick={() => inputOperator("-")} className="btngrey">
            -
          </button>
          <button onClick={() => inputNumTotal(1)} className="btndavygrey">
            1
          </button>
          <button onClick={() => inputNumTotal(2)} className="btndavygrey">
            2
          </button>
          <button onClick={() => inputNumTotal(3)} className="btndavygrey">
            3
          </button>
          <button onClick={() => inputOperator("+")} className="btngrey">
            +
          </button>
          <button
            onClick={() => inputNumTotal(0)}
            className="btndavygrey btnzero"
          >
            0
          </button>
          <button
            onClick={() => setDecimal(true)}
            className="btndavygrey btndot"
          >
            .
          </button>
          <button onClick={equal} className="btntotal">
            =
          </button>
        </section>
      </div>
    </>
  );
}

export default CalculatorLogic;
