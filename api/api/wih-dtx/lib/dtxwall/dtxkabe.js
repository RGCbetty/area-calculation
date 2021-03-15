const KabeProperty = require('./dtxkabeproperty')
const cad2d = require('../../cadmodule/cad2d')
const { toBul } = require( "../dtxfunct");

module.exports = class DTXKabe extends KabeProperty{

  constructor(){
    super();
    this.clear();
  }

  assign(data, ln){
    this.addCommonProperty(data, ln)
    this.gekaiYane  = toBul({'str': data[ln+9]});
  } 

  clear(){
    super.clear()
    this.gekaiYane = false;
    this.isPartialWall = false;
    this.attachAboveLayer = ''
  }

  getOutsideWallPerimeter(layerNumber, options){
    if (cad2d.pointInPolygonEdge_2D(this.centerPoint(), options.gaisyuu.items[layerNumber-1].dPoint)) return 0;
    if (cad2d.pointinpolygon_2Dwn(this.centerPoint(), options.gaisyuu.items[layerNumber-1].dPoint)) return 0;
    return this.lineDistance() * 2;
  }

  checkPartialWall(options){
    
    let cp = this.centerPoint()
    let gaisyuu = options.gaisyuu.items[ this.layerNumber-1 ]
    
    let check1 = cad2d.pointInPolygonEdge_2D( cp, gaisyuu.dPoint )
    let check2 = cad2d.pointinpolygon_2Dwn( cp, gaisyuu.dPoint )
    
    if ( check1 === false && check2 === false){

      this.isPartialWall = true;

      let balcony = options.balcony;
      for ( let item of balcony.items ){
        if (  item.layerNumber -1 < this.layerNumber ) continue;
        if (  item.layerNumber -1 > this.layerNumber ) break;
        
        if (cad2d.pointInPolygonEdge_2D( cp, item.dPoint ) || cad2d.pointinpolygon_2Dwn( cp, item.dPoint )){
          this.attachAboveLayer = item.name
          return;
        }
      }

      for (let item of options.yane.items){
        if ( item.layerNumber < this.layerNumber ) continue;
        if ( item.layerNumber > this.layerNumber ) break;
        
        if (cad2d.pointinpolygon_2Dwn( this.dPoint[0], item.dPoint )  && cad2d.pointinpolygon_2Dwn( this.dPoint[1], item.dPoint )) {
          this.attachAboveLayer = 'Mochidashi'
          return;
        } 
      }

      //next parapet
      
    }

  }

}