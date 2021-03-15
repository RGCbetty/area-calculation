const MSSQL = require('..');

module.exports = class HRDSQL2 extends MSSQL{
  constructor(options = {database: ''}){
    super('HRDSQL2', 'sys-committee', 'h78r78d', options.database);
  }

  
}