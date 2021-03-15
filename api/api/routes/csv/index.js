const express = require('express');
const router = express.Router();

const path = require('path');
const _ = require('lodash');
const fs = require('fs')

const filedownload = require('../../utils/filedownload');

router.use('/sekisan', require('./sekisan'));
router.use('/tategu', require('./tategu'))
 
router.get('/', (req,res) => {
  res.send({
    url: [
      'sekisan',
      'tategu'
    ],
    method: {
      post: [
        'export' 
      ],

      get: [
        'download?foldername=@value&filename=@value'
      ]
    }
  })
})

router.post('/export', (req, res) => { 
  console.log('export') 
  const CSV = require('../../class/csv')
  if (CSV.export(req.body.filename, req.body.data, req.body.foldername) ){
    res.json({success: true})
  }else{
    res.status(500).send({  
      message: 'not save'
    });
  }
})

router.post('/exportto', (req, res) => {
  const CSV = require('../../class/csv')
  if (CSV.exportTo( req.body.filename, req.body.data) ){
    res.json({success: true})
  }else{
    res.status(500).send({  
      message: 'not save'
    });
  } 
})

router.get('/download?*', (req, res) => {
  if (_.isEmpty(req.query)){
    res.status(400).send({
      message: 'please add query'
    })
  }else if ( 'foldername' in req.query && 'filename' in req.query){
    let filePath = path.join( __dirname, '../../../', 'downloads', String(req.query.foldername), String(req.query.filename) )
    
    if (fs.existsSync(filePath)){
      res.download( filePath , err => {
        console.log(err)
      })
    }else{
      res.status(400).send({
        message: 'file not exist'
      })
    }
  }else{
    res.status(400).send({
      message: 'query incomplete'
    })
  } 
})


// const HRDCSV = require('../../wih-dtx/csv-server/hrdcsv')

const fileupload = require('../../utils/fileupload');



router.get('/loadFromArchServer/tategu/all/:filename', (req, res) => {
  
  let csv = new HRDCSV();
  
  csv.loadFromArchServer(req.params.filename).then( a => {
    res.send(csv.values)
  })
})



router.post('/saveFile', (req, res) => {
  let csv = new HRDCSV();
  csv.values = req.body.values;
  csv.createFile(req.body.filename, req.body.folderName);
  res.send('ok');
})

router.post('/loadFromUploadFile', fileupload.single('file'), (req, res) => {
  let csv = new HRDCSV();
  csv.loadFromUploadFile(req.file)
  console.log(csv.values)
  res.send(csv.values)
});

module.exports = router;