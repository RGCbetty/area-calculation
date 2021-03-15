const path = require('path');
const iconv = require('iconv-lite');
const fs = require('fs');

module.exports = {
  downloadPath(){
    return path.join(__dirname, '../../', 'downloads/')
  },

  createFolder(folderName){ 
    let folderPath = `${this.downloadPath()}${folderName}${path.sep}`
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath)
    }
  },

  saveFile(filename, data, addOnThisFolder = ''){
    let filePath = ''
    if (addOnThisFolder){
      this.createFolder(addOnThisFolder)
      filePath = `${this.downloadPath()}${addOnThisFolder}${path.sep}`
    }else{
      filePath = `${this.downloadPath()}`
    }
    let val = iconv.encode(data, 'cp932');
    fs.writeFileSync(`${filePath}${filename}`, val, {encoding: 'ascii'})
    return true
  },

  saveFileTo(filePath, data){
    let val = iconv.encode(data, 'cp932');
    fs.writeFileSync(`${filePath}`, val, {encoding: 'ascii'})
    return true 
  }
  
}