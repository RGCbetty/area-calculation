const DTXTateguProperty = require('./dtxtateguproperty');
const tables = require('./dtxtategutables');

module.exports = class extends DTXTateguProperty{
  constructor(){
    super()
    
    this.renmado = '';
    this.areaOpening = [];
  }

  assign(row, data, csv, ln){
    this.addCommonProperty(row, data, csv, ln);
    this.renmado = csv.cells(row, 46);

    if (this.name !== ''){

      if (this.renmado === '') {
        this.areaOpening.push( tables.getAreaOpening( this.name.substr(0, 2), this.name.substr(2, 2) ) )  
      }else{
        let xValue = Number( this.renmado.split('×')[1] )

        let area = tables.getAreaOpening( this.name.substr(0, 2), this.name.substr(2, 2) )

        for (let x = 0; x < xValue; x++ ){
          this.areaOpening.push( area ); 
        }

      }
      
    }
    
  }
  
}