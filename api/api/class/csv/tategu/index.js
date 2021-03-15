const CSV = require('../index');


module.exports = class TateguCSV extends CSV{
  constructor(){
    super()
  }
  
  loadFromArchServer(controlNumber){
    const C_PATH = '\\\\arch-svr.hrd-s.com\\SHIYOUSHO\\Import_WIH\\SEKISAN_CSV_BACKUP\\';
    let filepath = C_PATH + controlNumber + '-建具関連(HRD).csv';
    
    if ( this.loadFromFile(filepath) ){
      return true
    }else{
      return false
    }
    
  }

}
