const { DTX2DItem } = require("./dtxheadertype");
const { usePlaceEnum } = require('./dtxtypes');
const { DTXItem } = require("./dtxbase");
const { toStr, toEnm, toInt } = require("./dtxfunct");

class DTXText extends DTX2DItem{
  
  constructor(){
    super(); 
    this.clear();
    this.pointCount = 1;
  }

  get textMerge(){
    return this.text.split('[En]').join('\n');
  }

  assign(data, ln) {
    this.addCommonItem(data, ln);
    this.usePlace = toInt({'str': data[ln+2], 'pos': 5, 'len': 5});
    this.text = toStr({'str': data[ln+2], 'pos': 10, 'len': data[ln+2].length - 10});
    this.addCoordinate(data, ln+5);
  }

  getsplitText(i) {
    let s = this.text.split('[En]');
    return s[i]
  }

  clear(){
    super.clear();
    this.text = ''
  }
}

class DTXTextItem extends DTXItem{
  constructor(){
    super();
  }

  load(data, options) {
    let vItemCount = this.count(data);

    let j = 1
    while(j < data.length - 1 ){
      let s = data[j]
      if (s.length > 1){
        j += 1
      }else{
        data.splice(j, 1);
      } 
    }
      
    for(let i=1; i<=vItemCount; i++){
      let item = new DTXText();
      item.assign(data, this.ln);
      item.setLayerName(options.houseStructure);
      this.addItem(item);
      this.ln += 9;
    }
  }

  getText(aItem, aCondition = '', onMaterialCode = false) {
    let vCheckString = ''
    for (const el of this.items){
      if (el.layerNumber < aItem.layerNumber) continue;
      if (el.layerNumber > aItem.layerNumber) break;

      switch (onMaterialCode){
        case true: 
          vCheckString = el.materialCode;
          break;
        case false: 
          vCheckString = el.text;
          break;
      }

      if (vCheckString.indexOf(aCondition) !== -1){
        let vPt = aItem.pointinpolygon(el.dPoint[0]);
        if (vPt === false) continue;
        return el
      }
    }
    return null
  }
}

module.exports = {
  DTXTextItem,
}