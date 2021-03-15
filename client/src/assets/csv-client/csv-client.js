import CSVBase from './csv-base'
import FileSaver from 'file-saver'

export default class CSVClient extends CSVBase{
  constructor () {
    super()
    this.values = []
  }
  
  sampleOnly(){
    console.log('sample')
  }
  
  exportToCSV(filename, data, onthisFolderName = ''){
    console.log(data)
    return new Promise( (resolve, reject ) => {
      this.axios.post(`${this.CSVapiURL}/exportingToCSV`, { filename: filename,  data: data, foldername: onthisFolderName })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  }

  downloadCSV(options){
    return new Promise( (resolve, reject ) => {
      this.axios.get(`${this.CSVapiURL}/download/${options.foldername}/${options.filename}`)
      .then( res => {
        console.debug(res)
        FileSaver.saveAs(`${this.CSVapiURL}/download/${options.foldername}/${options.filename}`, `${options.filename}.csv`);
        resolve(true)
      })

      .catch( err => {
        reject(err)
      })
    })
   
  }

  loadFromServer(controlNumber){
    return new Promise ( (resolve, reject) => {
      this.axios.get(`${this.CSVapiURL}/importDataFromCSV/${controlNumber}`)
      .then(res => {
        this.values = res.data
        // console.log(this.values)
        resolve(true)
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}
