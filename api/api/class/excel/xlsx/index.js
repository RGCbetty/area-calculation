const fs = require('fs')

module.exports = class XLSX{
  constructor(){
    this.xlsx = require('xlsx');
    this.workbook = null;
  }

  loadFromFile(filePath){
    if( fs.existsSync( filePath ) ){
      this.workbook = this.xlsx.readFile(filePath)
      return true
    }else
      return false
  }
}