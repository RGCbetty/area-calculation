const express = require('express');
const router = express.Router();
const controller = require('./controller/')

router.get('/', (req,res) => {
  res.send({
    url: [
    ],
    method: {
      post: [
        'save' 
      ],
    }
  })
})

router.post('/save', controller.save )

module.exports = router;