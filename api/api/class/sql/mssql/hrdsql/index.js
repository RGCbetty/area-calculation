const MSSQL = require('..');

module.exports = class HRDSQL extends MSSQL{
  constructor(options = {database: ''}){
    super('HRDSQL', 'sys-committee', 'h78r78d', options.database);
  }
}