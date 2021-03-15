module.exports = class DtxOption{
  /**
   * @param {object} options - 
   * {
   *  extractAll  = false;
   *  controlNum = '';
   *  extract = [];
   * }
   */
  constructor(options){
    this.extractAll = false;
    this.controlNum = '';
    this.extract = []

    if (typeof options == 'object'){
      if (extractAll in options)
      this.extractAll = options.extractAll;

      if (controlNum in options)
        this.controlNum = options.controlNum;

      if (extract in options)
        this.extract = options.extract
    }
    
  }

  static options(value){
    return new DtxOption(value);
  }

}