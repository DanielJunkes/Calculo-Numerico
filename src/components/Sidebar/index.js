import { useState } from "react";
import "./style.css";
import regression from "regression";

const FunctionType = {
  0: "",
  1: "Logarítmica",
  2: "Exponencial",
  3: "Não compatível",
};

export default function Sidebar({
  xValues,
  setXValues,
  yValues,
  setYValues,
  functionType,
  setFunctionType,
  result,
  setResult,
}) {
  const [tableData, setTableData] = useState([]);

  const handleXChange = (index, value) => {
    const newValues = [...xValues];
    newValues[index] = parseFloat(value) || 0;
    setXValues(newValues);
  };

  const handleYChange = (index, value) => {
    const newYValues = [...yValues];
    newYValues[index] = parseFloat(value) || 0;
    setYValues(newYValues);
  };

  const addInput = () => {
    setXValues([...xValues, ""]);
    setYValues([...yValues, ""]);
  };

  const removeInput = () => {
    const newXValues = xValues.filter((_, i) => i !== xValues.length - 1);
    const newYValues = yValues.filter((_, i) => i !== yValues.length - 1);
    setXValues(newXValues);
    setYValues(newYValues);
  };

  function verificarFuncao() {
    let crescente = true;
    let decrescente = true;

    aa
    for (let i = 1; i < yValues.length; i++) {
      if (yValues[i] > yValues[i - 1]) {
        decrescente = false;
      } else if (yValues[i] < yValues[i - 1]) {
        crescente = false;
      }
    }
    
    return crescente || decrescente;
  }

  function tipoFuncao() {
    if (xValues.some(value => value === "") || yValues.some(value => value === "")) {
      console.log("Valores não foram inseridos");
      return;
    } 

    if (xValues.length < 3) return
    
    if (verificarFuncao()) {
      const totalY = yValues.reduce((total, valor) => total + valor, 0);
      const totalX = xValues.reduce((total, valor) => total + valor, 0);

      totalX > totalY ? logaritmica() : exponencial();
    } else {
      setFunctionType(FunctionType[3]);
      console.log("Função não compatível");
    }
  }

  // função logarítmica y = a * lnx + b
  // tabela: lnx y lnx*y (lnx)^2
  function logaritmica() {
    const lnX = xValues.map((x) => Math.log(x));
    const lnX2 = lnX.map((lx) => lx * lx);
    const lnXY = lnX.map((lx, i) => lx * yValues[i]);
    setFunctionType(FunctionType[1]);

    const sumLnX = lnX.reduce((total, value) => total + value, 0);
    const sumY = yValues.reduce((total, value) => total + value, 0);
    const sumLnXY = lnXY.reduce((total, value) => total + value, 0);
    const sumLnX2 = lnX2.reduce((total, value) => total + value, 0);

    var pontos = [];
    for (let i = 0; i < xValues.length; i++) {
      pontos.push([xValues[i], yValues[i]]);
    }

    setResult(regression.logarithmic(pontos, { precision: 4 }).string);

    const table = lnX.map((lx, i) => ({
      lnX: lx.toFixed(4),
      y: yValues[i],
      lnXY: lnXY[i].toFixed(4),
      lnX2: lnX2[i].toFixed(4),
    }));

    setTableData([
      ...table,
      {
        lnX: `Σ ${sumLnX.toFixed(4)}`,
        y: `Σ ${sumY.toFixed(4)}`,
        lnXY: `Σ ${sumLnXY.toFixed(4)}`,
        lnX2: `Σ ${sumLnX2.toFixed(4)}`,
      },
    ]);

    console.log("lnX:", lnX);
    console.log("lnX2:", lnX2);
    console.log("lnXY:", lnXY);
    console.log("Resultado:", result.string);
  }

  // função exponencial y = b * e^ax
  // tabela: x lny x*lny x^2
  function exponencial() {
    const lnY = yValues.map((y) => Math.log(y));
    const xlnY = xValues.map((x, i) => x * lnY[i]);
    const x2 = xValues.map((x) => x * x);
    setFunctionType(FunctionType[2]);

    const sumX = xValues.reduce((total, value) => total + value, 0);
    const sumLnY = lnY.reduce((total, value) => total + value, 0);
    const sumXlnY = xlnY.reduce((total, value) => total + value, 0);
    const sumX2 = x2.reduce((total, value) => total + value, 0);

    var pontos = [];
    for (let i = 0; i < xValues.length; i++) {
      pontos.push([xValues[i], yValues[i]]);
    }

    setResult(regression.exponential(pontos, { precision: 4 }).string);

    const table = xValues.map((x, i) => ({
      x: x.toFixed(4),
      lnY: lnY[i].toFixed(4),
      xlnY: xlnY[i].toFixed(4),
      x2: x2[i].toFixed(4),
    }));

    setTableData([
      ...table,
      {
        x: `Σ ${sumX.toFixed(4)}`,
        lnY: `Σ ${sumLnY.toFixed(4)}`,
        xlnY: `Σ ${sumXlnY.toFixed(4)}`,
        x2: `Σ ${sumX2.toFixed(4)}`,
      },
    ]);

    console.log("X:", xValues);
    console.log("lnY:", lnY);
    console.log("XlnY:", xlnY);
    console.log("X2:", x2);
    console.log("Resultado:", result);
  }

  return (
    <div className="sidebar">
      <h2 className="title">Ajuste de Curva</h2>

      <div className="input-table">
        <div className="input-column">
          <label>x</label>
          {xValues.map((value, index) => (
            <div key={index} className="input-row">
              <input
                key={index}
                type="number"
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
                type="number"
                value={value}
                onChange={(e) => handleYChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="add-remove-buttons">
        <button
          className="modify-table-button minus-button"
          onClick={removeInput}
        >
          -
        </button>

        <button className="modify-table-button plus-button" onClick={addInput}>
          +
        </button>
      </div>

      <div className="calc-buttons">
        <button onClick={tipoFuncao}>Calcular</button>
      </div>

      <div className="result">
        {result && (
          <>
            <h2>Resultado:</h2>
            <p>{functionType}</p>
            <p>{result}</p>
            {functionType === FunctionType[1] && (
              <table className="result-table">
                <thead>
                  <tr>
                    <th>ln x</th>
                    <th>y</th>
                    <th>ln x · y</th>
                    <th>(ln x)²</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.lnX}</td>
                      <td>{row.y}</td>
                      <td>{row.lnXY}</td>
                      <td>{row.lnX2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {functionType === FunctionType[2] && (
              <table className="result-table">
                <thead>
                  <tr>
                    <th>x</th>
                    <th>ln y</th>
                    <th>x · ln y</th>
                    <th>x²</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.x}</td>
                      <td>{row.lnY}</td>
                      <td>{row.xlnY}</td>
                      <td>{row.x2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
}
