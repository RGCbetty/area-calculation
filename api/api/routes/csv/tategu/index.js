const express = require('express');
const router = express.Router();
const _ = require('lodash');

router.get('/', (req,res) => {
  res.send({
    method: {
      get: [
        'loadFromArchServer?customerCode=@value'
      ]
    }
  })
})

router.get('/loadFromArchServer?*', (req, res) => {
  
  if ( _.isEmpty(req.query) ){
    res.status(400).send({
      message: 'Please add query customerCode'
    });
  }else if ('customerCode' in req.query){
    
    const TateguCSV = require('../../../class/csv/tategu');
    let tategucsv = new TateguCSV;
    
    if ( tategucsv.loadFromArchServer(req.query.customerCode) ){
      res.send( tategucsv.values )
    }
      
    else{
      res.status(400).send({
        message: 'No Found'
      });
    }
  }

})


module.exports = router;