const DxfDraw = require('./lib/DRAW/dxfdraw');
const fs = require('fs');
const iconv = require('iconv-lite');


module.exports = class DXFFile extends DxfDraw{
  constructor(){
    super()
  }

  exportFile(path){
    let val = iconv.encode(this.toDXFString(), 'cp932');
    fs.writeFileSync(path, val, {encoding: 'ascii'});
  }

}