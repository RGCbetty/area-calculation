import Parapet from "./parapet";
export default class SolarPanel extends Parapet{
  constructor(){
    super()
  }
  
  wallEavesSP(){
    for(let i = 1; i <= 3; i++){
      let computed = this.compute(this.items,[`SP ${i}F eaves`, `SP ${i}F eaves`], this.module)
      this.summary.floorDeduct.splice(i-1, 1, -Math.abs(computed[1]))
      this.summary.floors.splice(i-1, 1, computed[0])
      }
  }
}