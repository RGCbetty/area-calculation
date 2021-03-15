const Header = require('./dxfheader')

module.exports = class Headers extends Array{
  constructor(headers){
    super();
    if (headers.length != 0){
      headers.forEach(header => {
        if(header.length == 2)
          this.add(header[0], header[1]);
        else if (header.length == 1)
          this.add(header[0]);
      })
    }
  }

  static newHeaders(...headers){
    return new Headers(headers)
  }

  addNew(header){
    super.push(header);
  }

  add(name, values = []){
    let header = new Header(name, values);
    this.addNew(header);
  }

  toDXFString(){
    let result = ''
    this.forEach( header => {
      result += header.toDXFString();
    })
    return result;
  }
}