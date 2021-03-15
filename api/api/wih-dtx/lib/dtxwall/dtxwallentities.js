const DTXKabeItem = require('./dtxkabeitem');
const DTXTareKabeItem = require('./dtxtarekabeitem');
const DTXKoshiKabeItem = require('./dtxkoshikabeitem');
const DTXSodeKabeItem = require('./dtxsodekabeitem');
const { itemCount, toEnm } = require( "../dtxfunct");
const {kabeTypeEnum} = require('./dtxkabetype')


module.exports = class DTXWallItem{

  constructor(){
    this.kabe = new DTXKabeItem();
    this.tarekabe = new DTXTareKabeItem();
    this.koshikabe = new DTXKoshiKabeItem();
    this.sodekabe = new DTXSodeKabeItem();  

    this.externalWallPerimeter = 0;
  }

  load(data, options) {
    let ln = 0;
    let vItemCount = itemCount(data[0]);
    
    for (let i=1; i<=vItemCount; i++){
      let iType = toEnm({'str':data[ln+2], 'pos': 5, 'len': 5}, kabeTypeEnum);
      
      if ('ktKabe' in iType)
        this.kabe.load(data, ln, options);
      else if ('ktTareKabe' in iType)
        this.tarekabe.load(data, ln, options);
      else if ('ktKoshiKabe' in iType)
        this.koshikabe.load(data, ln, options);
      else if ('ktSodeKabe' in iType)
        this.sodekabe.load(data, ln, options);

      ln += 9;
    }

  }

  clear() {
    this.kabe.clear();
    this.tarekabe.clear();
    this.koshikabe.clear();
    this.sodekabe.clear();
  }

}