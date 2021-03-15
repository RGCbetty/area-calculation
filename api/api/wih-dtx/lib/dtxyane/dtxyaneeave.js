const DTXYaneEaveProperty = require('./dtxyaneeaveproperty');

module.exports = class DTXYaneEave extends DTXYaneEaveProperty{
  
  constructor(){
    super()
    this.clear;
  } 

  clear() {
    super.clear()
    this.topEdge = 0;
  }

}

