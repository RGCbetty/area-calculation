const Enumeration = require('../dtxenumeration')

const toritsukeKashoEnum = Enumeration.newEnum(
  ['tkNaibu'],
  ['tkGaibu'],
  ['tkGenkan']
);

const houkouTypeEnum = Enumeration.newEnum(
  ['htCenter'],
  ['htLeft'],
  ['htRight']
);

//csv
const latticeTypeEnum = Enumeration.newEnum(
  ['ltNone'],
  ['ltMen'],
  ['ltKurosu']
);

//csv
const kittchenTypeEnum = Enumeration.newEnum(
  ['ktNone', 1],
  ['ktK']
);  

const tateguTypeEnum = Enumeration.newEnum(
  ['ttMado'],
  ['ttDoa'],
  ['ttDemado']
);

const shattaEnum = Enumeration.newEnum(
  ['shNashi'],
  ['shBSH'],
  ['shBSE']
);

const glassTypeEnum = Enumeration.newEnum(
  ['gtNone'],
  ['gtKasumi'],
  ['gtToumei'],
);

const leftRightDirectionEnum = Enumeration.newEnum(
  ['idRight', -1],
  ['idLeft']
);

const ranmaJouhouEnum = Enumeration.newEnum(
  ['rjNashi'],
  ['rjZentsuu'],
  ['rjZentsuu_CH'],
  ['rjSodebuNashi'],
  ['rjSodebuNashi_CH'],
  ['rjHikichiga']
);

const menKoshiEnum = Enumeration.newEnum(
  ['mkNashi'],
  ['mkTate'],
  ['mkYoko'],
  ['mkKurosu'],
  ['mkKoushi'],
  ['mkMekakushi'],
  ['mkHoudateAri']
);

const keshouKoushiEnum = Enumeration.newEnum(
  ['kkNashi'],
  ['kkTate'],
  ['kkYoko'],
  ['kkKurosu'],
  ['kkKoushi']
);

const amadoTypeEnum = Enumeration.newEnum(
  ['atNashi'],
  ['atTobukuro'],
  ['atKataOre'],
  ['atRyouOre'],
  ['atShatta']
);

const tobukuruIchiEnum = Enumeration.newEnum(
  ['tiStart', 1],
  ['tiEnd']
);

const gaibuToritsukeEnum = Enumeration.newEnum(
  ['gtHyoujun', 1],
  ['gtHanSoto'],
  ['gtSoto'],
  ['gtNai'],
);

const shiyouBashoEnum = Enumeration.newEnum(
  ['sbMadori'],
  ['sbYane', 2]
);

const moruTypeEnum = Enumeration.newEnum(
  ['mtNashi'],
  ['mtZenshuu'],
  ['mtMadodai']
);

const haichiKijunEnum = Enumeration.newEnum(
  ['hkInput'],
  ['htCenterWidth'],
  ['htStartWidth'],
  ['htEndWidth']
);

const wakuKeijyouEnum = Enumeration.newEnum(
  ['wkNashi'],
  ['wkMadodai', 10],
  ['wk3Waku', 31],
  ['wk3Keshingu', 32],
  ['wk4Waku', 41],
  ['wk4Keshingu', 42]
);

const madohisashiJidouEnum = Enumeration.newEnum(
  ['mjNashi'],
  ['mjAri'],
  ['mjJidou']
);

const kakuchouTotteEnum = Enumeration.newEnum(
  ['ktSType'],
  ['ktAType']
);

const katagawaWashitsuTotteEnum = Enumeration.newEnum(
  ['kwYuza', -1],
  ['kwNashi'],
  ['kwMaru'],
  ['kwSeihouke'],
  ['kwChouhoukei']
);

const hyouriHenkouEnum = Enumeration.newEnum(
  ['hhUraomote', -1],
  ['hhHyouri', 1]
);

const kataHikidoInputEnum = Enumeration.newEnum(
  ['khiDoSaizum'],
  ['khiKaikouHaba']
);

const signMethodEnum = Enumeration.newEnum(
  ['smShudou'],
  ['Jidou']
);

const materialTypeEnum = Enumeration.newEnum(
  ['mtSonotaMokusei', -99],
  ['mtMokusei', -1],
  ['mtBunruiNashi'],
  ['mtArumi'],
  ['mtHagane'],
  ['mtSutenresu'],
  ['mtResin'],
  ['mtSonotaKinzokusei', 99]
);

const koumokuBangouEnum = Enumeration.newEnum(
  ['kbKeijou'],
  ['kbKaikouHaba_Taka'],
  ['kbUchinoriTaka'],
  ['kbTateguWaku'],
  ['kbGaibuToritsuke'],
  ['kbUchiShouji'],
  ['kbAmado'],
  ['kbMenkoushi'],
  ['kbKeshoukoushi'],
  ['kbMadoTesuri'],
  ['kbZaishitsu'],
  ['kbShiage'],
  ['kbWakuZaishitsu'],
  ['kbWakuShiage'],
  ['kbGarasu'],
  ['kbKanamono'],
  ['kbFuzokuhin'],
  ['kbBikou1'],
  ['kbBikou2'],
  ['kbBikou3']
);

const uaClassificationEnum = Enumeration.newEnum(
  ['uaJidou'], 
  ['uaMado'], 
  ['uaDoa']
);

module.exports = {
  houkouTypeEnum,
  leftRightDirectionEnum,
  ranmaJouhouEnum,
  menKoshiEnum,
  amadoTypeEnum,
  tobukuruIchiEnum,
  gaibuToritsukeEnum,
  shiyouBashoEnum,
  moruTypeEnum,
  haichiKijunEnum,
  wakuKeijyouEnum,
  keshouKoushiEnum,
  madohisashiJidouEnum,
  kakuchouTotteEnum,
  katagawaWashitsuTotteEnum,
  hyouriHenkouEnum,
  kataHikidoInputEnum,
  signMethodEnum,
  materialTypeEnum,
  koumokuBangouEnum,
  uaClassificationEnum,
  tateguTypeEnum
}


  




