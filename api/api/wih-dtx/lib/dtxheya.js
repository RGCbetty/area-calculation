const {CommonItem} = require('./dtxheadertype');
const {DTXItem} = require('./dtxbase')
const {toStr, toInt, toDbl, toEnm}  = require('./dtxfunct');
const {noteAlignEnum} = require('./dtxtypes');
const {DPoint} = require('../cadmodule/cadtypes');
const Enumeration = require('./dtxenumeration');

const japaneseWallFinishEnum = Enumeration.newEnum(
  ['jfOokabe', 1],
  ['jfShinKabe'],
);

const japaneseWideEdgeWallTypeEnum = Enumeration.newEnum(
  ['jeKamoiNashi'],
  ['jeTsukegamoi'],
  ['jeNageshiTsukegamoi']
);

const roomTypeNameEnum = Enumeration.newEnum(
  ['rtGenkan', 1],
  ['rtRouka'],
  ['rtWashitsu'],
  ['rtYoushitsu'],
  ['rtKicchin'],
  ['rtYokushitsu'],
  ['rtSenmenjo'],
  ['rtToire'],
  ['rtRibingu'],
  ['rtKodomoshitsu'],
  ['rtBirutuinShako'],
  ['rtShuunouHeya'],
  ['rtSonota', 99],
  ['rtMinashiHeya', 999],
);

class DTXHeya extends CommonItem{

  constructor() {
    super()
    this.clear();
  }

  clear(){
    super.clear()
    this.notePosition = new DPoint();
    this.roomTypeName = {};
    this.bedMaterialAngle = 0;
    this.ceilingMaterialAngle = 0;
    this.japaneseWallType = {};
    this.japeneseWallFinish = {};
    this.roomNoteAlign = {};
    this.floorHeight  = 0;
    this.ceilingHeight = 0;
    this.kamoiToritsuke = 0;
    this.habakiHeight = 0;
    this.maguchiHeight = 0;
  }

  assign(data, ln) {
    this.addCommonItem(data, ln, true);
    this.addCoordinate(data, ln+6, true);
    this.roomTypeName                = toEnm({'str': data[ln+2], 'pos': 10, 'len': 5}, roomTypeNameEnum);
    this.bedMaterialAngle            = toInt({'str': data[ln+2], 'pos': 15, 'len': 5})
    this.ceilingMaterialAngle        = toInt({'str': data[ln+2], 'pos': 20, 'len': 5})
    this.japaneseWallType            = toEnm({'str': data[ln+2], 'pos': 25, 'len': 5}, japaneseWideEdgeWallTypeEnum);
    this.japeneseWallFinish          = toEnm({'str': data[ln+2], 'pos': 30, 'len': 5}, japaneseWallFinishEnum);
    this.roomNoteAlign               = toEnm({'str': data[ln+2], 'pos': 35, 'len': 5}, noteAlignEnum); 
    this.floorHeight                 = toDbl({'str': data[ln+3], 'pos':  0, 'len': 10});
    this.ceilingHeight               = toDbl({'str': data[ln+3], 'pos': 10, 'len': 10});
    this.kamoiToritsuke              = toDbl({'str': data[ln+3], 'pos': 20, 'len': 10});
    this.habakiHeight                = toDbl({'str': data[ln+3], 'pos': 30, 'len': 10});
    this.maguchiHeight               = toDbl({'str': data[ln+3], 'pos': 40, 'len': 10});
    this.name                        = toStr({'str': data[ln+4]});
  }

}

class DTXHeyaItem extends DTXItem{
  constructor() {
    super()
  }

  load(data, options) {
    let vItemCount = this.count(data);
    for (let i=1; i<=vItemCount; i++){
      let item = new DTXHeya();
      item.assign(data, this.ln);
      item.setLayerName(options.houseStructure);
      this.addItem(item);
      this.ln += (item.pointCount + 12)
    }

  }

}

module.exports = DTXHeyaItem
