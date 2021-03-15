const cad2d = require('./../../../cadmodule/cad2d');

class FloorValue{
  constructor(floorName){
    this.floorName = floorName;
  }

  isSameFloor(item){
    return this.floorName === item.layerName;
  }
}

class FloorArray extends Array{
  constructor(){
    super()
  }

  getValueforCoordinate(points, index1 = 0, index2 = 1){
    let XY = cad2d.linePositionXYValue_2D(points[index1], points[index2]);
    if (XY === 'X'){
      return points[0].dX
    }else{
      return points[0].dY
    }
  }

  setFloor(houseStructure){
    let i = 1;
    while (i <= houseStructure.floorLevelCount){
      this.addFloorValue(houseStructure.floorLevel[`${i}`].layerName);
      i++;
    }
    
    if (houseStructure.withLoft){
      this.addFloorValue(houseStructure.floorLevel['loft'].layerName);
    }
  }

  clear(){
    this.length = 0;
  }

}

module.exports = {
  FloorValue,
  FloorArray
}