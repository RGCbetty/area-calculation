const Enumeration = require('../dtxenumeration');

const roofDivisionEnum = Enumeration.newEnum(
  ['rfGeneralRoof'], 
  ['rfPorchRoof']
);

const differentSlopeFlagEnum = Enumeration.newEnum(
  ['sfNo'], 
  ['sfYes']
);

const eaveDesignEnum = Enumeration.newEnum(
  ['edVerticalToGround'], 
  ['edVerticalToSlope'] 
);

module.exports = {
  roofDivisionEnum,
  differentSlopeFlagEnum,
  eaveDesignEnum
}