import Area from "./subclass/area";
import Deduct from "./subclass/deduct";
import Yosemune from "./subclass/yosemune";
import Kiritsuma from "./subclass/kiritsuma";
import Perimeter from "./subclass/perimeter";

export default class Mainroof{
  constructor(){
    this.area = new Area();
    this.deduct = new Deduct();
    this.yosemune = new Yosemune();
    this.kiritsuma = new Kiritsuma();
    this.perimeter = new Perimeter();
   
  }
 
}