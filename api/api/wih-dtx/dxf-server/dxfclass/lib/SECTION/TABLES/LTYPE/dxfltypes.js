const LType = require('./dxfltype');

module.exports = class LTypes extends Array{
  constructor(ltypes = []){
    super()
    ltypes.forEach( ltype => {
      this.addLType(LType.newLType(ltype))
    })
  }

  static newLTypes(ltypes = []){
    return new LTypes(ltypes)
  }

  addLType(ltype){
    super.push(ltype)
  }

  toDXFString(){
    let result = `  2\r\nLTYPE\r\n`;
    result += ` 70\r\n     9\r\n`
    this.forEach(ltype => {
      result += ltype.toDXFString()
    })
    return result
  }
}