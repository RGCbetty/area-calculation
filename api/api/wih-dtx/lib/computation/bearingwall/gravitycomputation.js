const cadtypes = require('./../../../cadmodule/cadtypes');
const {DTXCoordinate} = require('./../../dtxcoordinate');
const {FloorArray, FloorValue} = require('./bearingwallutils');
const papa = require('papaparse');

class AxisPosition{
  constructor(){
    this.start = '';
    this.startExt = '';
    this.end = '';
    this.endExt = '';
    this.centerGravity = 0;
    this.weightXcenter = 0;
    this.centerGravity_G = 0;
  }

  assign(coordinate, start, end, fromCoordinate){
    let s = '';
    let e = '';

    s = DTXCoordinate.pointInCoordinateName(coordinate, start, fromCoordinate);
    e = DTXCoordinate.pointInCoordinateName(coordinate, end, fromCoordinate); 

    this.start = s.substr(1, s.length);
    this.end = e.substr(1, e.length);

    this.compute(); 
  }

  compute(){
    let sumS = (this.start * 910) + (Number(this.startExt) * 910);
    let sumE = (this.end * 910) + ( Number(this.endExt) * 910)
    let avrg = (sumS + sumE) / 2
    this.centerGravity = avrg / 1000;
  }

  computeweightXcenter(weight){
    this.weightXcenter = weight * this.centerGravity;
  }
}

class AxisProperty{
  constructor(){
    this.size = 0;
    this.axis = new AxisPosition(); 
  }
}

class LayoutItem {
  constructor(){
    this.floorName = '';
    this.num = 0;
    this.x = new AxisProperty;
    this.y = new AxisProperty;
    this.overhangBalcony = 0;
    this.formula = '';
    this.ai = 0;
    this.roofB = 0;
    this.wi = 0;
  }  

  isRoofBFixedValue(options){
    if(this.floorName === '1階'){
      switch (options.roofType){
        case 'omoiyane': return 15
        case 'karuiyane': return 11
        default: return 18
      }
    }else
      return 18;
  }

  assign(mensItem, coordinate, options){
    this.floorName = mensItem.layerName;
    this.roofB = this.isRoofBFixedValue(options);
    this.num = mensItem.chartNumber;
    this.setAxis(mensItem, coordinate);
    this.compute();
  }

  setAxis(mensItem, coordinate){
    let rect = new cadtypes.DRect();
    rect.getRectFromArray(mensItem.dPoint);
    
    this.x.size = rect.width;
    this.y.size = rect.height;
    this.x.axis.assign(coordinate, rect.left, rect.right, 'X');
    this.y.axis.assign(coordinate, rect.bottom, rect.top, 'Y');
  }

  compute(){
    this.formula = `${this.x.size/1000} x ${this.y.size/1000}`;
    this.ai = (this.x.size/1000) * (this.y.size/1000);
    this.wi = this.roofB * this.ai;
    this.x.axis.computeweightXcenter(this.wi);
    this.y.axis.computeweightXcenter(this.wi);
  }

}

class LayoutList extends Array{
  constructor(){
    super()
  } 

  addLayoutValue(item){
    super.push(item);
    this.sort();
  }

  assign(mensItem, coordinate, options){
    if (this.isFloorArea(mensItem)){
      let item = new LayoutItem();
      item.assign(mensItem, coordinate, options)
      this.addLayoutValue(item);
    }
  }

  isFloorArea(mensItem){
    return 'mtFloorArea' in mensItem.mensekiType;
  }

  sort(){
    super.sort((a, b) => {
      return a.num - b.num;
    })
  }
}

class GravityFloorValue extends FloorValue{
  constructor(floorName){
    super(floorName);
    this.layouts = new LayoutList();
    this.total_Wi = 0;
    this.total_Wi_Xi = 0;
    this.total_Wi_Yi = 0;
    this.total_Gx = 0;
    this.total_Gy = 0;
  }

  compute(){
    this.layouts.forEach( layout => {
      this.total_Wi += layout.wi;
      this.total_Wi_Xi += layout.x.axis.weightXcenter;
      this.total_Wi_Yi += layout.y.axis.weightXcenter;
    });
    
    this.total_Gx = this.total_Wi_Xi / this.total_Wi;
    this.total_Gy = this.total_Wi_Yi / this.total_Wi;
  }

}

class GravityFloorList extends FloorArray{
  constructor(){
    super()
  }

  addFloorValue(floorName) {
    let item = new GravityFloorValue(floorName);
    super.push(item);
  }

  assign(mensItem, coordinate, options){
    for (const fl of this){
      if (fl.isSameFloor(mensItem)){
        fl.layouts.assign(mensItem, coordinate, options)
        break;
      }
    }
  }

}

class Magnification{
  constructor(){
    this.floors = new GravityFloorList();
    this.overall_Wi = 0;
    this.overall_Wi_Xi = 0;
    this.overall_Wi_Yi = 0;
    this.overall_Gx = 0;
    this.overall_Gy = 0;
  }

  compute(options){
    const menseki = options.menseki;
    const coordinate = options.coordinate;
    this.floors.setFloor(options.houseStructure)

    menseki.items.forEach( mensItem => {
      this.floors.assign(mensItem, coordinate, options.condition);
    })

    this.floors.forEach( floor => {
      floor.compute();
      this.overall_Wi += floor.total_Wi;
      this.overall_Wi_Xi += floor.total_Wi_Xi;
      this.overall_Wi_Yi += floor.total_Wi_Yi;
    })

    this.overall_Gx = this.overall_Wi_Xi / this.overall_Wi;
    this.overall_Gy = this.overall_Wi_Yi / this.overall_Wi;
    
  }

  exportCSV(tableName, options){
    let csv = '';
    let data = []

    this.floors.forEach(floor => {
      floor.layouts.forEach(layout => {
        data.push( [layout.floorName, layout.num, layout.x.size, layout.y.size, layout.overhangBalcony, layout.x.axis.start, layout.x.axis.end, layout.y.axis.start, layout.y.axis.end] )
      })
    })

    csv = papa.unparse({
      "fields": ['Floor', 'Num', 'X', 'Y', 'OverHang Balcony', 'X_Start', 'X_End', 'Y_Start', 'Y_End'],
      "data": data
    })

    const filedownload = require('../../../../utils/filedownload');
    filedownload.saveFile(`${options.planInfo.memo1}-${options.planInfo.memo2}-Gravity_${tableName}.csv`, csv, options.planInfo.memo1);
  }

}

module.exports = class GravityComputation{
  constructor(){
    this.standard = new Magnification();
    this.higher = new Magnification();
  }

  compute(options){
    this.standard.compute(options);  
    this.higher.compute(options);
    this.exportCSV(options);
  }

  exportCSV(options){
    this.standard.exportCSV('Standard', options);
    this.higher.exportCSV('Higher', options);
  }
}