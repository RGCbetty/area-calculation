import Garage from "./garage";
export default class Parapet extends Garage{
  constructor(){
    super()
  }
  parapet1F(module){
    let computed = this.compute(this.items, 'parapet 1F', module)
    this.siding.parapet = computed
  }
}