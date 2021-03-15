import axios from 'axios'
//import config from './config.json'

export default class API {
  static axios = axios
  static api = process.env.VUE_APP_URL

  constructor() {
    this.axios = axios
    this.api = process.env.VUE_APP_URL
  }
  get heintsvr() {
    return `${this.api}/heintsvr`
  }
}
