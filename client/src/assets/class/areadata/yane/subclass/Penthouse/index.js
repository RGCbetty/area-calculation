import Area from "../Mainroof/subclass/area";
import Perimeter from "../Mainroof/subclass/perimeter";
import Deduct from "../Mainroof/subclass/deduct";
export default class Penthouse{
  constructor(){
    this.area = new Area();
    this.deduct = new Deduct();
    this.perimeter = new Perimeter();
  }
}