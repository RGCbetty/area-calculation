import {Floor} from "./standards";
import compute from "./functions/compute"

export default class Perimeter extends Floor{
  constructor(){
    super()
      this.floors = [0, 0, 0]
      this.value = 0

  }
  eachFloor(items, roofType){
    this.floors.splice(0, 1, 0)
    this.floors.splice(1, 1, 0)
    this.floors.splice(2, 1, 0)
      if(!roofType == 'PH'){
        for(let i = 1; i <= 3; i++){
          let totalEachFloor = compute(items, `${roofType} perimeter p${i}` )
        this[`p${i}`].value = totalEachFloor[0]
        if(items.some(item => item.description ? item.description.includes('MR 3F'): null)){
          if(totalEachFloor[0] > 0){
            let total = (totalEachFloor[0] * 0.05)
            this.floors.splice(2, 1, total)
            // this['3rdFloor'] = (totalEachFloor * 0.05 )
            }
        } else if (items.some(item =>item.description ? item.description.includes('MR 2F'): null)){
          if(totalEachFloor[0] > 0){
            let total = (totalEachFloor[0] * 0.05)
            this.floors.splice(1, 1, total)
            // this['2ndFloor'] = (totalEachFloor * 0.05)
            }
        } else if (items.some(item =>item.description ? item.description.includes('MR 1F'): null)){
          if(totalEachFloor[0] > 0){
            let total = (totalEachFloor[0] * 0.05)
            this.floors.splice(0, 1, total)
          // this['1stFloor'] = (totalEachFloor * 0.05)
          }
        }
        // totalEachFloor !== 0 ? this[`${i}F`][`p${j}`].value = totalEachFloor : this[`${i}F`][`p${j}`].value = totalEachFloor;
        // totalEachFloor !== 0 ? this[`${i}F`][`p${j}`].value = totalEachFloor : 0;
        }
      } else {
        let totalEachFloor = compute(items, `${roofType} perimeter` )
        this.value = (totalEachFloor[0] * 0.05)
      }
      // console.log(this)
  }
}