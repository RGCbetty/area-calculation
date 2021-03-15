
class WallLength{
  constructor(){
    this.total = 0
  }
  get dtxOWTotal(){
    return {
      value: this.total,
      auto: true
    }
  }
  set dtxOWTotal(newVal){
    this.total = newVal
  }
}

class Handrail{
  constructor(){
    this.total = 0
  }
  get dtxFWTotal(){
    return {
      value: this.total,
      auto: true
    }
  }
  set dtxFWTotal(newVal){
    this.total = newVal
  }
}

class Area{
  constructor(){
    this.total = 0
  }
  get dtxTotal(){
    return {
      value: this.total,
      auto: true
    }
  }
  set dtxTotal(newVal){
    this.total = newVal
  }
}

export default class Balcony{
  constructor(){
    this.area = new Area
    this.handrail = new Handrail 
    this.walllength = new WallLength
  }
}