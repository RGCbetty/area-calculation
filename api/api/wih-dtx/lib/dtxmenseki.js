const { CommonItem } = require("./dtxheadertype");
const { DTXItem } = require("./dtxbase");
const { toStr, toInt, toEnm } = require("./dtxfunct");
const Enumeration = require('./dtxenumeration')

const mensekiTypeEnum = Enumeration.newEnum( 
  ['mtSiteArea'],
  ['mtBuildingArea'],
  ['mtFloorArea'],
  ['mtKisoMenseki'],
  ['mtGaisyuuNagasa'],
  ['mtOther3'],
  ['mtOther4'],
  ['mtOther5'],
  ['mtOther6'],
  ['mtOther7'],
  ['mtOther8'],
  ['mtOther9'],
  ['mtOther10'],
  ['mtOther11'],
  ['mtOther12'],
  ['mtOther13'],
  ['mtOther14'],
  ['mtOther15'],
  ['mtOther16'],
  ['mtOther17'],
  ['mtOther18'],
  ['mtOther19'],
  ['mtOther20'],
  ['mtOther21'],
  ['mtOther22'],
  ['mtOther23'],
  ['mtOther24'],
  ['mtOther25'],
  ['mtOther26'],
  ['mtOther27'],
  ['mtOther28'],
  ['mtOther29'],
  ['mtOther30'],
  ['mtOther31'],
  ['mtOther32'],
  ['mtOther33'],
  ['mtOther34'],
  ['mtOther35'],
  ['mtOther36'],
  ['mtOther37'],
  ['mtOther38'],
  ['mtOther39'],
  ['mtOther40'],
  ['mtOther41'],
  ['mtOther42'],
  ['mtOther43'],
  ['mtOther44'],
  ['mtOther45'],
  ['mtOther46']
);

class DTXMenseki extends CommonItem{
  
  constructor(){
    super();
  }

  assign(data, ln){
    this.addCommonItem(data, ln, true);
    this.mensekiType                      = toEnm({'str': data[ln+2], 'pos': 10, 'len': 5}, mensekiTypeEnum);
    this.mensekiCode                      = toInt({'str': data[ln+2], 'pos': 15, 'len': 5})
    this.addCoordinate(data, ln+3, true);
    this.chartNumber                      = toInt({'str': data[ln+3+this.pointCount], 'pos':  0, 'len': 5});
    this.multiplicationRateNum            = toInt({'str': data[ln+3+this.pointCount], 'pos':  5, 'len': 5});
    this.multiplicationRateDen            = toInt({'str': data[ln+3+this.pointCount], 'pos': 10, 'len': 5});
  }

  clear(){
    super.clear();
    this.mensekiType = '';
    this.mensekiCode = 0;
    this.chartNumber = 0;
    this.multiplicationRateNum = 0;
    this.multiplicationRateDen = 0;
  }

}

class DTXMensekiItem extends DTXItem{
  constructor(){
    super();
  }

  load(data, options){
    let vItemCount = this.count(data);
    for(let i=1; i<=vItemCount; i++){
      let item = new DTXMenseki();
      item.assign(data, this.ln);
      item.setLayerName(options.houseStructure)
      this.addItem(item);
      this.ln += (item.pointCount + 3);
    }
  }
}

module.exports = {
  DTXMensekiItem
}