const XLSX = require('../index')

const monthToString = (val) => {
  switch(val) {
    case 1:
      return '01 JANUARY'
    case 2:
      return '02 FEBRUARY'
    case 3:
      return '03 MARCH'
    case 4:
      return '04 APRIL'
    case 5:
      return '05 MAY'
    case 6:
      return '06 JUNE'
    case 7:
      return '07 JULY'
    case 8:
      return '08 AUGUST'
    case 9:
      return '09 SEPTEMBER'
    case 10:
      return '10 OCTOBER'
    case 11:
      return '11 NOVEMBER'
    case 12:
      return '12 DECEMBER'
    default:
      return 'ERROR'
  }
};

module.exports = class SolarTable extends XLSX{
  constructor(){
    super()
    this.sheet = null;
  }

  getKwValue(){
    let address_of_cell = 'B7';
    let temp_address_of_cell = 'B6';
    let temp_cell = 'A7'
    let worksheet = this.workbook.Sheets[this.sheet];
    let desired_cell = worksheet[address_of_cell];
    let temp_selected_cell = worksheet[temp_cell]
    let temp_desired_cell = worksheet[temp_address_of_cell]
    let desired_value = (temp_selected_cell.v == 'TOTAL' ? desired_cell.v : temp_desired_cell.v);
    return desired_value
  }

  loadFromSolarTableServer(controlNumber){

    let controlNum = controlNumber.split('-', 4)
    let index2 = controlNum[2].padStart(2,'0')
    let index3 = ''

    // let temp_index3 = controlNum[3].padStart(3,'0')
    if (controlNum[3].length === 1){
      index3 = controlNum[3].padStart(2,'0')  

    }else if(controlNum[3].length === 2){
      if ( isNaN( Number(controlNum[3]) ) ){
        index3 = controlNum[3].padStart(3,'0')
      }else{
        index3 = controlNum[3]
      }
    }else{
      index3 = controlNum[3]    
    }
      
    controlNum.splice(-2, 2, index2, index3)
    
    let val = controlNum.slice(0, 3).join("-") + controlNum[3];

    const dateToday = new Date();
    let day = dateToday.getDate();
    let month = dateToday.getMonth() + 1;
    let year = dateToday.getFullYear()

    let currentdd = day;
    let currentmm = month;
    let found = false;

    for(;year >= 2018;){

      for(;currentmm >= 1;){
        
        for(;currentdd >= 1;){
          
          let daytoStr = String(currentdd).padStart(2,'0');
          let filePath = `\\\\Cadtsv01\\finished_plans\\i-SOLAR_PDF&EXCEL\\${year.toString()}\\${monthToString(currentmm)} ${year.toString()}\\${daytoStr}\\${val}.xls`
          
          found = this.loadFromFile(filePath)
          
          if( found ){
            this.sheet = this.workbook.SheetNames[0]
            return found
          } 
          currentdd -= 1;
        }

        if (found) break;
        currentdd = 31;
        currentmm -= 1;

      }

      if(found)break;
      currentmm = 12;
      year -= 1;

    }

    return found

  }

}