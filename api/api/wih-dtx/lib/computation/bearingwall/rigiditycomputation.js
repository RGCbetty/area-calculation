const cad2d = require('./../../../cadmodule/cad2d');
const {DPoint} = require('./../../../cadmodule/cadtypes')
const {DTXCoordinate} = require('./../../dtxcoordinate');
const {FloorArray, FloorValue} = require('./bearingwallutils');
const master = require('./master');
const papa = require('papaparse');

class CoordinateValue {
  constructor(){
    this.fromCoordinate = '';
    this.coordinateNum = null;
    this.bWValue = 0;
    this.bWLength = 0;
    this.formula = '';
    this.lxi = 0;
    this.yi = 0;
    this.lxi_yi = 0;
    this.sy = 0;
    this.lxiYiSy2
    this.dPoint = new DPoint()
  }

  assign(bwItem, fromCoordinate, floorName){
    this.floorName = floorName;
    this.fromCoordinate = fromCoordinate;
    this.coordinateNum = parseFloat( this.fromCoordinate.substr(1, this.fromCoordinate.length) );
    this.bWValue = bwItem.bairitsu;
    this.bWLength = bwItem.lengthInGrid;
    this.dPoint = bwItem.dPoint;
    this.updatevalue();
  }

  isSame(fromCoordinate, bairitsu){
    return (this.fromCoordinate === fromCoordinate) && (this.bWValue === bairitsu);
  }

  setlxi(){
    this.formula = `${this.bWValue} x 0.910 x ${this.bWLength}`
    this.lxi = this.bWValue * 0.910 * this.bWLength;
  }

  setyi(){
    this.yi = (this.coordinateNum * 910) / 1000; 
  }

  setlxi_yi(){
    this.lxi_yi = this.lxi * this.yi;
  }

  updatevalue(){
    this.setlxi();
    this.setyi();
    this.setlxi_yi();
  }
}

class CoordinateList extends Array{
  constructor(){
    super()
  }

  addCoordinateValue(item){
    super.push(item);
    this.sort(); 
  }

  assign(bwItem, fromCoordinate, floorName){
    let found = false;
    for (let coorItem of this){
      found = coorItem.isSame(fromCoordinate, bwItem.bairitsu);
      if (found) {
        coorItem.bWLength += bwItem.lengthInGrid;
        coorItem.updatevalue();
        break;
      }
    }

    if (!found){
      let item = new CoordinateValue();
      item.assign(bwItem, fromCoordinate, floorName)
      this.addCoordinateValue(item);
    }

  }

  sort(){
    super.sort( (a, b) => {
      return a.coordinateNum - b.coordinateNum
    }) 
  };

  lxiSum() {
    let sum = 0
    this.forEach( item => {
      sum += item.lxi
    })
    return sum
  }

  lxi_yiSum() {
    let sum = 0;
    this.forEach( item => {
      sum += item.lxi_yi;
    })
    return sum
  }

  lxiyisy2Sum(lxiSum, lxi_yiSum){
    let sum = 0;
    let sy = lxi_yiSum / lxiSum;
    this.forEach(item => {
      item.sy = sy
      item.lxiyisy2 = Math.pow( (item.yi - sy), 2) * item.lxi;
      sum += item.lxiyisy2;
    })
    return sum
  }
}

class RigidityFloorValue extends FloorValue{
  constructor(floorName){
    super(floorName);
    this.lxiSum = 0;
    this.lxi_yiSum = 0;
    this.lxiyisy2Sum = 0;
    this.coordinateList = new CoordinateList()
  }

  compute(){
    this.lxiSum = this.coordinateList.lxiSum();
    this.lxi_yiSum = this.coordinateList.lxi_yiSum();
    this.lxiyisy2Sum = this.coordinateList.lxiyisy2Sum(this.lxiSum, this.lxi_yiSum);
  }

}

class RigidityFloorList extends FloorArray{
  constructor(){
    super();
  }

  addFloorValue(floorName) {
    let item = new RigidityFloorValue(floorName);
    super.push(item);
  }

  assign(coordinate, bwItem, forCoordinate){
    let fromCoordinate = DTXCoordinate.pointInCoordinateName(coordinate, this.getValueforCoordinate(bwItem.dPoint), forCoordinate);
    for (const fl of this){
      if (fl.floorName === bwItem.layerName){
        fl.coordinateList.assign(bwItem, fromCoordinate, fl.floorName)
        break;
      }
    }
  }

  compute(){
    this.forEach( fl => {
      fl.compute();
    })
  }

}


class CoodinateProperty {
  constructor(forCoordinate) {
    this.forCoordinate = forCoordinate
    this.floors = new RigidityFloorList()
  }

  isSameForCoordinate(coordinateName){
    return coordinateName.startsWith(this.forCoordinate)
  }

  assign(coordinate, bwItem){
    this.floors.assign(coordinate, bwItem, this.forCoordinate)
  }

  compute(){
    this.floors.compute();
  }

  clear(){
    this.forCoordinate = '';
    this.floors.clear();
  }

}

class Magnification {
  constructor(){
    this.x = new CoodinateProperty('Y');
    this.y = new CoodinateProperty('X');
    this.csvfile = '';
  }

  assign(coordinate, bwItem, gaisyuu){
    if (gaisyuu){
      if (this.isNotGeneralValue(bwItem))
        bwItem = this.setHigher(bwItem, gaisyuu);
    }
      
    let inCoordinateName = cad2d.linePositionXYValue_2D(bwItem.dPoint[0], bwItem.dPoint[1]);
    if(this.x.isSameForCoordinate(inCoordinateName)){
      this.x.assign(coordinate, bwItem)
    }else{
      this.y.assign(coordinate, bwItem);
    } 
  }

  compute(){
    this.x.compute();
    this.y.compute(); 
  }

  setHigher(bwItemS, gaisyuu){
    let bwItemH = {};
    Object.assign(bwItemH, bwItemS);

    if (this.isSameWithOthers(bwItemS)){
      let pointInEdge = cad2d.pointInPolygonEdge_2D(bwItemS.dPoint.centerPoint(), gaisyuu.items[bwItemS.layerNumber - 1].dPoint);
      if (pointInEdge)
        bwItemH.bairitsu = this.getHigher(1, bwItemS); 
      else{
        let pointInside = cad2d.pointinpolygon_2Dwn(bwItemS.dPoint.centerPoint(), gaisyuu.items[bwItemS.layerNumber - 1].dPoint);
        if (!pointInside)
          bwItemH.bairitsu = this.getHigher(1, bwItemS);
        else 
          bwItemH.bairitsu = this.getHigher(0, bwItemS);  
      } 
    }else{
      bwItemH.bairitsu = this.getHigher(0, bwItemS);  
    }
    
    return bwItemH
  }

  isNotGeneralValue(bwItemS){
    return master[String(bwItemS.bairitsu)].generalValue === false;
  }

  isSameWithOthers(bwItemS){
    return master[String(bwItemS.bairitsu)].sameOthers;
  }

  getHigher(i, bwItemS){
    return master[String(bwItemS.bairitsu)].higher[i]
  }

  clear(){
    this.x.clear();
    this.y.clear();
  }

  exportCSV(tableName, options){
    
    let csv = '';
    let data = []

    this.x.floors.forEach( floor => {
      floor.coordinateList.forEach( coordinate => {
        data.push( ['X', coordinate.floorName, coordinate.fromCoordinate, coordinate.coordinateNum, coordinate.bWValue, coordinate.bWLength] )
      })
    }) 

    data.push(['','','','','',''])

    this.y.floors.forEach( floor => {
      floor.coordinateList.forEach( coordinate => {
        data.push( ['Y', coordinate.floorName, coordinate.fromCoordinate, coordinate.coordinateNum, coordinate.bWValue, coordinate.bWLength] )
      })
    }) 

    csv = papa.unparse({
      "fields": ['Axis', 'Floor', 'Coordinate Name', 'Coordinate Num', 'BearingWall', 'Length'],
      "data": data
    })

    const filedownload = require('../../../../utils/filedownload');
    filedownload.saveFile(`${options.planInfo.memo1}-${options.planInfo.memo2}-Rigidity_${tableName}.csv`, csv, options.planInfo.memo1);
  }
  
}

module.exports = class RigidityComputation {
  constructor(){
    this.standard = new Magnification()
    this.higher = new Magnification()
  }

  compute(options){
    const bearingWall = options.bearingWall;
    const coordinate = options.coordinate;
    const gaisyuu = options.gaisyuu;
    this.setFloors(options.houseStructure);

    for (const bwItemS of bearingWall.items){
      this.standard.assign(coordinate, bwItemS);
      this.higher.assign(coordinate, bwItemS, gaisyuu);
    }

    this.standard.compute();
    this.higher.compute();

    this.exportCSV({
      planInfo: options.planInfo
    })
  }

  setFloors(houseStructure){
    this.standard.x.floors.setFloor(houseStructure)
    this.standard.y.floors.setFloor(houseStructure)

    this.higher.x.floors.setFloor(houseStructure)
    this.higher.y.floors.setFloor(houseStructure)
  }

  clear(){
    this.standard.clear();
    this.higher.clear();
  }
  
  exportCSV(options){
    this.standard.exportCSV('Standard', options);
    this.higher.exportCSV('Higher', options);
  }
}