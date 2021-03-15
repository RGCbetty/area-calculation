
const DodaiMizukiri = require('./computation/dodaimizukiri/dodaimizukiri');
const Balconies = require('./computation/balcony/balconies');

const DTXHeader = require('./dtxheader');

class Computed {
  constructor(){
    this.dodaiMizukiri = new DodaiMizukiri();
    this.balconies = new Balconies();
  }
}

module.exports = class DTXCalculation extends DTXHeader{
  constructor(){
    super()
    this.computed = new Computed()
  }

  loadComputation(){
    this.computed.dodaiMizukiri.compute({
      wall: this.wall,
      gaisyuu: this.gaisyuu,
      tategu: this.tategu,
    })

    this.computed.balconies.compute({
      gaisyuu: this.gaisyuu,
      balcony: this.balcony,
      wall: this.wall
    })
  }

}