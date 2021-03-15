const Enumeration = require('../dtxenumeration');

const kabeTypeEnum = Enumeration.newEnum(
  ['ktKabe', 1],
  ['ktTareKabe'],
  ['ktKoshiKabe'],
  ['ktSodeKabe']
);

const kabeAtsuTaipuEnum = Enumeration.newEnum(
  ['kaIppanGaiheki'],
  ['kaShinFuriwake'],
  ['kaHenShin']
);

const koshikabeKeijouTaipuEnum = Enumeration.newEnum(
  ['kkKabeTaipu'],
  ['kkOpun']
);

const tarekabeKeijouTaipuEnum  = Enumeration.newEnum(
  ['tkFuratto'],
  ['tkAchi'],
  ['tkKonaR']
);

const wallLocationEnum = Enumeration.newEnum(
  ['wlInside'],
  ['wlExternal'],
  ['wlOutside'],
);


module.exports = {
  kabeTypeEnum,
  kabeAtsuTaipuEnum,
  koshikabeKeijouTaipuEnum,
  tarekabeKeijouTaipuEnum,
  wallLocationEnum
}