//import DTXHeader from "./lib/dtxheader.js"

const DTXOption = require('./config/dtxoption');
const DTXFileShiyousho = require('./lib/dtxfileShiyousho')

module.exports = class extends DTXFileShiyousho{
  /**
   * @param {object} options - 
   * {
   *  extractAll  = false;
   *  controlNum = '';
   *  extract = [];
   * }
   */
  constructor( options = new DTXOption(options) ){
    super()
    if (typeof options === 'string'){
      this.options = JSON.parse(options)
    }else{
      this.options = options;
    }
  }
}

