const DxfFile = require('../../dxfclass');
const mathEx = require('../../../cadmodule/mathex')

module.exports = class DxfExcelTable extends DxfFile{
  constructor(){
    super()
    
    this.defaultRowHeight = 476.21;
    this.defaultColHeight = 2010.83;
    this.currentY = 0;
    this.currentX = 0;
    this.rows = [];
    this.cols = [];
  }

  addWidthtoCurrentX(width){
    this.currentX += width
    return this.currentX
  }

  addHeigthtoCurrentY(){
    this.currentY -= this.defaultRowHeight
    this.rows.push(this.defaultRowHeight)
    return this.currentY
  }

  getMergeHeight(rowCount){
    return this.defaultRowHeight*rowCount
  }

  getCellTop(rows){
    let diff = 0;
    for (let i=0; i < rows; i++){
      diff -= this.rows[i]  
    }
    return diff
  }

  getCellLeft(cols){
    let sum = 0;
    for (let i=0; i<cols; i++){
      sum += this.cols[i]   
    }
    return sum
  }

  getCellRight(cols){
    let sum = 0
    for (let i=0; i<=cols; i++){
      sum += this.cols[i]   
    }
    return sum
  }

  getCellWidth(fromCell, toCell){
    let sum = 0;
    for (let i=fromCell; i<=toCell; i++){
      sum += this.cols[i]
    }
    return sum
  }

  getCellCenterX(txt, cellLeft, cellWidth){
    let cellMiddle = cellWidth / 2;
    let textMiddle = this.getTextWidth(txt) / 2;
    let diff = cellMiddle - textMiddle;
    return (cellLeft + diff)
  }

  getCellRightX(txt, cellLeft, cellWidth){
    let cellRight = cellLeft + cellWidth;
    let textRight = this.getTextWidth(txt);
    return (cellRight - textRight);
  }

  getCellCenterY(cellTop, cellHeight){
    let cellMiddle = cellHeight / 2;
    return (cellTop - cellMiddle);
  }

  get currentCellMiddleY(){
    let result = this.currentY - (this.defaultRowHeight/2)
    return result
  }

  exportDXF(){

  }


}