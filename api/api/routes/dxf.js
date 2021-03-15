const express = require('express')
const router = express.Router()

router.use(express.json());
router.use(express.urlencoded({extended: false}));
router.use(require('cors')());

router.get('/', (req, res) => {
  res.send('default') 
});

// const DxfServer = require('../dxf-server')
// dxfRoute.get('/sample', (req, res) => {
//   let dxf = new DxfServer()
  
//   res.send(dxf.exportFile())
// })

module.exports = router;