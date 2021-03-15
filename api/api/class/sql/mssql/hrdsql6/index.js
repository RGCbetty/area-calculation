const MSSQL = require('..');

module.exports = class HRDSQL6 extends MSSQL{
  constructor(options = {database: ''}){
    super('HRDSQL6', 'sys-committee', 'h78r78d', options.database);
  }
}