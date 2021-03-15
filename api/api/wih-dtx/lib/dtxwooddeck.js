const { CommonItem } = require("./dtxheadertype");
const { DTXItem } = require("./dtxbase");

class DTXWooddeck extends CommonItem{
  
  constructor() {
    super();
    this.clear();
  }

  assign(data, ln, options){
    this.addCommonItem(data, ln, true);
    this.setLayerName(options.houseStructure);
    this.addCoordinate(data, ln+4, true);
    this.text = options.text.getText(this, 'WPCｳｯﾄﾞﾃﾞｯｷ[En]', false);
    if (this.text) this.name = this.text.textMerge;
  }

  clear(){
    super.clear();
    this.text = null;
  }

  get tesuriNote(){
    if (this.withTesuriNote)
      return this.text.getsplitText(2)
    else
      return ''
  } 

  get withTesuriNote(){
    return this.text.text.indexOf('(手摺)') !== -1
  }

  get heightDisplay(){
    if (this.text === null)
      return ''
    else{
      return this.text.getsplitText(1)
    }
  }

}

class DTXWooddeckItem extends DTXItem{
  constructor() {
    super()
  }

  load(data, options) {
    
    let vItemCount = this.count(data);

    for(let i=1; i<=vItemCount; i++){
      let item = new DTXWooddeck();
      item.assign(data, this.ln, options);
      this.addItem(item);
      this.ln += (item.pointCount + 4);
    }

  }

}

module.exports = {
  DTXWooddeckItem
}