import { useState } from "react";
import "./style.css";
import regression from "regression";

export default function Sidebar() {
  const [xValues, setXValues] = useState(["", "", "", ""]);
  const [yValues, setYValues] = useState(["", "", "", ""]);

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
    setXValues([...xValues, 0]);
    setYValues([...yValues, 0]);
  };

  const removeInput = () => {
    const newXValues = xValues.filter((_, i) => i !== xValues.length - 1);
    const newYValues = yValues.filter((_, i) => i !== yValues.length - 1);
    setXValues(newXValues);
    setYValues(newYValues);
  };

  function verificarFuncao(){
    var y = yValues[0];
    if(xValues.length > 2){
      for(let i=1; i<yValues.length; i++){
        if(yValues[i] > y){
            y = yValues[i];
        }else{
          return false;
        }
        return true;
      }
    }else{
      return false;
    }
    
  }

  function tipoFuncao(){
    if(verificarFuncao()){
      const totalY = yValues.reduce((total, valor) => total + valor, 0);
      const totalX = xValues.reduce((total, valor) => total + valor, 0);
      if (totalX > totalY) {
        console.log("Função Logarítmica");
        logaritmica();
      }else{
        console.log("Função Exponencial");
        exponencial();
      }
    }else{
      console.log("Função não compatível");
    }
  }

  // função logarítmica y = a * lnx + b
  // tabela: lnx y lnx*y (lnx)^2
  function logaritmica() {
    const lnX = xValues.map((x) => Math.log(x));
    const lnX2 = lnX.map((lx) => lx * lx);
    const lnXY = lnX.map((lx, i) => lx * yValues[i]);

    var pontos = [];
    for (let i = 0; i < xValues.length; i++) {
      pontos.push([xValues[i], yValues[i]]);
    }

    const result = regression.logarithmic(pontos, { precision: 4 });

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

      var pontos = [];
      for (let i = 0; i < xValues.length; i++) {
        pontos.push([xValues[i], yValues[i]]);
      }

      const result = regression.exponential(pontos, { precision: 4 });

      console.log("X:", xValues);
      console.log("lnY:", lnY);
      console.log("XlnY:", xlnY);
      console.log("X2:", x2);
      console.log("Resultado:", result.string);
  }

  return (
    <div className="sidebar">
      <div className="input-table">
        <div className="input-column">
          <label>X</label>
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
          <label>Y</label>
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
        <button onClick={tipoFuncao}>Logarítmica</button>
        <button onClick={tipoFuncao}>Exponencial</button>
      </div>
    </div>
  );
}
