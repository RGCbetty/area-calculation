const Style = require('./dxfstyle');

module.exports = class Styles extends Array{
  constructor(styles = []){
    super();
    styles.forEach( style => {
      this.addStyle( Style.newStyle(style) )
    })
  }

  static newStyles(styles=[]){
    return new Styles(styles)
  }

  addStyle(style){
    super.push(style)
  }

  toDXFString(){
    let result = `  2\r\nSTYLE\r\n`;
    result += ` 70\r\n    1\r\n`
    this.forEach(style => {
      result += style.toDXFString()
    })
    return result
  }
}