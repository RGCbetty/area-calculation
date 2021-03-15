import Base from "../base";

export default class SiyoDataBroker extends Base{
  constructor(){
    super() 
  }

  async getzumenCode(customerCode){
    try {
      return await this.axios.get(`${this.apidb}/siyodatabroker/getzumencode?customerCode=${customerCode}`)
    } catch (error) {
      return error
    }
  }

}