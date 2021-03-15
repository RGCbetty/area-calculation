const cad2d = require('./cad2d')

const defaults = {
  dX: 0,
  dY: 0,
  dZ: 0
}

class DPoint {

  constructor(dX = 0, dY= 0){
    this.dX = dX | defaults.dX;
    this.dY = dY | defaults.dY;
  }

  clear(){
    this.dX = 0
    this.dY = 0
  }

  default() {
    this.clear()
  }

  cross(v){
    return this.dX * v.dY - this.dY * v.dX;
  }
  
  minus(b) {
    return new DPoint( this.dX - b.dX, this.dY - b.dY );
  }

  timesByPoint(b) {
    return this.dX * b.dX + this.dY * b.dY;
  }

  timesByNumber(k = 0) {
    return new DPoint(this.dX * k, this.dY * k)
  }

}

class DPoints extends Array{
  centerPoint(index1=0, index2=1){
    let cp = cad2d.centerPoint_2D(this[index1], this[index2]);
    return new DPoint(cp.dX, cp.dY)
  }
}

class DPoint3D{
  
  constructor(){
    this.dX = 0
    this.dY = 0
    this.dZ = 0
    
  }
}

class DLine{
  constructor(){
    this.dPoint1 = new DPoint();
    this.dPoint2 = new DPoint();
  }
  
  get midPoint(){
    return cad2d.centerPoint_2D(this,dPoint1, this.dPoint2);
  }

  get lengthDistance(){
    return cad2d.lineDistance_2D(this.dPoint1, this.dPoint2);
  }
 
}

class DRect{
  constructor(){
    this.top = 0;
    this.bottom = 0;
    this.left = 0;
    this.right = 0;
  }

  getRectFromArray(dPoints){
    this.left = dPoints[0].dX;
    this.right = dPoints[0].dX;
    this.top = dPoints[0].dY;
    this.bottom = dPoints[0].dY;

    for (const pt of dPoints){
      if (pt.dX < this.left )
        this.left = pt.dX;

      if (pt.dX > this.right )
        this.right = pt.dX;

      if (pt.dY > this.top)
        this.top = pt.dY
      
      if (pt.dY < this.bottom)
        this.bottom = pt.dY
    }
  }

  get height(){
    return this.top - this.bottom;
  }

  get width(){
    return this.right - this.left;
  }
}

module.exports = {
  DPoint,
  DPoints,
  DPoint3D,
  DLine,
  DRect
}
