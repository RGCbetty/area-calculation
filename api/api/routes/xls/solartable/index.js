const express = require('express')
const router = express.Router()
const _ = require('lodash')

router.get('/', (req, res) => {
  res.send({
    method: {
      get: ['getKw?customerCode=@value'],
    },
  })
})

router.get('/getKw', (req, res) => {
  if (_.isEmpty(req.query)) {
    res.status(400).send({
      message: 'Please add query customerCode',
    })
  } else if ('customerCode' in req.query) {
    const SolarTable = require('../../../class/excel/xlsx/solartable')
    let solartable = new SolarTable()
    if (solartable.loadFromSolarTableServer(req.query.customerCode)) {
      res.send(solartable.getKwValue())
    } else {
      res.send({
        message: 'Solar table not found',
      })
    }
  }
})

module.exports = router
