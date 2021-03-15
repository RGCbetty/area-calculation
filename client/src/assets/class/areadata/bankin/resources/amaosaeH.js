import AmaosaeGS from "./amaosaeGS";

export default class AmaosaeH extends AmaosaeGS{
  constructor(){
    super()
    this.totalH = 0
  }
  amaosaeH(){
    let computed = this.compute(this.items, 'amaosae h')
    this.totalH = computed
  }
}