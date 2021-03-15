const express = require('express')
const app = express()
const os = require('os')
const hostname = os.networkInterfaces().Ethernet
require('dotenv').config({})
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}.local` })

app.use(require('cors')())
app.set('trust proxy', true)
// app.use

const helmet = require('helmet')
app.use(helmet())

app.use('/api', require('./api'))

// initialize uuid key
process.env.SECRET_KEY = require('crypto').randomBytes(64).toString('hex')

// const router = express.Router()
app.use(express.static(`${__dirname}/client`))

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/client/index.html`)
  // var ip =
  //   (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
  //   req.connection.remoteAddress ||
  //   req.socket.remoteAddress ||
  //   req.connection.socket.remoteAddress
  // console.log(ip)
  // console.log(req.headers.host)
  // console.log(os.hostname())
  // console.log(os.userInfo())
  // console.log(os.homedir())
})

// app.use('/', router)

app.listen(process.env.PORT, () => {
  console.log(process.env.NODE_ENV, 'mode')
  console.log(
    `Server running at http://${hostname[0].address}:${process.env.PORT}`,
  )
})
