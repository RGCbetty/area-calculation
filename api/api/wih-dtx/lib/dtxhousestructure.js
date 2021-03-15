const {toDbl, toBul, toInt, toStr} = require( './dtxfunct.js' );

class DTXHouseStructure {
  constructor(){
    this.clear();
  }

  clear(){
    this.floorLevelCount             = 0;
    this.undergroundCount            = 0;
    this.withLoft                    = false;
    this.firstFloorReferenceHeight   = 0;
    this.firstFloorFoundationHeight  = 0;
    this.gridModule                  = 0;
    this.basementFoundationHeight    = 0;
    this.floorLevel                  = {};
  }

  beamHT(aFL){
    let vStandard = 0;
    let fL = parseInt(aFL);
    for (let i=1; i<=fL; i++){
      vStandard = vStandard + this.floorLevel[i].standardFloorHeight;
    }
    return this.firstFloorReferenceHeight + vStandard;
  }

  load(data){
    let ln = 2;
  
    this.floorLevelCount                  = toInt( {'str': data[1], 'pos':  0, 'len':  5});
    this.withLoft                         = toBul( {'str': data[1], 'pos': 10, 'len':  5});
    this.firstFloorReferenceHeight        = toDbl( {'str': data[2], 'pos':  0, 'len': 10});
    this.firstFloorFoundationHeight       = toDbl( {'str': data[2], 'pos': 10, 'len': 10});
    this.gridModule                       = toDbl( {'str': data[2], 'pos': 20, 'len': 10});
    this.basementFoundationHeight         = toDbl( {'str': data[2], 'pos': 30, 'len': 10});

    for (let i = 1; i<=this.floorLevelCount; i++){
      let fl = {};
      fl.layerName                        = toStr( {'str': data[ln+1]})
      fl.layerFlag                        = toBul( {'str': data[ln+2]})
      fl.standardFloorHeight              = toDbl( {'str': data[ln+3], 'pos':  0, 'len': 10});
      fl.floorHeight_FL                   = toDbl( {'str': data[ln+3], 'pos': 10, 'len': 10});
      fl.ceilingHeight                    = toDbl( {'str': data[ln+3], 'pos': 20, 'len': 10});
      fl.heightInsideFitting              = toDbl( {'str': data[ln+3], 'pos': 30, 'len': 10});
      ln += 3
      this.floorLevel[i] = fl
    }

    if (this.withLoft){
      let fl = {};
      fl.layerName             = toStr( {'str': data[ln+1]})
      fl.layerFlag             = toBul( {'str': data[ln+2]})
      fl.standardFloorHeight   = toDbl( {'str': data[ln+3], 'pos':  0, 'len': 10});
      fl.floorHeight_FL        = toDbl( {'str': data[ln+3], 'pos': 10, 'len': 10});
      fl.ceilingHeight         = toDbl( {'str': data[ln+3], 'pos': 20, 'len': 10});
      fl.heightInsideFitting   = toDbl( {'str': data[ln+3], 'pos': 30, 'len': 10});
      this.floorLevel['loft']  = fl; 
    }
  }

}

module.exports = DTXHouseStructure
