module.exports = class Block {
  constructor(block){
    if (block){

    }
  }

  static newBlock(block){
    return new Block(block);
  }

  toDXFString(){
    let result = `0\r\nBlOCK\r\n`

    return result
  }
}