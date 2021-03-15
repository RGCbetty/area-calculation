const express = require('express');
const router = express.Router();

const nanodb = require('./nanodb');

router.get('/', (req, res) => {
  res.send({
    method: {
      get: [
        'getBasicSpecificationDetails?customerCode=value'
      ]
    }
  })
})

router.get('/')

module.exports = router;