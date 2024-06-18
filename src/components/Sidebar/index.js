import { useState } from "react";
import "./style.css";

export default function Sidebar() {
  const [xValues, setXValues] = useState([0, 0, 0]);
  const [yValues, setYValues] = useState([0, 0, 0]);
  const [selectedFunction, setSelectedFunction] = useState("logaritmica");

  const handleXChange = (index, value) => {
    const newValues = [...xValues];
    newValues[index] = parseFloat(value, 10) || 0;
    setXValues(newValues);
  };

  const handleYChange = (index, value) => {
    const newYValues = [...yValues];
    newYValues[index] = parseFloat(value, 10) || 0;
    setYValues(newYValues);
  };

  const addInput = () => {
    setXValues([...xValues, 0]);
    setYValues([...yValues, 0]);
  };

  const removeInput = () => {
    const newXValues = xValues.filter((_, i) => i !== xValues.length - 1);
    const newYValues = yValues.filter((_, i) => i !== yValues.length - 1);
    setXValues(newXValues);
    setYValues(newYValues);
  };

  // função logarítmica y = a * lnx + b
  // tabela: lnx y lnx*y (lnx)^2
  function logaritmica() {
    const lnX = xValues.map((x) => Math.log(x));
    const lnX2 = lnX.map((lx) => lx * lx);
    const lnXY = lnX.map((lx, i) => lx * yValues[i]);

    console.log("lnX:", lnX);
    console.log("lnX2:", lnX2);
    console.log("lnXY:", lnXY);
  }

  // função exponencial y = b * e^ax
  // tabela: x lny x*lny x^2
  function exponencial() {
    const lnY = yValues.map((y) => Math.log(y));
    const xlnY = xValues.map((x, i) => x * lnY[i]);
    const x2 = xValues.map((x) => x * x);

    console.log("lnY:", lnY);
    console.log("XlnY:", xlnY);
    console.log("X2:", x2);
  }

  const calcular = () => {
    if (selectedFunction === "logaritmica") {
      logaritmica();
    } else if (selectedFunction === "exponencial") {
      exponencial();
    }
  };

  return (
    <div className="sidebar">
      <h2 className="title">Ajuste de Curva</h2>

      <div className="table">
        <div className="input-column">
          <label>x</label>
          {xValues.map((value, index) => (
            <div key={index} className="input-row">
              <input
                key={index}
                type="text"
                value={value}
                onChange={(e) => handleXChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="input-column">
          <label>y</label>
          {yValues.map((value, index) => (
            <div key={index} className="input-row">
              <input
                key={index}
                type="text"
                value={value}
                onChange={(e) => handleYChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <footer className="sidebar-footer">
        <div className="add-remove-container">
          <button
            className="add-remove-button minus-button"
            onClick={removeInput}
          >
            -
          </button>

          <button className="add-remove-button plus-button" onClick={addInput}>
            +
          </button>
        </div>

        <div className="function-select">
          <label className="radio-label">
            <input
              type="radio"
              name="function"
              value="logaritmica"
              checked={selectedFunction === "logaritmica"}
              onChange={(e) => setSelectedFunction(e.target.value)}
            />
            <span className="radio-custom"></span>
            Logarítmica
          </label>

          <label className="radio-label">
            <input
              type="radio"
              name="function"
              value="exponencial"
              checked={selectedFunction === "exponencial"}
              onChange={(e) => setSelectedFunction(e.target.value)}
            />
            <span className="radio-custom"></span>
            Exponencial
          </label>
        </div>

        <div className="calc-buttons">
          <button onClick={calcular}>Calcular</button>
        </div>
      </footer>
    </div>
  );
}
