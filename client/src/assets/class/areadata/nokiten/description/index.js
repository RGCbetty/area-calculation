class Underlayer {
  constructor(){
    this.balconyFloors = [0, 0]
    this.h_wallFloors = [0, 0, 0]
  }
}

class Summary {
  constructor(){
    this.garage = 0;
    this.balcony = 0;
    this.floors = [0, 0, 0];
    this.floorDeduct = [0, 0, 0];
    this.total = 0;
  }
}

class Siding{
  constructor(){
    this.garage = 0;
    this.balcony = [0, 0, 0];
    this.penthouse = [0, 0, 0]
    this.parapet = 0
    this.fujyoshitsu = 0
    this.hangingwall = [0, 0, 0];
    this.deduct1F = 0
    this.floorPlus = [0, 0, 0];
    this.floorMinus = [0, 0, 0];
    this.total = 0;
  }
}

export {Underlayer, Summary, Siding}