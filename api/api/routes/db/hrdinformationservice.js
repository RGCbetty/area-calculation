const express = require('express')
const router = express.Router()
const HRDInformationService = require('../../class/sql/mssql/hrdsql/hrdinformationservice')
const _ = require('lodash')

router.get('/', (req, res) => {
  res.send({
    method: {
      get: ['getBasicSpecificationDetails?customerCode=value'],
    },
  })
})

router.get('/cadplandetails', async (req, res) => {
  if (_.isEmpty(req.query)) {
    res.status(400).send({
      message: 'Please add query customerCode',
    })
  } else if ('customerCode' in req.query) {
    let hrdInformationService = new HRDInformationService()
    let result = await hrdInformationService.CadPlanDetails(
      req.query.customerCode,
      req.query.revNum,
    )
    res.send(result.recordset)
  }
})

router.get('/getBasicSpecificationDetails?*', async (req, res) => {
  if (_.isEmpty(req.query)) {
    res.status(400).send({
      message: 'Please add query customerCode',
    })
  } else if ('customerCode' in req.query) {
    let hrdInformationService = new HRDInformationService()
    let result = await hrdInformationService.getBasicSpecificationDetails(
      req.query.customerCode,
    )
    res.send(result.recordset)
  }
})

module.exports = router
