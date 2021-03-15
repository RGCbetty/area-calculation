const Sections = require('../Section/dxfsections');
const pixelWidth = require('string-pixel-width');
const iconv = require('iconv-lite');

module.exports = class DxfObject{
  constructor(){
    this.sections = new Sections();
    this.file = '';
  }

  toDXFString(){
    let result = this.sections.toDXFString()
    result += `0\r\nEOF\r\n`
    return result;
  }

  exportFile(){
    this.sections.newSection('')
  }

  getTextWidth(text){
    let val = this.activeFontSize;
    let txt = iconv.encode(text, 'cp932');
    return pixelWidth(txt, {size: val})
  }

  set activeLayerName(val){
    this.sections[3].value.activeLayerName = val;
  }

  get activeLayerName(){
    return this.sections[3].value.activeLayerName;
  }

  set activeLineTypeName(val){
    this.sections[3].value.activeLineTypeName = val;
  }

  get activeLineTypeName(){
    return this.sections[3].value.activeLineTypeName;
  }

  set activeColorNumber(val){
    this.sections[3].value.activeColorNumber = val;
  }

  get activeColorNumber(){
    return this.sections[3].value.activeColorNumber;
  }

  set activeFontSize(val){
    this.sections[3].value.activeFontSize = val; 
  }

  get activeFontSize(){
    return this.sections[3].value.activeFontSize;
  }
}