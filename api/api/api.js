const express = require('express')
const router = express.Router()
const config = require('../config')

router.use(require('cors')())
router.use(express.json({ limit: '50mb' }))
router.use(express.urlencoded({ limit: '50mb', extended: false }))

router.use('/dtx', require('./routes/dtx'))
router.use(config.api.dxf, require('./routes/dxf'))
router.use('/csv', require('./routes/csv'))
router.use('/download', require('./routes/download'))
router.use('/xls', require('./routes/xls'))
router.use('/db', require('./routes/db'))
router.use('/heintsvr', require('./routes/heintsvr'))

router.get('/', (req, res) => {
  res.send({
    url: ['dtx', 'dxfapi', 'csv', 'download', 'xls', 'db', 'heintsvr'],
  })
})

module.exports = router
