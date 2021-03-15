
const headerName = require('./dtxconst.js');
const {itemCount} = require('./dtxfunct.js');

class DTXObject {
  constructor() {
    this.output = '';
    this.options = {}
  }

  dataList(headerIndex) {
    let firstHeader, secondHeader 
    firstHeader = this.output.indexOf(headerName[headerIndex]) ;
    secondHeader = headerIndex === 115 ? secondHeader = this.output.length : this.output.indexOf(headerName[headerIndex + 1])
    return this.output.substring(firstHeader, secondHeader - 1 ).trimLeft().split('\r\n')
  }

  deleteproperty(){
    delete this.output;
    delete this.options;
  }

}

class DTXItem {
  
  constructor(){
    this.ln = 0;
    this.items = [];
  }

  addItem(item){
    this.items.push(item);
  }
  
  clear(){
    this.items = [];
    this.ln = 0;
  }

  count(data){
    return itemCount(data[0]);
  }

  deleteln(){
    delete this.ln
  }

}

module.exports = {
  DTXObject,
  DTXItem
}
