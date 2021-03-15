const degToRad = (degrees) => {
  return degrees * Math.PI / 180;
};
 
const radToDeg = (radians) => {
  return radians * 180 / Math.PI;
};

const round = (value, decimals=3) => {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
};

module.exports = {
  radToDeg,
  degToRad,
  round,
};