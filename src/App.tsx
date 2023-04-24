import React, { ChangeEvent } from "react";
import "./style/customStyle.css";
import TodoApp from "./components/TasksBox/TodoApp";
import WeatherApp from "./components/WeatherBox/WeatherApp";
import CalculatorApp from "./components/CalculatorBox/CalculatorApp";
import CronometerApp from "./components/CronometerBox/CronometerApp";
import Credits from "./components/credits";
import ValueConverterApp from "./components/ValueConverterBox/ValueConverterApp";
import UnitsConverterApp from "./components/UnitsConverterBox/UnitsConverterApp";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useNavigate,
  Link,
} from "react-router-dom";

function MiniTools() {
  const navigate = useNavigate();
  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    navigate(event.target.value);
  };
  return (
    <>
      <div className="main-box">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link className="no-underline" to="/">
            <h1>
              MiniTools
              <span className="click-info">
                (click here to display all the tools)
              </span>
            </h1>
          </Link>
        </div>
        <div className="app-container">
          <Outlet />
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MiniTools />}>
          <Route
            index
            element={
              <React.Fragment>
                <TodoApp />
                <WeatherApp />
                <CalculatorApp />
                <CronometerApp />
                <ValueConverterApp />
                <UnitsConverterApp />
              </React.Fragment>
            }
          />
          <Route path="/todo" element={<TodoApp />} />
          <Route path="/weather" element={<WeatherApp />} />
          <Route path="/calculator" element={<CalculatorApp />} />
          <Route path="/cronometer" element={<CronometerApp />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/valueconverter" element={<ValueConverterApp />} />
          <Route path="/unitsconverter" element={<UnitsConverterApp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
