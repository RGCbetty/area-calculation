import API from "../api"

export default class XLS extends API {

    constructor(){
      super()
      this.values = []
    }

    get apixls(){
      return `${this.api}/xls`
    }

}