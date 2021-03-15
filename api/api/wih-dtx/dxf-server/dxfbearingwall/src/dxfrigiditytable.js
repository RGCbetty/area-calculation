const DxfGravityTable = require('./dxfgravitytable');
const mathEx = require('../../../cadmodule/mathex');
const numeral = require('numeral');
numeral.defaultFormat('0,0.000');

module.exports = class DxfRigidityTable extends DxfGravityTable{
  constructor(gravityData, rigidityData){
    super(gravityData);
    this.rigidityData = rigidityData;
    this.rigidityTableTop = 0;
  }

  drawRigidityTemplate(){
    this.drawRigidityTableName()
    this.drawRigidityTableHeader('Y', 'x');
    this.drawFromAxis('x');
    this.drawRigidityTableHeader('X', 'y');
    this.drawFromAxis('y');
    this.drawRigidityColumns();
  }

  drawRigidityColumns(){
    this.drawLine(this.getCellLeft(0), this.rigidityTableTop, this.getCellLeft(0), this.currentY);
    for(let i=0; i<=9; i++){
      switch(i){
        case 3:
        case 4:
          break;
        default:
          this.drawLine(this.getCellRight(i), this.rigidityTableTop, this.getCellRight(i), this.currentY);
          break;
      } 
    }
    this.drawLine(this.getCellLeft(0), this.currentY, this.getCellRight(9), this.currentY);
  }

  drawFromAxis(axis){
    let floors = this.rigidityData[axis].floors;
    let axisTopY = this.currentY;

    // floors.forEach(floor => {

    for (let floor of floors ) {

      if (floor.floorName == '小屋') continue; 
        
      let floorTopY = this.currentY;


      this.drawLine(this.getCellLeft(2), this.currentY, this.getCellRight(7), this.currentY);
      this.drawLine(this.getCellLeft(9), this.currentY, this.getCellRight(9), this.currentY); 
      
      floor.coordinateList.forEach(coordinate => {
        
        this.drawText( 
          this.getCellCenterX(coordinate.coordinateNum.toFixed(1), this.getCellLeft(2), this.cols[2]), 
          this.currentCellMiddleY,
          coordinate.coordinateNum.toFixed(1)
        );

        this.drawText( 
          this.getCellCenterX(coordinate.formula, this.getCellLeft(3), this.getCellWidth(3, 4)), 
          this.currentCellMiddleY,
          coordinate.formula
        );

        this.drawText(
          this.getCellRightX(numeral(mathEx.round(coordinate.lxi)).format(), this.getCellLeft(5), this.cols[5]),
          this.currentCellMiddleY,
          numeral(mathEx.round(coordinate.lxi)).format()
        );

        this.drawText(
          this.getCellRightX(numeral(mathEx.round(coordinate.yi, 3)).format(), this.getCellLeft(6), this.cols[6]),
          this.currentCellMiddleY,
          numeral(mathEx.round(coordinate.yi, 3)).format()
        );

        this.drawText(
          this.getCellRightX(numeral(mathEx.round(coordinate.lxi_yi)).format(), this.getCellLeft(7), this.cols[7]),
          this.currentCellMiddleY,
          numeral(mathEx.round(coordinate.lxi_yi)).format()
        );

        this.drawText(
          this.getCellRightX(numeral(mathEx.round(coordinate.lxiyisy2)).format(), this.getCellLeft(9), this.cols[9]),
          this.currentCellMiddleY,
          numeral(mathEx.round(coordinate.lxiyisy2)).format()
        );

        this.drawLine(this.getCellLeft(2), this.addHeigthtoCurrentY(), this.getCellRight(7), this.currentY);
        this.drawLine(this.getCellLeft(9), this.currentY, this.getCellRight(9), this.currentY);
        
      })

      this.drawText( 
        this.getCellCenterX('計', this.getCellLeft(2), this.cols[2]), 
        this.currentCellMiddleY,
        '計'
      );

      this.drawText(
        this.getCellRightX(numeral(mathEx.round(floor.lxiSum)).format(), this.getCellLeft(5), this.cols[5]),
        this.currentCellMiddleY,
        numeral(mathEx.round(floor.lxiSum)).format()
      );

      this.drawText(
        this.getCellRightX(numeral(mathEx.round(floor.lxi_yiSum)).format(), this.getCellLeft(7), this.cols[7]),
        this.currentCellMiddleY,
        numeral(mathEx.round(floor.lxi_yiSum)).format()
      );

      this.drawText(
        this.getCellRightX(numeral(mathEx.round(floor.lxiyisy2Sum)).format(), this.getCellLeft(9), this.cols[9]),
        this.currentCellMiddleY,
        numeral(mathEx.round(floor.lxiyisy2Sum)).format()
      );

      this.drawText(
        this.getCellCenterX(floor.floorName, this.getCellLeft(1), this.cols[1]),
        this.getCellCenterY(floorTopY, floorTopY - this.currentY),
        floor.floorName.toUpperCase()
      );

      let sy = 0
      if (floor.coordinateList.length > 0)
        sy = floor.coordinateList[0].sy
      this.drawText(
        this.getCellCenterX(numeral(sy).format(), this.getCellLeft(8), this.cols[8]),
        this.getCellCenterY(floorTopY, floorTopY - this.currentY),
        numeral(sy).format()
      );

      this.drawLine(this.getCellLeft(1), this.addHeigthtoCurrentY(), this.getCellRight(9), this.currentY);
    };

    this.drawText(
      this.getCellCenterX(axis.toUpperCase(), this.getCellLeft(0), this.cols[0]),
      this.getCellCenterY(axisTopY, axisTopY - (this.currentY - this.defaultRowHeight)),
      axis.toUpperCase()
    );

    this.drawLine(this.getCellLeft(5), axisTopY, this.getCellLeft(5), this.currentY);

  }

  drawRigidityTableName(){
    this.addHeigthtoCurrentY()
    this.drawText(this.getCellLeft(0), this.currentCellMiddleY, '剛心の計算');
    this.addHeigthtoCurrentY()
    this.rigidityTableTop = this.currentY;
  }

  drawRigidityTableHeader(mainAxis, subAxis){
    this.drawLine(this.getCellLeft(0), this.currentY, this.getCellRight(9), this.currentY);

    this.drawText(
      this.getCellCenterX('方向', this.getCellLeft(0), this.cols[0]), 
      this.getCellCenterY(this.currentY, this.getMergeHeight(2)), 
      '方向'
    );

    this.drawText(
      this.getCellCenterX('階', this.getCellLeft(1), this.cols[1]), 
      this.getCellCenterY(this.currentY, this.getMergeHeight(2)), 
      '階'
    );

    this.drawText(
      this.getCellCenterX('通り', this.getCellLeft(2), this.cols[2]), 
      this.getCellCenterY(this.currentY, this.getMergeHeight(2)), 
      '通り'
    );

    this.drawText(
      this.getCellCenterX('存在長Lxi（m）', this.getCellLeft(3), this.getCellWidth(3, 5)), 
      this.getCellCenterY(this.currentY, this.getMergeHeight(2)), 
      '存在長Lxi（m）'
    );

    this.drawText(
      this.getCellCenterX(`${mainAxis}i`, this.getCellLeft(6), this.cols[6]), 
      this.getCellCenterY(this.currentY, this.getMergeHeight(2)), 
      `${mainAxis}i`
    );

    this.drawText(
      this.getCellCenterX(`L${subAxis}i・${mainAxis}i`, this.getCellLeft(7), this.cols[7]), 
      this.getCellCenterY(this.currentY, this.getMergeHeight(2)), 
      `L${subAxis}i・${mainAxis}i`
    );

    this.drawText(
      this.getCellCenterX(`剛心(m)`, this.getCellLeft(8), this.cols[8]), 
      this.currentCellMiddleY,
      `剛心(m)`
    );

    this.drawText(
      this.getCellCenterX(`L${subAxis}i×(${mainAxis}i-S${mainAxis.toLowerCase()})2`, this.getCellLeft(9), this.cols[9]), 
      this.getCellCenterY(this.currentY, this.getMergeHeight(2)), 
      `L${subAxis}i×(${mainAxis}i-S${mainAxis.toLowerCase()})2`
    );

    this.drawLine(this.getCellLeft(8), this.addHeigthtoCurrentY(), this.getCellRight(8), this.currentY);

    this.drawText(
      this.getCellCenterX(`S${mainAxis.toLowerCase()}`, this.getCellLeft(8), this.cols[8]), 
      this.currentCellMiddleY,
      `S${mainAxis.toLowerCase()}`
    );

    this.drawLine(this.getCellLeft(0), this.addHeigthtoCurrentY(), this.getCellRight(9), this.currentY);
  }

}