const mathEx = require('../../../cadmodule/mathex');
const DxfExcelTable = require('./dxfexceltable');
const numeral = require('numeral');
numeral.defaultFormat('0,0.000');

module.exports = class DxfGravityTable extends DxfExcelTable{
  constructor(gravityData){
    super()
    this.gravityData = gravityData;
  }

  drawGravityTemplate(){
    let floors = this.gravityData.floors;
    
    this.drawGravityTableName();
    this.drawGravityTableHeader();

    for(let i=0; i<floors.length; i++){

      if (floors[i].floorName == '小屋') 
        continue;
      
      let floorTopY = this.currentY;
      
      for (let j=0; j<floors[i].layouts.length; j++){

        this.drawText( 
          this.getCellCenterX(floors[i].layouts[j].num, this.getCellLeft(1), this.cols[1]), 
          this.currentCellMiddleY,
          floors[i].layouts[j].num
        );
        
        this.drawText( 
          this.getCellCenterX(floors[i].layouts[j].formula, this.getCellLeft(2), this.getCellWidth(2,3)), 
          this.currentCellMiddleY,
          floors[i].layouts[j].formula
        );

        this.drawText(
          this.getCellRightX(numeral(mathEx.round(floors[i].layouts[j].ai)).format(), this.getCellLeft(4), this.cols[4]),
          this.currentCellMiddleY,
          numeral(mathEx.round(floors[i].layouts[j].ai)).format()
        );

        this.drawText(
          this.getCellRightX(floors[i].layouts[j].roofB.toFixed(3), this.getCellLeft(5), this.cols[5]),
          this.currentCellMiddleY,
          floors[i].layouts[j].roofB.toFixed(3)
        ); 

        this.drawText(
          this.getCellRightX(numeral(mathEx.round(floors[i].layouts[j].wi)).format(), this.getCellLeft(6), this.cols[6]),
          this.currentCellMiddleY,
          numeral(mathEx.round(floors[i].layouts[j].wi)).format()
        );

        this.drawText(
          this.getCellRightX(numeral(mathEx.round(floors[i].layouts[j].x.axis.centerGravity)).format(), this.getCellLeft(7), this.cols[7]),
          this.currentCellMiddleY,
          numeral(mathEx.round(floors[i].layouts[j].x.axis.centerGravity)).format()
        );

        this.drawText(
          this.getCellRightX(numeral(mathEx.round(floors[i].layouts[j].y.axis.centerGravity)).format(), this.getCellLeft(8), this.cols[8]),
          this.currentCellMiddleY,
          numeral(mathEx.round(floors[i].layouts[j].y.axis.centerGravity)).format()
        );
        
        this.drawText(
          this.getCellRightX( numeral(mathEx.round(floors[i].layouts[j].x.axis.weightXcenter)).format(), this.getCellLeft(9), this.cols[9]),
          this.currentCellMiddleY,
          numeral(mathEx.round(floors[i].layouts[j].x.axis.weightXcenter)).format()
        );

        this.drawText(
          this.getCellRightX(numeral(mathEx.round(floors[i].layouts[j].y.axis.weightXcenter)).format(), this.getCellLeft(10), this.cols[10]),
          this.currentCellMiddleY,
          numeral(mathEx.round(floors[i].layouts[j].y.axis.weightXcenter)).format()
        );

        this.drawLine(this.getCellLeft(1), this.addHeigthtoCurrentY(), this.getCellRight(10), this.currentY);  
 
      }

      this.drawText(
        this.getCellCenterX('計', this.getCellLeft(1), this.cols[1]),
        this.currentCellMiddleY,
        '計'
      );

      let mergeY = floorTopY - (this.currentY - this.defaultRowHeight);

      if (i == 0){
        this.drawText(
          this.getCellRightX(numeral(mathEx.round(this.gravityData.overall_Wi)).format(), this.getCellLeft(6), this.cols[6]),
          this.currentCellMiddleY,
          numeral(mathEx.round(this.gravityData.overall_Wi)).format()
        );
  
        this.drawText(
          this.getCellRightX(numeral(mathEx.round(this.gravityData.overall_Wi_Xi)).format(), this.getCellLeft(9), this.cols[9]),
          this.currentCellMiddleY,
          numeral(mathEx.round(this.gravityData.overall_Wi_Xi)).format()
        );

        this.drawText(
          this.getCellRightX(numeral(mathEx.round(this.gravityData.overall_Wi_Yi)).format(), this.getCellLeft(10), this.cols[10]),
          this.currentCellMiddleY,
          numeral(mathEx.round(this.gravityData.overall_Wi_Yi)).format()
        );

        this.drawText(
          this.getCellCenterX(numeral(mathEx.round(this.gravityData.overall_Gx)).format(), this.getCellLeft(11), this.cols[11]),
          this.getCellCenterY(floorTopY, mergeY),
          numeral(mathEx.round(this.gravityData.overall_Gx)).format()
        );
  
        this.drawText(
          this.getCellCenterX(numeral(mathEx.round(this.gravityData.overall_Gy)).format(), this.getCellLeft(12), this.cols[12]),
          this.getCellCenterY(floorTopY, mergeY),
          numeral(mathEx.round(this.gravityData.overall_Gy)).format()
        );

      }else{
        this.drawText(
          this.getCellRightX(numeral(mathEx.round(floors[i].total_Wi)).format(), this.getCellLeft(6), this.cols[6]),
          this.currentCellMiddleY,
          numeral(mathEx.round(floors[i].total_Wi)).format()
        );

        this.drawText(
          this.getCellRightX(numeral(mathEx.round(floors[i].total_Wi_Xi, 3)).format(), this.getCellLeft(9), this.cols[9]),
          this.currentCellMiddleY,
          numeral(mathEx.round(floors[i].total_Wi_Xi, 3)).format()
        );

        this.drawText(
          this.getCellRightX(numeral(mathEx.round(floors[i].total_Wi_Yi)).format(), this.getCellLeft(10), this.cols[10]),
          this.currentCellMiddleY,
          numeral(mathEx.round(floors[i].total_Wi_Yi)).format()
        );

        this.drawText(
          this.getCellCenterX(numeral(mathEx.round(floors[i].total_Gx)).format(), this.getCellLeft(11), this.cols[11]),
          this.getCellCenterY(floorTopY, mergeY),
          numeral(mathEx.round(floors[i].total_Gx)).format()
        );
  
        this.drawText(
          this.getCellCenterX(numeral(mathEx.round(floors[i].total_Gy)).format(), this.getCellLeft(12), this.cols[12]),
          this.getCellCenterY(floorTopY, mergeY),
          numeral(mathEx.round(floors[i].total_Gy)).format()
        );
      }

      this.drawText(
        this.getCellCenterX(floors[i].floorName, this.getCellLeft(0), this.cols[0]),
        this.getCellCenterY(floorTopY, mergeY),
        floors[i].floorName
      );

      this.drawLine(0, this.addHeigthtoCurrentY(), this.getCellRight(12), this.currentY);
    }

    this.drawLine(0, this.getCellTop(1), 0, this.currentY)
    this.cols.forEach( (width, i) => {
      switch(i){
        case 2:
          break;
        case 7:
        case 9:
        case 11:
          this.drawLine(this.getCellRight(i), this.getCellTop(2), this.getCellRight(i), this.currentY);   
          break;
        default:
          this.drawLine(this.getCellRight(i), this.getCellTop(1), this.getCellRight(i), this.currentY);  
          break; 
      }
        
    })
  }

  drawGravityTableName(){
    this.drawText(this.getCellLeft(0), this.currentCellMiddleY, '重心の計算');
  }

  drawGravityTableHeader(){
    this.drawLine(this.getCellLeft(0), this.addHeigthtoCurrentY(), this.getCellRight(12), this.currentY);

    this.drawText(
      this.getCellCenterX('階', this.getCellLeft(0), this.cols[0]), 
      this.getCellCenterY(this.currentY, this.getMergeHeight(2)), 
      '階'
    );

    this.drawText(
      this.getCellCenterX('No', this.getCellLeft(1), this.cols[1]), 
      this.getCellCenterY(this.currentY, this.defaultRowHeight*2), 
      'No'
    );

    this.drawText(
      this.getCellCenterX('計算式', this.getCellLeft(2), this.getCellWidth(2, 3)), 
      this.getCellCenterY(this.currentY, this.defaultRowHeight*2), 
      '計算式'
    );

    this.drawText(
      this.getCellCenterX('Ai', this.getCellLeft(4), this.cols[4]), 
      this.getCellCenterY(this.currentY, this.defaultRowHeight*2), 
      'Ai'
    );

    this.drawText(
      this.getCellCenterX('β', this.getCellLeft(5), this.cols[5]), 
      this.getCellCenterY(this.currentY, this.defaultRowHeight*2), 
      'β'
    );

    this.drawText(
      this.getCellCenterX('Wi=Ai･β', this.getCellLeft(6), this.cols[6]), 
      this.getCellCenterY(this.currentY, this.defaultRowHeight*2), 
      'Wi=Ai･β'
    );

    this.drawText(
      this.getCellCenterX('重心(m)', this.getCellLeft(7), this.getCellWidth(7, 8)), 
      this.currentCellMiddleY,
      '重心(m)'
    );

    this.drawText(
      this.getCellCenterX('区画重量×重心', this.getCellLeft(9), this.getCellWidth(9, 10)), 
      this.currentCellMiddleY,
      '区画重量×重心'
    );

    this.drawText(
      this.getCellCenterX('重心(m)', this.getCellLeft(11), this.getCellWidth(11, 12)), 
      this.currentCellMiddleY,
      '重心(m)'
    );

    this.drawLine(this.getCellLeft(7), this.addHeigthtoCurrentY(), this.getCellRight(12), this.currentY);
    
    this.drawText(
      this.getCellCenterX('Xi', this.getCellLeft(7), this.cols[7]), 
      this.currentCellMiddleY,
      'Xi'
    );

    this.drawText(
      this.getCellCenterX('Yi', this.getCellLeft(8), this.cols[8]), 
      this.currentCellMiddleY,
      'Yi'
    );

    this.drawText(
      this.getCellCenterX('Wi･Xi', this.getCellLeft(9), this.cols[9]), 
      this.currentCellMiddleY,
      'Wi･Xi'
    );

    this.drawText(
      this.getCellCenterX('Wi･Yi', this.getCellLeft(10), this.cols[10]), 
      this.currentCellMiddleY,
      'Wi･Yi'
    );

    this.drawText(
      this.getCellCenterX('Gx', this.getCellLeft(11), this.cols[11]), 
      this.currentCellMiddleY,
      'Gx'
    );

    this.drawText(
      this.getCellCenterX('Gy', this.getCellLeft(12), this.cols[12]), 
      this.currentCellMiddleY,
      'Gy'
    );
    
    this.drawLine(this.getCellLeft(0), this.addHeigthtoCurrentY(), this.getCellRight(12), this.currentY);  
  }


}