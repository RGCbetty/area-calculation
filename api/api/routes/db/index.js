const express = require('express')
const router = express.Router()

router.use('/areacalculation', require('./areacalculation'));
router.use('/masterlist', require('./masterlist/auth/routes'));
router.use('/siyodatabroker', require('./siyodatabroker'));
router.use('/hrdinformationservice', require('./hrdinformationservice'));

router.get('/', (req,res) => {
  res.send({url: [
    'areacalculation',
    'masterlist',
    'siyodatabroker',
    'hrdinformationservice'
  ]})
})

module.exports = router