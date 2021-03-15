const {CommonItem} = require ('./dtxheadertype');
const {toDbl, itemCount} = require('./dtxfunct')
const {DPoint} = require('../cadmodule/cadtypes')

class DTXOrientationItem extends CommonItem{

  constructor(){
    super()
    this.clear()
  }

  addValue(positiveY, negativeY, positiveX, negativeX) {
    this.positiveY = positiveY;
    this.negativeY = negativeY;
    this.positiveX = positiveX;
    this.negativeX = negativeX;
  }

  clear(){
    this.negativeX = ''
    this.negativeY = ''
    this.positiveX = ''
    this.positiveY = ''
    this.pointDirection = new DPoint()
  }

  load(data) {
    let ln = 0
    let vItemCount = itemCount(data[0])

    if (vItemCount === 0){
      this.addValue('North', 'South', 'East' , 'West')
    }else{
      for (let i=1; i<=vItemCount; i++){
        this.pointDirection.dX = toDbl({'str': data[ln+4], 'pos': 20, 'len': 10})
        this.pointDirection.dY = toDbl({'str': data[ln+4], 'pos': 30, 'len': 10})
  
        if ( (this.pointDirection.dX === 1) && ( this.pointDirection.dY = 0 ) ) {
          this.addValue('West','East','North','South')
        }else if ( ( this.pointDirection.dX === 0 ) && ( this.pointDirection.dY === 1 ) ){
          this.addValue('North','South','East','West')  
        }else if ( ( this.pointDirection.dX === -1  ) && ( this.pointDirection.dY === 0) ){
          this.addValue('East','West','South','North')
        }else if ( ( this.pointDirection.dX === 0) && ( this.pointDirection.dY === -1 ) ){
          this.addValue('South','North','West','East');
        }
          
        ln = ln + 7
      } 
    }
  }
}

module.exports =  {
  DTXOrientationItem
}
