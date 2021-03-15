const KabeProperty = require('./dtxkabeproperty')
const { toDbl, toBul, toEnm } = require( "../dtxfunct");
const { tarekabeKeijouTaipuEnum } = require('./dtxkabetype')

module.exports = class DTXTarekabe extends KabeProperty{
  
  constructor(){
    super() 
    this.clear()
  }

  assign(data, ln){
    this.addCommonProperty(data, ln);
    this.tarekabeKeijouTaipu            = toEnm({'str': data[ln+2], 'pos': 10, 'len':  5}, tarekabeKeijouTaipuEnum);
    this.aChiMoru                       = toBul({'str': data[ln+2], 'pos': 25, 'len':  5});
    this.takasaShitei                   = toBul({'str': data[ln+2], 'pos': 40, 'len':  5});
    this.kabuMikiri                     = toBul({'str': data[ln+2], 'pos': 45, 'len':  5});
    this.katanTakasa                    = toDbl({'str': data[ln+3], 'pos':  0, 'len': 10});
    this.rBubunTakasa                   = toDbl({'str': data[ln+3], 'pos': 20, 'len': 10});
    this.rHankei                        = toDbl({'str': data[ln+3], 'pos': 30, 'len': 10});
    this.aChiMoruHaba                   = toDbl({'str': data[ln+3], 'pos': 70, 'len': 10});
    this.katanTakasa_Shiten             = toDbl({'str': data[ln+4], 'pos': 40, 'len': 10});
    this.katanTakasa_Shuuten            = toDbl({'str': data[ln+4], 'pos': 50, 'len': 10});
    this.mikiriChiri                    = toDbl({'str': data[ln+4], 'pos': 60, 'len': 10});
    this.mikiriTakasa                   = toDbl({'str': data[ln+4], 'pos': 70, 'len': 10});
    this.katanSuihei                    = toDbl({'str': data[ln+8], 'pos': 10, 'len': 10});
  }

  clear(){
    super.clear();
    this.rBubunTakasa;
    this.tarekabeKeijouTaipu;
    this.aChiMoru;
    this.takasaShitei;
    this.kabuMikiri;
    this.katanTakasa;
    this.rHankei;
    this.aChiMoruHaba;
    this.katanTakasa_Shiten ;
    this.katanTakasa_Shuuten;
    this.mikiriChiri;
    this.mikiriTakasa;
    this.rBubunChouten;
    this.katanSuihei;
  }
  
}