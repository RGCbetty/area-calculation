import SolarPanel from "./solarpanel";

export default class MainRoof extends SolarPanel{
  constructor(){
    super()
  }
  wallEavesMR(){
    for(let i = 1; i <= 3; i++){
      let computed = this.compute(this.items,[`MR ${i}F eaves`, `MR ${i}F eaves`], this.module)
      this.siding.floorMinus.splice(i-1, 1, -Math.abs(computed[1]))
      this.siding.floorPlus.splice(i-1, 1, computed[0])
      }
  }
}