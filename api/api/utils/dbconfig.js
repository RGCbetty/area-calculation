const nano = require('nano')
const dotenv = require('dotenv')
const sql = require('mssql')

dotenv.config()

const connect = function () {
  const conn = new sql.ConnectionPool({
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    options: {
      enableArithAbort: false,
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
  })
  return conn
}

// const nanoHRdApps50 = require('nano') ('http://hrdapps50:5984')
// const areaCalculation = nanoHRdApps50.db.use('dtx_area_calculation')
const area_calculation = nano(`${process.env.DB_URL}`).db.use(
  `${process.env.DB_NAME}`,
)
const master_list = nano(`${process.env.MASTERLIST_URL}`).db.use(
  `${process.env.MASTERLIST_DB}`,
)
// const delphiLisense = nanoLocalHost.db.use('delphi_license')

module.exports = {
  area_calculation,
  master_list,
  connect,
  // delphiLisense,
}
