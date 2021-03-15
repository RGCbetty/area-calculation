export default class DTXOption{
  constructor(extractAll){
    this.extractAll = extractAll;
    this.controlNum = '';
    this.extract = [];
    this.include = {};
  }

  needToExtract(key, obj){
    if (obj.isExtract){
      this.extract.push(key);
    }
  }

  addToExtract(name){
    if( !this.extract.includes(name) )
      this.extract.push(name);
  }

  emptyExtract(){
    this.extract = []
  }

}
