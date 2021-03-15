const iconv = require('iconv-lite')
const fs = require('fs')
const papa = require('papaparse')

module.exports = class CSVFile extends Array {
  constructor() {
    super()
  }

  cells(row, col) {
    return this.values[row][(row, col)]
  }

  cellsAsBoolean(row, col) {
    return Boolean(parseInt(this.cells(row, col)))
  }

  cellAsInteger(row, col) {
    return parseInt(this.cells(row, col))
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

  loadFromFile(filename) {
    if (fs.existsSync(filename)) {
      let content = fs.readFileSync(filename)
      let output = iconv.decode(content, 'cp932')
      this.values = papa.parse(output, { header: false }).data
      return true
    } else {
      return false
    }
  }

  isFileExists(filepath) {
    return fs.existsSync(filepath)
  }

  createFile(filename, folderName = '') {
    // console.log(this.values)
    let csv = papa.unparse(this.values, { header: true })

    const filedownload = require('../../../../utils/filedownload')
    filedownload.saveFile(`${filename}.csv`, csv, folderName)
  }
}
