const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.get('/', (req, res) => {
  res.send('masterlist')
})

router.post('/auth/login', controller.signin)

router.get('/auth/validate', controller.validate)

module.exports = router
