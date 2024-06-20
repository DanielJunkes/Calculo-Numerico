import { useEffect, useRef } from "react";

export default function Graph({ xValues, yValues, functionType, result }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const step = 50;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth - 500;
      canvas.height = canvas.parentElement.clientHeight;

      // Draw grid
      ctx.beginPath();
      for (let i = step; i < canvas.width; i += step) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
      }
      ctx.strokeStyle = "#ddd";
      ctx.stroke();

      // Draw axes
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.strokeStyle = "#333";
      ctx.stroke();

      // Draw points
      ctx.fillStyle = "red";
      xValues.forEach((x, i) => {
        const plotX = (x + 10) * (canvas.width / 20);
        const plotY = canvas.height - (yValues[i] + 10) * (canvas.height / 20);

        ctx.beginPath();
        ctx.arc(plotX, plotY, 5, 0, 2 * Math.PI);
        ctx.fill();
      });

      // Draw the regression curve
      if (result) {
        ctx.beginPath();
        ctx.strokeStyle = "green";

        if (functionType === "Logarítmica") {
          const matches = result.match(/-?\d+\.\d+/g);
          if (matches.length >= 2) {
            const a = parseFloat(matches[1]);
            const b = parseFloat(matches[0]);
            for (let i = 0; i < canvas.width; i++) {
              const x = i / (canvas.width / 20) - 10;
              if (x > 0) {
                const y = a * Math.log(x) + b;
                const plotX = (x + 10) * (canvas.width / 20);
                const plotY = canvas.height - (y + 10) * (canvas.height / 20);
                if (i === 0) ctx.moveTo(plotX, plotY);
                else ctx.lineTo(plotX, plotY);
              }
            }
          }
        }

        if (functionType === "Exponencial") {
          const matches = result.match(/-?\d+\.\d+/g);
          if (matches && matches.length >= 2) {
            const a = parseFloat(matches[0]); // coeficiente 'a'
            const b = parseFloat(matches[1]); // coeficiente 'b'

            for (let i = 0; i < canvas.width; i++) {
              const x = i / (canvas.width / 20) - 10;
              const y = a * Math.exp(b * x);
              const plotX = (x + 10) * (canvas.width / 20);
              const plotY = canvas.height - (y + 10) * (canvas.height / 20);
              if (i === 0) ctx.moveTo(plotX, plotY);
              else ctx.lineTo(plotX, plotY);
            }
          }
        }

        ctx.stroke();
      }
    };

    // Resize canvas initially and on window resize
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, [xValues, yValues, functionType, result]);

  return <canvas ref={canvasRef}></canvas>;
}
