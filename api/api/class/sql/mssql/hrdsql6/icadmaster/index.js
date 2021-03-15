const HRDSQL6 = require('../index');

module.exports = class ICADMaster extends HRDSQL6 {
  constructor(){
    super()
    this.database = 'icadmaster'
  }

  

}

const HRDSQL2 = require('../index');

module.exports = class SiyoDataBroker extends HRDSQL2 {
  constructor(){
    super({database: 'icadmaster'})
  }

  async getZumenCode(customerCode){
    this.fields.push('zumenCode');
    this.table = 'dbo.tbl_siyo_boss';
    this.whereCondition = `customerCode = '${customerCode}' ORDER BY siyoCode DESC`;
    return await this.select()
  }

}