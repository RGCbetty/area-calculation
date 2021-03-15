const TextEntity = require('./TEXT/textentity')

module.exports = class Entities extends TextEntity{
  constructor(entities = []){
    super(entities)
    entities.forEach( entity => {
      this.addEntity( entity )
    })
  }

  static newEntities(...entities){
    return new Entities(entities);
  }

  addEntity(entity){
    super.addEntity(entity)
  }

  toDXFString(){
    let result = ''
    result += super.toDXFString();
    return result
  }

}
