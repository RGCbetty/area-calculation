import AmaosaeGH from "./amaosaeGH";

export default class AmaosaeGS extends AmaosaeGH{
  constructor(){
    super()
    this.totalGS = 0
  }
  amaosaeGS(){
    let computed = this.compute(this.items, 'amaosae geya s')
    this.totalGS = computed
  }
}