import CSV from "..";
import FileSaver from 'file-saver'
import moment from "moment";

export default class AreaCalculationCSV extends CSV{
  
  static apiareacalc = `${this.apicsv}/areacalculation`

  constructor(){
    super()
  }

  get apiDBAreacalculation(){
    return `${this.api}/db/areacalculation`
  }

  // addData(controlNumber, category, mainID, subID, name, value, unit){
  //   this.values.push({
  //     'お客様コード': controlNumber,
  //     '仕様区分': category,
  //     '表示順': mainID,
  //     '共通仕様コード': subID,
  //     '共通仕様名': name,
  //     '採用数値': value,        
  //     '単位': unit
  //   })
  // }
    addData(items){
      items.forEach(item => {
        this.values.push(item)
      })
    }

  async saveAsCouchDB(options){
    try{
      return await this.axios.post(`${this.apiDBAreacalculation}/save`, {
        dateCreated: [moment().year(), moment().month()+1, moment().date(), moment().hours(), moment().minutes(), moment().seconds()], 
        employeeCode: options.employeeCode,
        customerCode: options.controlNumber,
        revCode: options.revCode,
        items: this.values
      })
    }catch(err){
      return err
    }
  }

  async export(controlNumber, folderName = ''){
    try{
      return await super.export(controlNumber + '-Area_Calculation', folderName)
    }catch(err){
      return err
    }
  }

  static async download(controlNumber, folderName = ''){
    try {
      FileSaver.saveAs(`${this.apicsv}/download?foldername=${folderName}&filename=${controlNumber}-Area_Calculation.csv`, `${controlNumber}-Area_Calculation.csv`);
      return {
        status: 200,
        statusText: 'OK'
      }
    } catch (err) {
      return err
    }
  }

}