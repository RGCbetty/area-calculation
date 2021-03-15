const express = require('express');
const router = express.Router();

router.use('/license', require('./license'));

module.exports = router;