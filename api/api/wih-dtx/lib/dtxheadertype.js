const {toDbl, toInt, toStr, toBul, toEnm} = require('./dtxfunct');
const {DPoint, DPoints, DPoint3D} = require('../cadmodule/cadtypes');
const {usePlaceEnum} = require('./dtxtypes');
const cad2d = require('../cadmodule/cad2d');

class CommonItem {
  constructor(){
    this.clear();
  }

  clear(){
    this.groupID = 0;
    this.propertyLock = false;
    this.resizeLock = false;
    this.materialCode = '';
    this.layerNumber = 0;
    this.layerName = '';
    this.dPoint = new DPoints;
    this.dPoint3D = [];
    this.pointCount = 0;
    this.name = '';
    
  }
    
  setLayerName(hs){
    if (this.layerNumber === 0){
      this.layerName = '敷地'
    }else if (this.layerNumber < 0) {
      
      switch(this.layerNumber){
        case -1: 
          this.layerName = 'East';
          break;
        case -2: 
          this.layerName = 'South';
          break;
        case -3: 
          this.layerName = 'West';
          break;
        case -4: 
          this.layerName = 'North';
          break;
      }
    }else if ( this.layerNumber > hs.floorLevelCount ){
      this.layerName = hs.floorLevel.loft.layerName
    }else{
      this.layerName = hs.floorLevel[this.layerNumber].layerName;
    }
  }

  addCommonItem(data, ln, withPoint = false) {
    this.groupID            = toInt({'str': data[ln+1], 'pos':  0, 'len': 5})
    this.propertyLock       = toBul({'str': data[ln+1], 'pos':  5, 'len': 5})
    this.resizeLock         = toBul({'str': data[ln+1], 'pos': 10, 'len': 5})
    this.materialCode       = toStr({'str': data[ln+1], 'pos': 15, 'len': data[ln+1].length})
    this.layerNumber        = toInt({'str': data[ln+2], 'pos':  0, 'len': 5})
    
    if (withPoint){
      this.pointCount       = toInt({'str': data[ln+2], 'pos':  5, 'len': 5})
    } 
  }

  addCoordinate(data, lineStart, readNextLine = false) {
    let 
      XP = 0,
      YP = 10
      
    this.dPoint.length = this.pointCount
    for (let p=0; p< this.pointCount; p++){
      let pt = new DPoint()
      if (readNextLine === true){
        pt.dX = toDbl( {'str': data[lineStart + p], 'pos':  0, 'len': 10});
        pt.dY = toDbl( {'str': data[lineStart + p], 'pos': 10, 'len': 10});
      }else{
        pt.dX = toDbl( {'str': data[lineStart], 'pos':  XP, 'len': 10}); 
        pt.dY = toDbl( {'str': data[lineStart], 'pos':  YP, 'len': 10});
        XP += 20;
        YP += 20;
      }
      this.dPoint[p] = pt
    }
    this.addCalculationValue_2D();

  }

  addCalculationValue_2D(){
    if (this.pointCount > 3){
      this.areaInMillimeter= cad2d.polyGonAreaInMillimeter_2D(this.dPoint);
      this.areaInGrid = cad2d.polyGonAreaInGrid_2D(this.dPoint);
      this.areaInTsubo = cad2d.polyGonAreaInTsubo_2D(this.dPoint);
      this.areaInJou = cad2d.polyGonAreaInJou_2D(this.dPoint);
      this.areaInMeterSquared = cad2d.polyGonAreaInMeterSquared_2D(this.dPoint);
      this.perimeterInMillimeter = cad2d.polygonPerimeterInMillimeter_2D(this.dPoint);
      this.perimeterInMeter = cad2d.polygonPerimeterInMeter_2D(this.dPoint);
      this.perimeterInGrid = cad2d.polygonPerimeterInGrid_2D(this.dPoint);
    }
    if (this.pointCount === 2){
      this.lengthInMillimeter = cad2d.lineDistance_2D(this.dPoint[0], this.dPoint[1]);
      this.lengthInGrid = cad2d.lineDistanceInGrid_2D(this.dPoint[0], this.dPoint[1]);
    }
  }

  addCoordinate3D(data, lineStart, readNextLine = false) {
    let 
      xP =  0,
      yP = 10,
      zP = 20;

    this.dPoint3D.length = this.pointCount;

    for (let p=0; p<this.pointCount; p++){
      if(readNextLine){
        let pt = new DPoint3D();
        pt.dX = toDbl({'str': data[lineStart+p], 'pos': xP, 'len': 10})
        pt.dY = toDbl({'str': data[lineStart+p], 'pos': yP, 'len': 10})
        pt.dZ = toDbl({'str': data[lineStart+p], 'pos': zP, 'len': 10})
        this.dPoint3D[p] = pt
      }
    }

  }

  setCommon(aCommon) {
    this.groupID = aCommon.groupID;
    this.materialCode = aCommon.materialCode;
    this.pointCount = aCommon.pointCount;
    this.dPoint = aCommon.dPoint;
    this.layerNumber = aCommon.layerNumber;
    this.layerName = aCommon.layerName
    this.addCalculationValue_2D();
  }

  cardinalDirection(index1 = 0, index2 = 1) {
    return cad2d.cardinalDirection_2D(this.dPoint[index1], this.dPoint[index2]);
  }

  pointinpolygon(aPoint){
    return cad2d.pointinpolygon_2Dwn(aPoint, this.dPoint);
  }

  linepositionXVValue(index1 = 0, index2 = 1){
    return cad2d.linePositionXYValue_2D(this.dPoint[index1], this.dPoint[index2]);
  }

  lineDistance (index1 = 0, index2 = 1) {
    return cad2d.lineDistance_2D(this.dPoint[index1], this.dPoint[index2]);
  }

  centerPoint(index1 = 0, index2 = 1){
    return cad2d.centerPoint_2D(this.dPoint[index1], this.dPoint[index2]);
  }

  pointLiesOnLine(aPoint, index1 = 0, index2 = 1){
    return cad2d.pointLiesOnLine_2D(aPoint, this.dPoint[index1], this.dPoint[index2])
  }

}

class DTX2DItem extends CommonItem{
  
  constructor(){
    super()
    this.clear();
  }

  addUsePlace(data, ln){
    this.usePlace = toEnm({'str': data[ln], 'pos': 5, 'len': 5}, usePlaceEnum);
  }

  clear(){
    super.clear();
    this.usePlace = {}; 
  }
}

module.exports = {
  CommonItem,
  DTX2DItem
} 




