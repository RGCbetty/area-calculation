import Properties from "./properties";

export default class AmaosaeGH  extends Properties{
  constructor(){
    super()
    this.totalGH = 0
  }
  amaosaeGH(){
    let computed = this.compute(this.items, 'amaosae geya h')
    this.totalGH = computed
  }
}