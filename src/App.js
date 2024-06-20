import "./App.css";
import Sidebar from "./components/Sidebar";
import Graph from "./components/Graph";
import { useState } from "react";

function App() {
  // const [xValues, setXValues] = useState(["", "", "", ""]);
  // const [yValues, setYValues] = useState(["", "", "", ""]);
  const [xValues, setXValues] = useState([1.3, 2, 4, 7]);
  const [yValues, setYValues] = useState([0.5, 1.2, 2, 3]);
  const [functionType, setFunctionType] = useState("");
  const [result, setResult] = useState("");

  return (
    <main className="main">
      <Sidebar
        xValues={xValues}
        setXValues={setXValues}
        yValues={yValues}
        setYValues={setYValues}
        functionType={functionType}
        setFunctionType={setFunctionType}
        result={result}
        setResult={setResult}
      />
      <Graph
        xValues={xValues}
        yValues={yValues}
        functionType={functionType}
        result={result}
      />
    </main>
  );
}

export default App;
