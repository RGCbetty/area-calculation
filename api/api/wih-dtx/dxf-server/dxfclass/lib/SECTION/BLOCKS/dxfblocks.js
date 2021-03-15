const Block = require('./dxfblock');

module.exports = class Blocks extends Array{
  constructor(blocks = []){
    super();
    blocks.forEach(block => {
      this.addBlock( Block.newBlock(block) )
    })
  }

  static newBlocks(...blocks){
    return new Blocks(blocks);
  }

  addBlock(block){
    super.push(block)
  }

  toDXFString(){
    let result = ''
    this.forEach( block => {
      result += block.toDXFString();
    })
    return result
  }
}

