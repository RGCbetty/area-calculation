import DTXOption from './dtxoption';
import DTXPlanInformationItem from './items/dtxplaninfo';
import DTXHouseStruture from './items/dtxhousestructure';
import DTXPlanDetail from './items/dtxplandetail';
import DTXCoordinateItem from './items/dtxcoordinate';
import DTXGaisyuuItem from './items/dtxgaisyuu';
import DTXOrientationItem from './items/dtxorientation';
import DTXNakaniwaItem from './items/dtxnakaniwa';
import DTXHeyaItem from './items/dtxheya';
import DTXShuunouItem from './items/dtxshuunou';
import DTXParapetWallItem from './items/dtxparapetwall';
import DTXWallItem from './items/dtxwall';
import DTXPorchItem from './items/dtxporch';
import DTXLineItem from './items/dtxline';
import DTXCircleItem from './items/dtxcircle';
import DTXDoubleArrowItem from './items/dtxdoublearrow';
import DTXTextItem from './items/dtxtext';
import DTXAtsumiRyouikiItem from './items/dtxatsumiryouiki';
import DTXMensekiItem from './items/dtxmenseki';
import DTXWooddeckItem from './items/dtxwooddeck';
import DTXKeishaMenItem from './items/dtxkeishamen';
import DTXVoidItem from './items/dtxvoid';
import DTXTokonomaItem from './items/dtxtokonoma';
import DTXTatamiItem from './items/dtxtatami';
import DTXBubunKabeItem from './items/dtxbubunkabe';
import DTXBalconyItem from './items/dtxbalcony';
import DTXRoofGardenItem from './items/dtxroofgarden';
import DTXTwoDItem from './items/dtx2d';
import DTXTsumakabeItem from './items/dtxtsumakabe'; 
import DTXYaneItem from './items/dtxyane';
import DTXParapetItem from './items/dtxparapet';
import DTXBearingWall from './items/dtxbearingwall';
import DTXTateguEntities from './items/dtxtategu'

export default class DTXObject extends Object{
  constructor(extractAll = false){
    super()
    this.options = new DTXOption(extractAll);
    this.planInfo = new DTXPlanInformationItem(extractAll);
    this.houseStructure = new DTXHouseStruture(extractAll);
    this.planDetail = new DTXPlanDetail(extractAll);
    this.coordinate = new DTXCoordinateItem(extractAll);
    this.gaisyuu = new DTXGaisyuuItem(extractAll);
    this.orientation = new DTXOrientationItem(extractAll);
    this.nakaniwa = new DTXNakaniwaItem(extractAll);
    this.heya = new DTXHeyaItem(extractAll);
    this.shuunou = new DTXShuunouItem(extractAll);
    this.parapetWall = new DTXParapetWallItem(extractAll);
    this.wall = new DTXWallItem(extractAll);
    this.porch = new DTXPorchItem(extractAll);
    this.line = new DTXLineItem(extractAll);
    this.circle = new DTXCircleItem(extractAll);
    this.doubleArrow = new DTXDoubleArrowItem(extractAll);
    this.text = new DTXTextItem(extractAll);
    this.atsumiRyouiki = new DTXAtsumiRyouikiItem(extractAll);
    this.menseki = new DTXMensekiItem(extractAll);
    this.wooddeck = new DTXWooddeckItem(extractAll);
    this.keishamen = new DTXKeishaMenItem(extractAll);
    this.void = new DTXVoidItem(extractAll);
    this.tokonoma = new DTXTokonomaItem(extractAll);
    this.tatami = new DTXTatamiItem(extractAll);
    this.bubunKabe = new DTXBubunKabeItem(extractAll);
    this.balcony = new DTXBalconyItem(extractAll);
    this.roofgarden = new DTXRoofGardenItem(extractAll);
    this.twoD = new DTXTwoDItem(extractAll);
    this.tsumakabe = new DTXTsumakabeItem(extractAll);
    this.yane = new DTXYaneItem(extractAll);
    this.parapet = new DTXParapetItem(extractAll);
    this.bearingWall = new DTXBearingWall(extractAll);
    this.tategu = new DTXTateguEntities(extractAll);
    this.extractAll = extractAll;
    this.computed = {
      dodaiMizukiri: {
        externwallLength:0,
        domaOpening:0,
        totalPerimeter: 0
      },
      balconies:[]
    }
  }

  setDefaultExtract(){
    this.planInfo.asExtract();
    this.houseStructure.asExtract();
    this.planDetail.asExtract();
    this.coordinate.asExtract();
    this.gaisyuu.asExtract();
    this.orientation.asExtract();
    this.menseki.asExtract();
  }

  saveExtract(){

    if (this.planInfo.isExtract)
      this.options.addToExtract('planInfo');
    
    if (this.houseStructure.isExtract) 
      this.options.addToExtract('houseStructure');

    if (this.planDetail.isExtract)
      this.options.addToExtract('planDetail');

    if (this.coordinate.isExtract)
      this.options.addToExtract('coordinate');
    
    if (this.gaisyuu.isExtract)
      this.options.addToExtract('gaisyuu');

    if (this.orientation.isExtract)
      this.options.addToExtract('orientation');

    if (this.nakaniwa.isExtract)
      this.options.addToExtract('nakaniwa');
    
    if (this.heya.isExtract)
      this.options.addToExtract('heya');
    
    if (this.shuunou.isExtract)
      this.options.addToExtract('shuunou')

    if (this.parapetWall.isExtract)
      this.options.addToExtract('parapetWall')
    
    if (this.wall.isExtract)
      this.options.addToExtract('wall')  

    if (this.porch.isExtract)
      this.options.addToExtract('porch')   

    if (this.line.isExtract)
      this.options.addToExtract('line')  
    
    if (this.circle.isExtract)
      this.options.addToExtract('circle')

    if (this.doubleArrow.isExtract)
      this.options.addToExtract('doubleArrow')  
    
    if (this.text.isExtract)
      this.options.addToExtract('text')

    if (this.atsumiRyouiki.isExtract)
      this.options.addToExtract('atsumiRyouiki')

    if (this.menseki.isExtract)
      this.options.addToExtract('menseki')

    if (this.wooddeck.isExtract)
      this.options.addToExtract('wooddeck')

    if (this.keishamen.isExtract)
      this.options.addToExtract('keishamen')
    
    if (this.void.isExtract)
      this.options.addToExtract('void')  
    
    if (this.tokonoma.isExtract)
      this.options.addToExtract('tokonoma') 

    if (this.tatami.isExtract)
      this.options.addToExtract('tatami')      
    
    if (this.bubunKabe.isExtract)
      this.options.addToExtract('bubunKabe')
    
    if (this.balcony.isExtract)
      this.options.addToExtract('balcony')

    if (this.roofgarden.isExtract)
      this.options.addToExtract('roofgarden')

    if (this.twoD.isExtract)
      this.options.addToExtract('twoD');

    if (this.tsumakabe.isExtract)
      this.options.addToExtract('tsumakabe')

    if (this.yane.isExtract)
      this.options.addToExtract('yane')

    if (this.parapet.isExtract)
      this.options.addToExtract('parapet')

    if (this.bearingWall.isExtract){
      this.options.addToExtract('bearingWall');
      Object.assign(this.options.include, {
        'bearingWall': {
          roofType: this.bearingWall.roofType
        }  
      })
    }

    if (this.tategu.isExtract){
      this.options.addToExtract('tategu')
    }
       
  }

  set extractAll(val){
    this.options.extractAll = val
    this.options.emptyExtract()
    if (val){
      this.addOptionAllExtract();
    }else{
      this.setDefaultExtract()
      this.saveExtract();
    }  
  }

  get extractAll(){
    return this.options.extractAll
  }

  addOptionAllExtract(){
    for (const key in this){
      if (this.isDTXItemClass(key)){
        this[key].asExtract();
        this.options.addToExtract(key);
      }
    }
  }

  asExtractAll(){
    this.options.extractAll = true;
    this.addOptionAllExtract();
  }

  isDTXItemClass(name){
    return this[name].__proto__.__proto__.constructor.name === 'DTXItem'
  }

}