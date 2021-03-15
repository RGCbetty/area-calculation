const express = require('express')
const router = express.Router()

router.use('/solartable', require('./solartable'))
 
router.get('/', (req,res) => {
  res.send({url: [
    'solartable',
  ]})
})

module.exports = router;
