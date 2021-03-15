const CSVTateguHrd = require('./csvtateguhrd')

module.exports = class CSVSekisanHrd extends CSVTateguHrd{
  constructor(){
    super()
  }  

  loadSekisanFromArchServer(filename){
    const PATH = '\\\\arch-svr.hrd-s.com\\SHIYOUSHO\\Import_WIH\\SEKISAN_CSV_BACKUP\\';
    let filepath = PATH + filename + '.csv';
    
    if (this.isFileExists(filepath)){
      this.loadFromFile(filepath);
      return true
    }else{
      return false
    }
    
  }

}