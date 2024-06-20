import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Graph = ({ xValues, yValues, functionType, result }) => {
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Função para desenhar o gráfico
    const drawChart = () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const datasets = [];
      const data = [];

      // Adicionar pontos de dados
      xValues.forEach((x, i) => {
        data.push({ x, y: yValues[i] });
      });

      datasets.push({
        label: "Pontos",
        data: data,
        backgroundColor: "red",
        pointRadius: 5,
        pointHoverRadius: 7,
        borderColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1,
        tension: 0.1,
        fill: false,
      });

      // Adicionar linha de regressão se houver resultado
      if (result && functionType) {
        let regressionData = [];

        if (functionType === "Logarítmica") {
          const matches = result.match(/-?\d+\.\d+/g);
          if (matches && matches.length >= 2) {
            const a = parseFloat(matches[1]);
            const b = parseFloat(matches[0]);
            for (let i = -10; i <= 10; i += 0.1) {
              if (i > 0) {
                const x = i;
                const y = a * Math.log(x) + b;
                regressionData.push({ x, y });
              }
            }
          }
        } else if (functionType === "Exponencial") {
          const matches = result.match(/-?\d+\.\d+/g);
          if (matches && matches.length >= 2) {
            const a = parseFloat(matches[0]);
            const b = parseFloat(matches[1]);
            for (let i = -10; i <= 10; i += 0.1) {
              const x = i;
              const y = a * Math.exp(b * x);
              regressionData.push({ x, y });
            }
          }
        }

        datasets.push({
          label: "Curva de Regressão",
          data: regressionData,
          borderColor: "green",
          borderWidth: 2,
          tension: 0.1,
          fill: false,
        });
      }

      // Configurações do gráfico
      const config = {
        type: "scatter", // Tipo de gráfico
        data: {
          datasets: datasets,
        },
        options: {
          scales: {
            x: {
              type: "linear",
              position: "bottom",
            },
            y: {
              type: "linear",
            },
          },
        },
      };

      // Criar novo gráfico
      chartInstance.current = new Chart(ctx, config);
    };

    // Redimensionar o canvas inicialmente e ao redimensionar a janela
    const resizeCanvas = () => {
      //   canvas.width = canvas.parentElement.clientWidth - 500;
      //   canvas.height = canvas.parentElement.clientHeight;
      drawChart();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [xValues, yValues, functionType, result]);

  return <canvas ref={canvasRef} height="40vh" width="20vw" />;
};

export default Graph;
