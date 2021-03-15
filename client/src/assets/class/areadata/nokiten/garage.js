import Fujoshitsu from "./fujoshitsu.js"

export default class Garage extends Fujoshitsu{
  constructor(){
    super()
  }
  garage1F(module){
    let computed = this.compute(this.items, 'garage 1F', module)
    this.siding.garage = computed
    this.summary.garage = computed
  }
}