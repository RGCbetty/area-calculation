
export default class DTXItem{
  constructor(extract = false){
    this.isExtract = extract; 
    this.items = [];
  }

  asExtract(){
    this.isExtract = true;
  }

  merge(objValue) {
    Object.assign(this, objValue)
  }
}