const CSVFile = require('./csvfile');

module.exports = class CSVTateguHrd extends CSVFile{
  constructor(){
    super()
  }  

  loadFromArchServer(filename){
    const PATH = '\\\\arch-svr.hrd-s.com\\SHIYOUSHO\\Import_WIH\\SEKISAN_CSV_BACKUP\\';
    let filepath = PATH + filename + '-建具関連(HRD).csv';
    
    if (this.isFileExists(filepath)){
      this.loadFromFile(filepath);
      return true
    }else{
      return false
    }
    
  }

}
