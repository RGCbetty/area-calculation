const express = require('express')
const router = express.Router()

const cors = require('cors')
router.use(cors())

const WIHdtx = require('../wih-dtx')

const loadFromShiyoushoServer = '/loadFromShiyoushoServer'
const loadFromUploadFile = '/loadFromUploadFile'
const fileupload = require('../utils/fileupload')

const loadDTX = (req, res) => {
  let dtx = new WIHdtx(req.body.options)
  let msg = ''

  switch (req.route.path) {
    case loadFromShiyoushoServer:
      if (!dtx.loadFromShiyoushoServer()) {
        msg = 'dtx file not found in server'
      }

      break
    case loadFromUploadFile:
      dtx.loadFromUploadFile(req.file)
      break
  }

  if (msg) {
    res.json({
      message: msg,
    })
  } else {
    res.send(dtx)
  }
}

router.post(loadFromShiyoushoServer, loadDTX)
router.post(loadFromUploadFile, fileupload.single('file'), loadDTX)

router.get('/', (req, res) => {
  res.send('sample')
})

module.exports = router
