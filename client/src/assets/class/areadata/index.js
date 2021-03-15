import Sumimune from './sumimune'
import Solar from './solar'
import Mizukiri from './mizukiri'
import Balcony from './balcony'
import Honmune from './honmune'
import Roof from './roof'
import Standard from './standard'
import Items from './items'
import Nokiten from './nokiten'
import GT from './bpu/gt'
import Bankin from './bankin'
// import Youjonet from './bankin/youjonet';
import Hafu from './hafu'
import Yane from './yane'
import DocumentDefinition from '../pdf/docDefinition'
import Heintsvr from '../heintsvr'

export default class AreaData {
  constructor() {
    this.dd = new DocumentDefinition()
    this.items = new Items()
    this.standard = new Standard()
    this.solar = new Solar()
    this.sumimune = new Sumimune()
    this.mizukiri = new Mizukiri()
    this.balcony = new Balcony()
    this.honmune = new Honmune()
    this.roof = new Roof()
    this.nokiten = new Nokiten()
    this.nokitenD = new Nokiten()
    // this.youjonet = new Youjonet
    this.gt = new GT()
    this.bankin = new Bankin()
    this.hafu = new Hafu()
    this.yane = new Yane()
    // save to heintsvr
    this.heintsvr = new Heintsvr()
  }
}
