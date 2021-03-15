const DTXCalculation = require('./dtxcalculation')
const fs = require('fs')
const iconv = require('iconv-lite')

module.exports = class DTXFile extends DTXCalculation {
  constructor() {
    super()
  }

  loadFromUploadFile(file) {
    if (this.loadFromFile(file.path)) {
      fs.unlink(file.path, err => {
        console.log(err)
      })
      return true
    } else {
      return false
    }
  }

  loadFromFile(aFilename) {
    if (fs.existsSync(aFilename)) {
      let readfile = fs.readFileSync(aFilename)
      this.output = iconv.decode(readfile, 'cp932')
      this.loadExtraction()
      this.loadComputation()
      this.deleteproperty()
      return true
    } else {
      return false
    }
  }
}
