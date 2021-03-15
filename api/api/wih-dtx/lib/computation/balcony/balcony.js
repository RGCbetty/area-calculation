const cad2d = require('../../../cadmodule/cad2d');

module.exports = class Balcony{
  constructor(item, options){
    this.name = item.name;
    this.layerName = item.layerName;
    this.handrailLength = 0;
    this.wallsurface = 0;
    this.compute(item, options);
    
  }

  static create(item, options){
    return new Balcony(item, options)
  }


  compute(item, options){
    let checkPoint = []
    let wallsurface = 0;

    for (let i = 0; i < item.pointCount; i++)
      checkPoint[i] = false;

    let outsideLayout = options.gaisyuu.items[item.layerNumber - 1];

    for (let i=0; i<item.dPoint.length; i++){
      checkPoint[i] = cad2d.pointInPolygonEdge_2D( item.dPoint[i], outsideLayout.dPoint ) 
    }

    let totallength = 0;
    let handrailLenght = 0;
    let wallpart = 0;

    let lP = item.pointCount - 1;
    for (let rP=0; rP<item.pointCount; rP++){
      if ( checkPoint[lP] && checkPoint[rP] ){
        wallpart += item.lineDistance(lP, rP)
        
      }else{
        handrailLenght += item.lineDistance(lP, rP)
      }
      lP = rP
    }

    lP = item.pointCount - 1;
    for (let rP=0; rP<item.pointCount; rP++){
      if ( (checkPoint[lP] == false) || (checkPoint[rP] == false) ){
        let balconylength = item.lineDistance();

        for (let sode of options.wall.sodekabe.items){

          if (item.layerNumber === sode.layerNumber) {
            let kabeLen = sode.lineDistance();

            if (kabeLen > balconylength){
              if ( cad2d.pointLiesOnLine_2D( item.dPoint[lP], sode.dPoint[0], sode.dPoint[1] )  && cad2d.pointLiesOnLine_2D( item.dPoint[rP], sode.dPoint[0], sode.dPoint[1] ) ){
                wallsurface += balconylength
              }
            }else{
              if ( cad2d.pointLiesOnLine_2D( sode.dPoint[0], item.dPoint[lP], item.dPoint[rP]) && cad2d.pointLiesOnLine_2D( sode.dPoint[1], item.dPoint[lP], item.dPoint[rP]) ){
                wallsurface += kabeLen
              } 
            }
          };
        }
      }
      lP = rP;
    }

    this.handrailLength = ( handrailLenght - wallsurface) / 1000;
    this.wallsurface = (wallpart + wallsurface) / 1000;

  }


}