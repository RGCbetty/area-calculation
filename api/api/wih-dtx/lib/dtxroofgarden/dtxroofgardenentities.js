const {DTXItem} = require('../dtxbase');
const {toStr, toInt} = require("../dtxfunct");
const DTXRoofGardenEntity = require('./dxroofgardenentity')

module.exports = class DTXRoofGardenEntities extends DTXItem{
  constructor(){
    super()
  }

  load(data, options) {
    let vItemCount = this.count(data);

    for (let i=1; i<=vItemCount; i++){

      let vName = toStr({'str': data[this.ln+5]});  
      let vPC   = toInt({'str': data[this.ln+2], 'pos': 5, 'len': 5})
      
      if (vName.indexOf('ﾙｰﾌｶﾞｰﾃﾞﾝ') !== -1){
        let item = new DTXRoofGardenEntity();
        item.assign(data, this.ln, options);
        this.addItem(item);
      }
      
      this.ln += (vPC + 8)
    }
  }
}