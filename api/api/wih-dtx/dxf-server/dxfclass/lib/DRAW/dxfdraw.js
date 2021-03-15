const DxfObject = require('../SRC/dxfobject');

module.exports = class DxfDraw extends DxfObject{
  constructor(){
    super()
  }

  drawLine(x1, y1, x2, y2){
    this.sections[3].value.drawLine(x1, y1, x2, y2)
  }

  drawPoint(x1, y1){
    this.sections[3].value.drawPoint(x1, y1)
  }

  drawText(x1, y1, value){
    this.sections[3].value.drawText(x1, y1, value);
  }


}