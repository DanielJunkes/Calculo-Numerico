export default function exponencial(xValues, yValues) {
  const lnY = yValues.map((y) => Math.log(y));
  const xlnY = xValues.map((x, i) => x * lnY[i]);
  const x2 = xValues.map((x) => x * x);

  return {
    lnY,
    xlnY,
    x2,
  };
}
