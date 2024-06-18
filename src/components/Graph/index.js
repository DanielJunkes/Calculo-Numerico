import { useEffect, useRef } from "react";

export default function Graph() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const step = 50;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth - 250;
      canvas.height = canvas.parentElement.clientHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
    };

    // Resize canvas initially and on window resize
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return <canvas ref={canvasRef}></canvas>;
}
