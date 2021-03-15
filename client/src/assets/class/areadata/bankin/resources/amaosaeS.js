import AmaosaeH from "./amaosaeH";

export default class AmaosaeS extends AmaosaeH{
  constructor(){
    super()
    this.totalS = 0
  }
  amaosaeS(){
    let computed = this.compute(this.items, 'amaosae s')
    this.totalS = computed
  }
}