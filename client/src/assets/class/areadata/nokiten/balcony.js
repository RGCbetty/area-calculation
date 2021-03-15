import MainRoof from "./mainroof"

export default class Balcony extends MainRoof{
  constructor(){
    super()
  }
  balconycount(){
    for(let i = 1; i <= 2; i++){
      let filtered = this.items.filter(item => {
        return item.description == `balcony ${i}F`
      })
      this.underlayer.balconyFloors.splice(i-1 , 1, filtered.length)
      }
  }
  balcony(){
    for(let i = 1; i <= 3; i++){
      let computed = this.compute(this.items,`balcony ${i}F`)
      this.siding.balcony.splice(i-1, 1, computed)
      }
  }
}