const variables = require('./dxfvariables');

module.exports = class Header{
  constructor(variable, values = []){
    this.code = 9;
    this.variable = variables[variable].name;
    this.groupCode = variables[variable].groupCode;
    if (values.length != 0){
      this.values = values;
    }else{
      this.values = variables[variable].defaultValues
    }
  }

  toDXFString(){
    let result = `${this.code}\r\n${this.variable}\r\n`;
    this.groupCode.forEach((code, i) => {
      let val = this.values[i];
      if (code == 10 || code == 20 || code == 30){
        if (val > 0){
          val = val.toFixed(6)
        }
      }
      result += `${code}\r\n${val}\r\n`
    });
    return result;
  }
}