const Text = require('./dxftext');

module.exports = class Texts extends Array{
  constructor(texts =[]){
    super()
    this.addTexts(texts);
  }

  static newTexts(...texts){
    return new Texts(texts);
  }

  addTexts(texts){
    texts.forEach(text => {
      this.addText(Text.newText(text));
    });
  }

  addText(text){
    super.push(text);
  }

  toDXFString(){
    let result = '';
    this.forEach(text => {
      result += text.toDXFString();
    })
    return result;
  }

  draw(x1, y1, value, layerName, colorNumber, thickness = 1, height = 388, rotation = 0, textStyle = 'STANDARD'){
    this.addText( Text.draw(x1, y1, value, layerName, colorNumber, thickness, height, rotation, textStyle))
  }

}