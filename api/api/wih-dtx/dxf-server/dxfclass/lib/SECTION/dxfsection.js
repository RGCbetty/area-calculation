module.exports = class Section{
  constructor(name, value = {}){
    this.name = name;
    this.value = value;
  }

  assign(name, value){
    this.name = name;
    this.value = value;
  }

  static newSection(name, value){
    return new Section(name, value)
  }

  toDXFString(){
    let result = `2\r\n${this.name}\r\n`;
    result += this.value.toDXFString();
    return result;
  }

}