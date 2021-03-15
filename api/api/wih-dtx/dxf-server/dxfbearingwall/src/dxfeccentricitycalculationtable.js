const DxfEccentricityTable = require('./dxfeccentricitytable');
const path = require('path');
const fs = require('fs');

module.exports = class DxfEccentricityCalculationTable extends DxfEccentricityTable{
  constructor(gravityData, rigidityData, eccentricityData){
    super(gravityData, rigidityData, eccentricityData)
    this.cols = [
      2010.83,
      2010.83,
      2010.83,
      2010.83,
      2010.83,
      2010.83,
      2725.21,
      2248.96,
      2010.83,
      2963.33,
      2963.33,
      2010.83,
      2090.21
    ]
  }

  drawEccentricityCalculationTable(){
    this.drawGravityTemplate();
    this.drawRigidityTemplate();
    this.drawEccentricityTemplate();
  }

  exportDXF(tableName, options){
    this.drawEccentricityCalculationTable();

    const filedownload = require('../../../../utils/filedownload');
    filedownload.saveFile(`${options.planInfo.memo1}-${options.planInfo.memo2}-${tableName}.dxf`, this.toDXFString(), options.planInfo.memo1)
  }

}