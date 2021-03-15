const { DPoint } = require("../../cadmodule/cadtypes");
const cad2d = require("../../cadmodule/cad2d");



module.exports = class DTXYaneEaveProperty {
  
  constructor(){
    this.clear();

    this.isPointinLine = this.PointinLine
  }

  get centerPoint(){
    return cad2d.centerPoint_2D(this.dPoint1, this.dPoint2);
  }

  get length(){
    this.distance = cad2d.lineDistance_2D(this.dPoint1, this.dPoint2);
    return cad2d.lineDistance_2D(this.dPoint1, this.dPoint2);
  }

  clear(){
    this.pID_1 = 0;
    this.pID_2 = 0;
    this.dPoint1 = new DPoint();
    this.dPoint2 = new DPoint();
    this.additionalDim = null;
    this.isMuneType = false;
    this.noNeedinHafu = false;
    this.distance = 0;
  }

  PointinLine(aPoint) {
    return cad2d.pointLiesOnLine_2D(aPoint, this.dPoint1, this.dPoint2);
  }

  

}