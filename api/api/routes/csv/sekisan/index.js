const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.get('/', (req,res) => {
  res.send({
    method: {
      get: [
        'getCommonArea'
      ]
    }
  })
})

router.get('/getCommonArea?*', (req, res) => {
  
  if ( _.isEmpty(req.query) ){
    res.status(400).send({
      message: 'Please add query customerCode'
    });
  }else if ('customerCode' in req.query){
    
    const SekisanCSV = require('../../../class/csv/sekisan')
    let sekisancsv = new SekisanCSV;
    if ( sekisancsv.loadFromArchServer(req.query.customerCode) ){
      res.send(sekisancsv.getCommonArea()) 
    }
      
    else{
      res.status(400).send({
        message: 'No Found'
      });
    }
  }
})


module.exports = router;