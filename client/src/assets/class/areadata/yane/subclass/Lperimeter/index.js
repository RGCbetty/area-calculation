import compute from "../Mainroof/subclass/functions/compute"

export default class Lperimeter {
  constructor(){
      this['1F'] = 0;
      this['2F'] = 0;
  }
  eachFloor(items, roofType){
    for(let i = 1; i <= 2; i++){
        let totalEachFloor = compute(items, `${roofType} perimeter ${i}F` )
        if(totalEachFloor > 0){
          this[`${i}F`] = totalEachFloor
        }
        // totalEachFloor !== 0 ? this[`${i}F`][`p${j}`].value = totalEachFloor : this[`${i}F`][`p${j}`].value = totalEachFloor;
        // totalEachFloor !== 0 ? this[`${i}F`][`p${j}`].value = totalEachFloor : 0;
    }
  }
}