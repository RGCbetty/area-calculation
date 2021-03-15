const {DTXItem} = require('./dtxbase');
const cad2d = require('../cadmodule/cad2d');
const DTXBalconyProperty = require('./dtxbalconytypes');
const {toStr, toInt} = require("./dtxfunct");

class DTXBalcony extends DTXBalconyProperty{
  constructor(){
    super()
    super.clear();

    // notfullyOverhang, fullyOverhang, notOverhang
    this.nokitenLayer = ''
  }

  checkIsOverhang(options){
    let gaisyuu = options.gaisyuu
    let notOverhang = false;
    let lP = this.dPoint.length - 1;


    //check notfullyOverhang
    for (let rP=0; rP<this.dPoint.length; rP++){
      let a = cad2d.pointinpolygon_2Dwn(this.dPoint[rP], gaisyuu.items[this.layerNumber-2].dPoint) || cad2d.pointInPolygonEdge_2D(this.dPoint[rP], gaisyuu.items[this.layerNumber-2].dPoint)
      
      if (a === true && rP === this.dPoint.length-1){
        return 'notfullyOverhang' 
      }else if (a === true && rP !== this.dPoint.length-1){
        continue
      }else if (a === false){
        break;
      }
    }

    // notOverhang
    for (let rP=0; rP<this.dPoint.length; rP++){
      let cP = cad2d.centerPoint_2D(this.dPoint[lP], this.dPoint[rP])

      notOverhang = cad2d.pointinpolygon_2Dwn(cP, gaisyuu.items[this.layerNumber-2].dPoint)
      if (notOverhang){
        return 'notOverhang' 
      }
      lP = rP
    }

    return 'fullyOverhang' 
  }

  getBalconyType(data){
    let tesuri = data.tesuriHt
    let handrail = data.numberOfHandrails
    let fl = data.heightFromFL

    if( handrail == 3 ){
      return 'JY'
    }else if( handrail == 0 && tesuri > 1000 ){
      return 'K'
    }else if( tesuri < 400 ){
      if( fl == 2211 || fl == 2209 ){
        return 'KS'
      }else if( fl == 2407 || fl == 2409 ){
        return 'KI'
      }
    }else{
      return 'unknown'
    }
  }

}

class DTXBalconyItem extends DTXItem{
  constructor(){
    super()
  }

  load(data, options) {
    let vItemCount = this.count(data);

    for (let i=1; i<=vItemCount; i++){

      let vName = toStr({'str': data[this.ln+5]});  
      let vPC   = toInt({'str': data[this.ln+2], 'pos': 5, 'len': 5})
      
      if (vName.indexOf('バルコニー') !== -1){
        let item = new DTXBalcony();
        item.assign(data, this.ln, options);
        item.nokitenLayer = item.checkIsOverhang(options)
        item.balconyType = item.getBalconyType(item)
        this.addItem(item);
      }
      
      this.ln += (vPC + 8)
    }
  }
}

module.exports = {
  DTXBalcony,
  DTXBalconyItem
}