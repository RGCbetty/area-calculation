import Base from "./base";

export default class PentHouse extends Base{
  constructor(){
    super()
  }
  PHeaves(module){
    this.siding.penthouse.splice(0, 1, 0)
    this.siding.penthouse.splice(1, 1, 0)
    this.siding.penthouse.splice(2, 1, 0)
    if(this.items.some(item => item.description ? item.description.includes('3F'): null)){
      let computed = this.compute(this.items, 'PH Eaves', module)
      if(this.siding.floorPlus[2] !== 0){
        this.siding.penthouse.splice(2, 1, computed)
      }
    } else if (this.items.some(item =>item.description ? item.description.includes('2F'): null)){
      let computed = this.compute(this.items, 'PH Eaves', module)
      if(this.siding.floorPlus[1] !== 0){
      this.siding.penthouse.splice(1, 1, computed)
      }
    } else if (this.items.some(item =>item.description ? item.description.includes('1F'): null)){
      let computed = this.compute(this.items, 'PH Eaves', module)
      if(this.siding.floorPlus[0] !== 0){
      this.siding.penthouse.splice(0, 1, computed)
      }
    }
  }
}