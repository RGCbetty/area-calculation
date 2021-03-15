import Balcony from './balcony'

export default class HangingWall extends Balcony{
    
  constructor(){
    super()
  }

  hwallcount(){
    for(let i = 1; i <= 3; i++){
    let filtered = this.items.filter(item => {
      return item.description == `h_wall ${i}F`
    })
    this.underlayer.h_wallFloors.splice(i-1 , 1, filtered.length)
    }
  }
  hangingWall(){
    for(let i = 1; i <= 3; i++){
      let computed = this.compute(this.items,`h_wall ${i}F`)
      this.siding.hangingwall.splice(i-1, 1, computed)
      }
  }

}

