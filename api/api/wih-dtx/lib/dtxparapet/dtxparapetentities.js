const {DTXItem} = require('../dtxbase')
const DTXYaneEntity = require('./dtxyaneentity');

const { toDbl, toInt } = require("../dtxfunct");

module.exports = class DTXParapetEntities extends DTXItem{
  constructor(){
    super()
  }

  load(data, options) {
    
    let vItemCount = this.count(data);
    for(let i=1; i<=vItemCount; i++){
      
      let vPC     = toInt({'str': data[this.ln+2], 'pos':  5, 'len':  5})
      let vPitch  = toDbl({'str': data[this.ln+3], 'pos': 40, 'len': 10})
      
      if(vPitch > 0){
        let item = new DTXYaneEntity();
        item.assign(data, this.ln, options);
        this.addItem(item);
      }
      
      this.ln += ( vPC + 8 );
    
    }
  }
}