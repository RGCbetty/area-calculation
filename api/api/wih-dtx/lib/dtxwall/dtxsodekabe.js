const KabeProperty = require('./dtxkabeproperty')
const { toDbl, toBul, toEnm } = require( "../dtxfunct");

module.exports = class DTXSodekabe extends KabeProperty{
  
  constructor(){
    super()
    this.clear();
  }

  assign(data, ln){
    this.addCommonProperty(data, ln);
    this.joubuKasagi                  = toBul({'str':data[ln+2], 'pos': 35, 'len':  5});
    this.takasaShitei                 = toBul({'str':data[ln+2], 'pos': 40, 'len':  5});
    this.kabuMikiri                   = toBul({'str':data[ln+2], 'pos': 45, 'len':  5});
    this.katanTakasa                  = toDbl({'str':data[ln+3], 'pos':  0, 'len': 10});
    this.joutanTakasa                 = toDbl({'str':data[ln+3], 'pos': 10, 'len': 10});
    this.kasagiChiri                  = toDbl({'str':data[ln+4], 'pos':  0, 'len': 10});
    this.kasagiTakasa                 = toDbl({'str':data[ln+4], 'pos': 10, 'len': 10});
    this.joutanTakasa_Shiten          = toDbl({'str':data[ln+4], 'pos': 20, 'len': 10});
    this.joutanTakasa_Shuuten         = toDbl({'str':data[ln+4], 'pos': 30, 'len': 10});
    this.katanTakasa_Shiten           = toDbl({'str':data[ln+4], 'pos': 40, 'len': 10});
    this.katanTakasa_Shuuten          = toDbl({'str':data[ln+4], 'pos': 50, 'len': 10});
    this.mikiriChiri                  = toDbl({'str':data[ln+4], 'pos': 60, 'len': 10});
    this.mikiriTakasa                 = toDbl({'str':data[ln+4], 'pos': 70, 'len': 10});
  }
  
  clear(){
    super.clear();
    this.joubuKasagi;
    this.takasaShitei;
    this.kabuMikiri;
    this.katanTakasa;
    this.joutanTakasa;
    this.kasagiChiri;
    this.kasagiTakasa;
    this.joutanTakasa_Shiten;
    this.joutanTakasa_Shuuten;
    this.katanTakasa_Shiten;
    this.katanTakasa_Shuuten;
    this.mikiriChiri;
    this.mikiriTakasa;
  }
}