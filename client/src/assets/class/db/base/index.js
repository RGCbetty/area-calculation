import API from "../../api"

export default class Base extends API{
  static apidb =  `${this.api}/db`

  constructor(){
    super()
  }

  get apidb() {
    return `${this.api}/db`
  }

}