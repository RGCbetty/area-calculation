const Balcony = require('./balcony');

module.exports = class Balconies extends Array{
  constructor(){
    super()
  }

  compute(options){
    for (let bal of options.balcony.items){
      super.push( Balcony.create(bal, options) )
    }
  }

}


