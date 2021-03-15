import axios from 'axios'
import config from './config'

export default class CSVBase {
  constructor(){
    this.axios = axios
    this.server = process.env.VUE_APP_DOMAIN
  }
  get CSVapiURL(){
    return `${this.apiName}${config.api.csv}`
  }

  get apiName(){
    return process.env.VUE_APP_URL
  }
}