const iconv = require('iconv-lite')
const fs = require('fs')
const papa = require('papaparse')
const filedownload = require('../../utils/filedownload')

module.exports = class CSV extends Array {
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

  loadFromFile(filepath) {
    if (fs.existsSync(filepath)) {
      let content = fs.readFileSync(filepath)
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

  static export(filename, data, folder) {
    console.log('export')
    let csv = papa.unparse(data, { header: false })
    return filedownload.saveFile(filename + '.csv', csv, folder)
  }

  static exportTo(filepath, data) {
    let csv = papa.unparse(data, { header: false })
    return filedownload.saveFileTo(filepath, csv)
  }
}
