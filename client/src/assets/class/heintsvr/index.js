import API from "../api";

export default class Heintsvr extends API{
  constructor(){
    super()
  }
  async save(payload){
    try{
     return await this.axios.post(`${this.heintsvr}/save`, payload)
    } catch(err) {
      return err
    }
  }
}