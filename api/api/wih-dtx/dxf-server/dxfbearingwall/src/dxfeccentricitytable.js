const DxfRigidityTable = require('./dxfrigiditytable');
const mathEx = require('../../../cadmodule/mathex');

module.exports = class DxfEccentricityTable extends DxfRigidityTable{
  constructor(gravityData, rigidityData, eccentricityData){
    super(gravityData, rigidityData);
    this.eccentricityData = eccentricityData;
    this.eccentricityTableTop = 0;
  }

  drawEccentricityTemplate(){
    this.drawEccentricityTableName();
    this.drawEccentricityTableHeader();
    this.drawBody();
    this.drawEccentricityColumns();
    this.drawEccentricityFormula()
  }

  drawEccentricityFormula(){
    this.drawText(
      this.getCellLeft(0), 
      this.currentCellMiddleY, 
      'Kr=Lxi×(Yi-Sy)2 + Lyi×(Xi-Sx)2'
    );

    this.addHeigthtoCurrentY()
    this.drawText(
      this.getCellLeft(0), 
      this.currentCellMiddleY, 
      'R=Kr/存在長'
    );

    this.addHeigthtoCurrentY()
    this.drawText(
      this.getCellLeft(0), 
      this.currentCellMiddleY, 
      'L=|G-S|'
    );

    this.addHeigthtoCurrentY()
    this.drawText(
      this.getCellLeft(0), 
      this.currentCellMiddleY, 
      'E=L/R'
    );
  }

  drawEccentricityTableName(){
    this.addHeigthtoCurrentY()
    this.drawText(this.getCellLeft(0), this.currentCellMiddleY, '偏心率の計算');
    this.addHeigthtoCurrentY()
    this.eccentricityTableTop = this.currentY;
  }

  drawEccentricityTableHeader(){

    this.drawLine(this.getCellLeft(0), this.currentY, this.getCellRight(8), this.currentY);

    this.drawText(
      this.getCellCenterX('重心', this.getCellLeft(2), this.cols[2]), 
      this.currentCellMiddleY, 
      '重心'
    );

    this.drawText(
      this.getCellCenterX('剛心', this.getCellLeft(3), this.cols[3]), 
      this.currentCellMiddleY, 
      '剛心'
    );

    this.drawText(
      this.getCellCenterX('弾力半径', this.getCellLeft(5), this.cols[5]), 
      this.currentCellMiddleY, 
      '弾力半径'
    );

    this.drawText(
      this.getCellCenterX('偏心距離', this.getCellLeft(6), this.cols[6]), 
      this.currentCellMiddleY, 
      '偏心距離'
    );

    this.drawText(
      this.getCellCenterX('偏心率', this.getCellLeft(7), this.cols[7]), 
      this.currentCellMiddleY, 
      '偏心率'
    );

    this.addHeigthtoCurrentY()
    this.drawText(
      this.getCellCenterX('階', this.getCellLeft(0), this.cols[0]), 
      this.currentCellMiddleY, 
      '階'
    );

    this.drawText(
      this.getCellCenterX('方向', this.getCellLeft(1), this.cols[1]), 
      this.currentCellMiddleY, 
      '方向'
    );

    this.drawText(
      this.getCellCenterX('G', this.getCellLeft(2), this.cols[2]), 
      this.currentCellMiddleY, 
      'G'
    );

    this.drawText(
      this.getCellCenterX('S', this.getCellLeft(3), this.cols[3]), 
      this.currentCellMiddleY, 
      'S'
    );

    this.drawText(
      this.getCellCenterX('Kr', this.getCellLeft(4), this.cols[4]), 
      this.currentCellMiddleY, 
      'Kr'
    );

    this.drawText(
      this.getCellCenterX('R', this.getCellLeft(5), this.cols[5]), 
      this.currentCellMiddleY, 
      'R'
    );

    this.drawText(
      this.getCellCenterX('L', this.getCellLeft(6), this.cols[6]), 
      this.currentCellMiddleY, 
      'L'
    );

    this.drawText(
      this.getCellCenterX('E', this.getCellLeft(7), this.cols[7]), 
      this.currentCellMiddleY, 
      'E'
    );

    this.drawText(
      this.getCellCenterX('判定', this.getCellLeft(8), this.cols[8]), 
      this.currentCellMiddleY, 
      '判定'
    );

    this.addHeigthtoCurrentY()

    this.drawText(
      this.getCellCenterX('(m)', this.getCellLeft(2), this.cols[2]), 
      this.currentCellMiddleY, 
      '(m)'
    );

    this.drawText(
      this.getCellCenterX('(m)', this.getCellLeft(3), this.cols[3]), 
      this.currentCellMiddleY, 
      '(m)'
    );

    this.drawText(
      this.getCellCenterX('(m)', this.getCellLeft(5), this.cols[5]), 
      this.currentCellMiddleY, 
      '(m)'
    );

    this.drawText(
      this.getCellCenterX('(m)', this.getCellLeft(6), this.cols[6]), 
      this.currentCellMiddleY, 
      '(m)'
    );
    
    this.drawLine(this.getCellLeft(0), this.addHeigthtoCurrentY(), this.getCellRight(8), this.currentY); 
  }

  drawBody(){
    let floors = this.eccentricityData.floors;
    for(let i=floors.length-1; i>=0; i--){
      let floor = floors[i];

      if (floor.floorName == '小屋') continue;

      let floorTopY = this.currentY;

      this.addValueFromAxis(floor.x)
      this.drawLine(this.getCellLeft(1), this.addHeigthtoCurrentY(), this.getCellRight(8), this.currentY); 

      this.addValueFromAxis(floor.y)
      this.drawLine(this.getCellLeft(0), this.addHeigthtoCurrentY(), this.getCellRight(8), this.currentY); 

      this.drawText(
        this.getCellCenterX(floor.floorName, this.getCellLeft(0), this.cols[0]),
        this.getCellCenterY(floorTopY, floorTopY - this.currentY),
        floor.floorName
      );
     
          
    }
  }

  addValueFromAxis(axis){

    
    this.drawText(
      this.getCellCenterX(axis.axisName, this.getCellLeft(1), this.cols[1]),
      this.currentCellMiddleY, 
      axis.axisName
    );

    this.drawText(
      this.getCellRightX(mathEx.round(axis.centerGravity_G, 3).toFixed(3), this.getCellLeft(2), this.cols[2]),
      this.currentCellMiddleY,
      mathEx.round(axis.centerGravity_G, 3).toFixed(3)
    );

    this.drawText(
      this.getCellRightX(mathEx.round(axis.rigidity_S, 3).toFixed(3), this.getCellLeft(3), this.cols[3]),
      this.currentCellMiddleY,
      mathEx.round(axis.rigidity_S, 3).toFixed(3)
    );

    if (axis.axisName == 'Y') 
      axis.kr = 0

    this.drawText(
      this.getCellRightX(mathEx.round(axis.kr, 3).toFixed(3), this.getCellLeft(4), this.cols[4]),
      this.currentCellMiddleY,
      mathEx.round(axis.kr, 3).toFixed(3)
    );

    this.drawText(
      this.getCellRightX(mathEx.round(axis.elasticRadius_R, 3).toFixed(3), this.getCellLeft(5), this.cols[5]),
      this.currentCellMiddleY,
      mathEx.round(axis.elasticRadius_R, 3).toFixed(3)
    );

    let eccentricDistance_L = mathEx.round(axis.eccentricDistance_L, 3).toFixed(3)
    if (eccentricDistance_L == 'NaN')
    eccentricDistance_L = '0.000';

    this.drawText(
      this.getCellRightX(eccentricDistance_L, this.getCellLeft(6), this.cols[6]),
      this.currentCellMiddleY,
      eccentricDistance_L
    );

    let eccentricity_E = mathEx.round(axis.eccentricity_E, 3).toFixed(3)
    if (eccentricity_E == 'NaN')
      eccentricity_E = '0.000';  
      
    this.drawText(
      this.getCellRightX(eccentricity_E, this.getCellLeft(7), this.cols[7]),
      this.currentCellMiddleY,
      eccentricity_E
    );

    this.drawText(
      this.getCellCenterX(axis.judgement, this.getCellLeft(8), this.cols[8]),
      this.currentCellMiddleY,
     axis.judgement
    );

  }

  drawEccentricityColumns(){
    this.drawLine(this.getCellLeft(0), this.eccentricityTableTop, this.getCellLeft(0), this.currentY);
    for(let i=0; i<=8; i++){
      this.drawLine(this.getCellRight(i), this.eccentricityTableTop, this.getCellRight(i), this.currentY);
    }
  }
}