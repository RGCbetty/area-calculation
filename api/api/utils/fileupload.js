const multer = require('multer')

//disk storage option
const diskStorage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

module.exports = multer({
  storage: diskStorage //storage property 
})
  

  

