import PentHouse from "./penthouse";
export default class Fujoshitsu extends PentHouse{
  constructor(){
    super()
  }
  Fujyoshitsu1F(module){
    let computed = this.compute(this.items, 'Fujyoshitsu 1F', module)
    this.siding.fujyoshitsu = computed
  }
}