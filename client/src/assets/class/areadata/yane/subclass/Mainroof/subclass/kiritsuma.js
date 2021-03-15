import compute from "./functions/compute"
import Area from "./area"
export default class Kiritsuma{
  constructor(){
    this["y-k"] = new Area
    this.yosemune = new Area
    this.kiritsuma = new Area
  }
  eachFloor(items, roofType, type = 'area', perimeterFloors){
    for(let i = 1; i <= 3; i++){
      for(let j = 1; j <= 3; j++ ){
        let totalEachFloor = compute(items, `${roofType} ${i}F ${type} p${j}` )

        // this["y-k"] = totalEachFloor[1][0]
        // this.yosemune = totalEachFloor[1][1]
        // this.kiritsuma = totalEachFloor[1][2]
        if(totalEachFloor[0] !== 0){
          let deduct = 0
            if(perimeterFloors){
              if( type == 'area') { 
                if(totalEachFloor[1][0]){
                  this["y-k"][`${i}F`][`p${j}`].value = totalEachFloor[1][0]
                }
                if(totalEachFloor[1][1]){
                  this.yosemune[`${i}F`][`p${j}`].value = totalEachFloor[1][1]
                }
                if(totalEachFloor[1][2]){
                  this.kiritsuma[`${i}F`][`p${j}`].value = totalEachFloor[1][2]
                  
                }
                      // this.yosemune = totalEachFloor[1][1] ? totalEachFloor[1][1] : 0;
                      // this.kiritsuma = totalEachFloor[1][2] ? totalEachFloor[1][2] : 0;
                // this[`${i}F`][`p${j}`].value = totalEachFloor[0]
                // this[`${i}F`][`p${j}`].value = (totalEachFloor + perimeterFloors[i-1])
                // console.log(this[`${i}F`][`p${j}`].value)
                // console.log(this)
              }
          } else {
            this[`${i}F`][`p${j}`].value = totalEachFloor[0]
          }
           if(type == 'deduct'){
            deduct = (totalEachFloor[0] + perimeterFloors[i-1])
            this[`${i}F`][`p${j}`].value += deduct
            // console.log(deduct)
            // console.log(totalEachFloor)
            // console.log(perimeterFloors[i-1])
           } 
           
        } else {
          if(type == 'deduct'){
            if(this[`${i}F`][`p${j}`].value) continue;
            this[`${i}F`][`p${j}`].value = totalEachFloor[0]
          }
          this["y-k"][`${i}F`][`p${j}`].value = totalEachFloor[1][0]
          this.yosemune[`${i}F`][`p${j}`].value = totalEachFloor[1][1]
          this.kiritsuma[`${i}F`][`p${j}`].value = totalEachFloor[1][2]
        }

        // totalEachFloor !== 0 ? this[`${i}F`][`p${j}`].value = totalEachFloor : this[`${i}F`][`p${j}`].value = totalEachFloor;
        // totalEachFloor !== 0 ? this[`${i}F`][`p${j}`].value = totalEachFloor : 0;
      }
    }
    
  }
}