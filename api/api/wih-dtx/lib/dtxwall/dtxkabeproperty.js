const { CommonItem } = require("../dtxheadertype");
const { toDbl, toBul, toEnm } = require( "../dtxfunct");
const { DPoint } = require( "../../cadmodule/cadtypes");
const { kabeAtsuTaipuEnum } = require('./dtxkabetype')

module.exports = class KabeProperty extends CommonItem{
  
  constructor(){
    super()
    this.clear()
    this.rBubunChouten = -1;
  }

  addCommonProperty(data, ln){
    this.addCommonItem(data, ln);
    this.addCoordinate(data, ln+5);
    this.kabeAtsuTaipu                  = toEnm({'str': data[ln+2], 'pos': 20, 'len':  5}, kabeAtsuTaipuEnum);
    this.shinFuriwake                   = toDbl({'str': data[ln+3], 'pos': 40, 'len': 10});
    this.henShinR                       = toDbl({'str': data[ln+3], 'pos': 50, 'len': 10});
    this.henShinL                       = toDbl({'str': data[ln+3], 'pos': 60, 'len': 10});
    this.nigeRyou_shiten                = toBul({'str': data[ln+6], 'pos':  0, 'len':  5});
    this.nigeRyou_shuuten               = toBul({'str': data[ln+6], 'pos':  5, 'len':  5});
    this.bearingWall                    = toBul({'str': data[ln+6], 'pos': 10, 'len':  5});
    this.mojiHoukou.dX                  = toDbl({'str': data[ln+7], 'pos':  0, 'len': 10});
    this.mojiHoukou.dY                  = toDbl({'str': data[ln+7], 'pos': 10, 'len': 10});
    this.mojiIchi.dX                    = toDbl({'str': data[ln+7], 'pos': 20, 'len': 10});
    this.mojiIchi.dY                    = toDbl({'str': data[ln+7], 'pos': 30, 'len': 10});
    this.tesuriHyouji                   = toBul({'str': data[ln+8], 'pos':  0, 'len':  5});
  }

  clear(){
    super.clear();
    this.kabeType = {}
    this.kabeAtsuTaipu = {}
    this.henShinR = 0
    this.henShinL = 0
    this.shinFuriwake = 0
    this.nigeRyou_Shiten = false
    this.nigeRyou_Shuuten = false
    this.bearingWall = false
    this.mojiHoukou = new DPoint()
    this.mojiIchi = new DPoint()
    this.tesuriHyouji = false
    this.rBubunChouten = 0
    this.pointCount = 2;
  }

}