const express = require('express')
const router = express.Router()
const SiyoDataBroker = require('../../class/sql/mssql/hrdsql2/siyodatabroker')
const _ = require('lodash');

router.get('/getZumenCode?*', async (req, res) => {
  if ( _.isEmpty(req.query) ){
    res.status(400).send({
      message: 'Please add query customerCode'
    });
  }else if ('customerCode' in req.query){
    let siyoDataBroker = new SiyoDataBroker;
    let result = await siyoDataBroker.getZumenCode(req.query.customerCode)
    res.send(result.recordset)
  }
  
})

module.exports = router;