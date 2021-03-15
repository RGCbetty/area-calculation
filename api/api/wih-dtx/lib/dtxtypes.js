const Enumeration = require('./dtxenumeration')

const noteAlignEnum = Enumeration.newEnum(
  ['naHorizontal'],
  ['naVertical']
);

const usePlaceEnum = Enumeration.newEnum(
  ['upKisoFuku', -3],
  ['upSanHasuKyuuseki'],
  ['upKiso'],
  ['upMadoriShikichi'],
  ['upYane', 2],
  ['upYaneSeisei'],
  ['upMenseki'],
  ['upJidouYaneTanten', 99]
);

const reformEnum = Enumeration.newEnum(
  ['rfExisting'],
  ['rfRenovation'],
  ['rfExpansion']
);

const uaTypeEnum = Enumeration.newEnum(
  ['uaBeyondConsideration', -1],
  ['uaAutomaticJudgment'],
  ['uaMainRoom'],
  ['uaOtherRoom'],
  ['uaNonRoom']
);

const eaveTypeEnum = Enumeration.newEnum(
  ['etKeraba'],
  ['etLower'],
  ['etUpper']
);

module.exports = {
  noteAlignEnum,
  usePlaceEnum,
  reformEnum,
  uaTypeEnum,
  eaveTypeEnum
}


  