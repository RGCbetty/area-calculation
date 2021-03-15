const { CommonItem } = require("./dtxheadertype");
const { toStr, toDbl, toInt } = require("./dtxfunct");

module.exports = class DTXBalconyProperty extends CommonItem{
  
  constructor(){
    super()
    this.clear()
  }

  setHeightFromFL(hs) {
    let CHBTFT = 0;

    if (this.layerNumber <= hs.floorLevelCount){
      CHBTFT = ( hs.floorLevel[this.layerNumber - 1].standardFloorHeight - hs.floorLevel[this.layerNumber - 1].floorHeight_FL ) + hs.floorLevel[this.layerNumber].floorHeight_FL
    }else { // this.layerNumber > vHS.floorLevelCount
      CHBTFT = ( hs.floorLevel[this.layerNumber - 1].standardFloorHeight - hs.floorLevel[this.layerNumber - 1].floorHeight_FL ) + hs.loftLevel.floorHeight_FL;
    }
    
    this.heightFromFL = CHBTFT - this.floorThickness;
  }

  assign(data, ln, options) {
    this.addCommonItem(data, ln, true);
    this.setLayerName(options.houseStructure);
    this.numberOfHandrails            = toInt({'str': data[ln+2], 'pos': 15, 'len': 5});
    this.floorThickness               = toDbl({'str': data[ln+3], 'pos': 10, 'len': 10})
    this.tesuriHt                     = toDbl( {str: data[ln+3], pos: 20, len: 10})

    this.name                         = toStr({'str': data[ln+5]});
    
    this.addCoordinate(data, ln+6, true);

    // others
    this.setHeightFromFL(options.houseStructure);

  }

  clear() {
    super.clear();
    this.numberOfHandrails = 0;
    this.floorThickness = 0;
    this.heightFromFL = 0;
    this.tesuriHt = 0;
  }

}