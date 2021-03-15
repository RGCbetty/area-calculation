const nano = require('nano')

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
  // delphiLisense,
}
