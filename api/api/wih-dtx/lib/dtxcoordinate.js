const {toStr} = require('./dtxfunct');
const {DTXItem} = require('./dtxbase');
const {CommonItem} = require('./dtxheadertype');

class DTXCoordinate extends CommonItem{
  constructor(){
    super()
    this.pointCount = 1
  }

  assign(data, ln){
    this.addCommonItem(data, ln, false);
    this.addCoordinate(data, ln+3, false);
    this.name = toStr({'str': data[ln+4]})
  }

  static pointInCoordinateName(coordinates, value, useXY = 'XY'){
    const C_X = 'X';
    const C_Y = 'Y';

    let p = coordinates.items.length - 1;
  
    for (let n=0; n < coordinates.items.length; n++){
      const pCoordinateName = coordinates.items[p].name.substring(0, 1);
      const nCoordinateName = coordinates.items[n].name.substring(0, 1);
    
      if (nCoordinateName === pCoordinateName) {
        switch (useXY){
          case C_X:
            if (nCoordinateName === C_X) {
              
              if (value === coordinates.items[p].dPoint[0].dX)
                return coordinates.items[p].name
              else if (value === coordinates.items[n].dPoint[0].dX)
                return coordinates.items[n].name
              else if ( (value > coordinates.items[p].dPoint[0].dX) && ( value < coordinates.items[n].dPoint[0].dX ) ){
                let num = parseFloat( coordinates.items[p].name.substring(1, coordinates.items[p].name.length));
                let diff = value - coordinates.items[p].dPoint[0].dX
                let quot = diff / 910
                let sum = num + quot;
                return `${C_X}${sum}`
              }
            }
            break;
          case C_Y:
            if (nCoordinateName === C_Y) {

              if (value === coordinates.items[p].dPoint[0].dY)
                return coordinates.items[p].name
              else if (value === coordinates.items[n].dPoint[0].dY)
                return coordinates.items[n].name
              else if ( (value > coordinates.items[p].dPoint[0].dY) && (value < coordinates.items[n].dPoint[0].dY) ){
                let num = parseFloat( coordinates.items[p].name.substring(1, coordinates.items[p].name.length));
                let diff = value - coordinates.items[p].dPoint[0].dY;
                let quot = diff / 910;
                let sum = num + quot;
                return `${C_Y}${sum}`
              }
            }
            break;
          default:
            break;
        }
      }
      p = n;
    }
    
  }

}
  
class DTXCoordinateItem extends DTXItem{
  constructor(){
    super()
  }

  load(data) {
    let vItemCount = this.count(data); 

    for (let i=1; i<=vItemCount; i++){
      let item = new DTXCoordinate();
      item.assign(data, this.ln);
      this.addItem(item)
      this.ln += 6
    }

  }

}

module.exports = {
  DTXCoordinate,
  DTXCoordinateItem
}
