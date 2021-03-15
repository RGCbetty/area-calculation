import API from "../api"

export default class CSV extends API {

  static apicsv = `${this.api}/csv`

  constructor(){
    super()
    this.values = []
  }

  get apicsv(){
    return `${this.api}/csv`
  }

  asEmpty(){
    this.values = []
  }

  async export(filename, onthisFolderName = ''){
    try {
      return await this.axios.post(`${this.apicsv}/export`, { filename: filename,  data: this.values, foldername: onthisFolderName })
    } catch (err) {
      return err      
    }
  }

  async exportTo(filePath){
    try {
      return await this.axios.post(`${this.apicsv}/exportto`, { filename: filePath,  data: this.values })
    } catch (err) {
      return err      
    }
  }

  static async export(filename, data, onthisFolderName = ''){
    try {
      return await this.axios.post(`${this.apicsv}/export`, { filename: filename,  data: data, foldername: onthisFolderName })
    } catch (err) {
      return err
    }  
  }



}