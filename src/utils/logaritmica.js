export default function logaritmica(xValues, yValues) {
  const lnX = xValues.map((x) => Math.log(x));
  const lnX2 = lnX.map((lx) => lx * lx);
  const lnXY = lnX.map((lx, i) => lx * yValues[i]);

  return {
    lnX,
    lnX2,
    lnXY,
  };
}
