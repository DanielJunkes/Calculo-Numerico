import './App.css';

// funcao logaritimica y = a * lnx + b
// tabela: lnx y lnx*y (lnx)^2
function logartimica() {
  var x = parseInt(document.getElementById("X").value);
  var y = parseInt(document.getElementById("Y").value);
  console.log(x+y);
}

// funcao exponencial y = b * e^ax
// tabela: x lny x*lny x^2
function exponencial() {
  var x = parseInt(document.getElementById("X").value);
  var y = parseInt(document.getElementById("Y").value);
  var x2 = parseInt(document.getElementById("X2").value);
  var y2 = parseInt(document.getElementById("Y2").value);

  let totalX = x + x2;
  let totalLNY = Math.log(y) + Math.log(y2);
  let totalXLNY = x*Math.log(y) + x2*Math.log(y2);
  let totalX2 = x*x + x2*x2;
  
  console.log(totalX, totalLNY, totalXLNY, totalX2);
  
}

function App() {
  return (
    <div className="App">
      <label for="X">X</label>
      <input type="number" id="X" name="X"/>
      <label for="Y">Y</label>
      <input type="number" id="Y" name="Y"/>
      <label for="X">X</label>
      <input type="number" id="X2" name="X"/>
      <label for="Y">Y</label>
      <input type="number" id="Y2" name="Y"/>
      <button onClick={logartimica}>Logaritimica</button>
      <button onClick={exponencial}>Exponencial</button>
    </div>
  );
}

export default App;
