const {DTXObject} = require('./dtxbase');

const DTXPlanInformationItem = require('./dtxplaninfo');
const DTXPlanDetailItem = require('./dtxplandetail');
const DTXHouseStructure = require('./dtxhousestructure');
const {DTXCoordinateItem} = require('./dtxcoordinate');
const DTXGaisyuuEntities = require('./dtxgaisyuu/dtxgaisyuuentities');
const {DTXOrientationItem} = require('./dtxorientation');
const DTXNakaniwaItem = require('./dtxnakaniwa');
const DTXHeyaItem = require("./dtxheya" );
const DTXShuunouItem = require("./dtxshuunou" );
const DTXParapetWallItem = require("./dtxparapetwall" );
const DTXWallEntities = require("./dtxwall/dtxwallentities");
const DTXPorchItem = require("./dtxporch");
const {DTXLineItem} = require("./dtxline");
const {DTXCircleItem} = require("./dtxcircle");
const {DTXDoubleArrowItem} = require("./dtxdoublearrow");
const {DTXTextItem} = require("./dtxtext");
const {DTXAtsumiRyouikiItem} = require("./dtxatsumiryouiki");
const {DTXMensekiItem} = require("./dtxmenseki");
const {DTXWooddeckItem} = require("./dtxwooddeck");
const {DTXKeishaMenItem} = require("./dtxkeishamen");
const {DTXVoidItem} = require("./dtxvoid");
const {DTXTokonomaItem} = require("./dtxtokonoma");
const {DTXTatamiItem} = require("./dtxtatami");
const {DTXBubunKabeItem} = require("./dtxbubunkabe");
const {DTXBalconyItem} = require("./dtxbalcony");
const DTXRoofGardenEntities = require('./dtxroofgarden/dtxroofgardenentities')
const {DTXTwoDItem} = require("./dtx2d");
const {DTXTsumakabeItem} = require("./dtxtsumakabe");
const DTXYaneEntities = require('./dtxyane/dtxyaneentities')
const {DTXBearingWallItem} = require("./dtxbearingwall");
const DTXTateguEntities = require('./dtxtategu/dtxtateguentities')

module.exports = class DTXHeader extends DTXObject{
  
  constructor(){
    super();
    
    this.planInfo = new DTXPlanInformationItem()
    this.planDetail = new DTXPlanDetailItem();
    this.houseStructure = new DTXHouseStructure();
    this.coordinate = new DTXCoordinateItem();
    this.gaisyuu = new DTXGaisyuuEntities();
    this.orientation = new DTXOrientationItem();
    this.nakaniwa = new DTXNakaniwaItem();
    this.heya = new DTXHeyaItem();
    this.shuunou = new DTXShuunouItem();
    this.parapetWall = new DTXParapetWallItem();
    this.wall = new DTXWallEntities();
    this.porch = new DTXPorchItem()
    this.line = new DTXLineItem()
    this.circle = new DTXCircleItem();
    this.doubleArrow = new DTXDoubleArrowItem();
    this.text = new DTXTextItem();
    this.atsumiRyouiki = new DTXAtsumiRyouikiItem();
    this.menseki = new DTXMensekiItem();
    this.wooddeck = new DTXWooddeckItem();
    this.keishamen = new DTXKeishaMenItem();
    this.void = new DTXVoidItem();
    this.tokonoma = new DTXTokonomaItem();
    this.tatami = new DTXTatamiItem();
    this.bubunKabe = new DTXBubunKabeItem();
    this.balcony = new DTXBalconyItem();
    this.roofgarden = new DTXRoofGardenEntities();
    this.twoD = new DTXTwoDItem();
    this.tsumakabe = new DTXTsumakabeItem();
    this.yane = new DTXYaneEntities();
    this.bearingWall = new DTXBearingWallItem();
    this.tategu = new DTXTateguEntities();
  }

  clear(){
    this.planInfo.clear();
    this.planDetail.clear();
    this.houseStructure.clear();
    this.coordinate.clear();
    this.gaisyuu.clear();
    this.orientation.clear();
    this.nakaniwa.clear();
    this.heya.clear();
    this.shuunou.clear();
    this.parapetWall.clear();
    this.wall.clear();
    this.porch.clear();
    this.line.clear();
    this.circle.clear();
    this.doubleArrow.clear();
    this.text.clear();
    this.atsumiRyouiki.clear();
    this.menseki.clear();
    this.wooddeck.clear();
    this.keishamen.clear();
    this.void.clear();
    this.tokonoma.clear();
    this.tatami.clear();
    this.bubunKabe.clear();
    this.balcony.clear();
    this.roofgarden.clear()
    this.tsumakabe.clear();
    this.yane.clear();
    this.bearingWall.clear();
    this.tategu.clear();
  }

  loadExtraction(){

    this.loadExtract('planInfo', 1);
    this.loadExtract('houseStructure', 3);
    this.loadExtract('planDetail', 5);
    this.loadExtract('coordinate', 87);
    this.loadExtract('orientation', 76);
    this.loadExtract('gaisyuu', 34, {
      'houseStructure': this.houseStructure  
    });
    this.loadExtract('nakaniwa', 35, {
      'houseStructure': this.houseStructure  
    });
    this.loadExtract('heya', 6, {
      'houseStructure': this.houseStructure  
    });
    this.loadExtract('shuunou', 7, {
      'houseStructure': this.houseStructure  
    });
    this.loadExtract('parapetWall', 93, {
      'houseStructure': this.houseStructure  
    });
    this.loadExtract('porch', 32, {
      'houseStructure': this.houseStructure  
    });
    this.loadExtract('line', 52, {
      'houseStructure': this.houseStructure   
    });
    this.loadExtract('circle', 53, {
      'houseStructure': this.houseStructure   
    });
    this.loadExtract('doubleArrow', 115, {
      'houseStructure': this.houseStructure  
    });
    this.loadExtract('text', 114, {
      'houseStructure': this.houseStructure 
    });
    this.loadExtract('atsumiRyouiki', 58, {
      'houseStructure': this.houseStructure 
    });
    this.loadExtract('menseki', 64, {
      'houseStructure': this.houseStructure 
    });
    this.loadExtract('wooddeck', 85, {
      'houseStructure': this.houseStructure,
      'text': this.text
    });
    this.loadExtract('keishamen', 82, {
      'houseStructure': this.houseStructure 
    });
    this.loadExtract('void', 8, {
      'houseStructure': this.houseStructure 
    });
    this.loadExtract('tokonoma', 9, {
      'houseStructure': this.houseStructure  
    });
    this.loadExtract('tatami', 10, {
      'houseStructure': this.houseStructure  
    });
    this.loadExtract('bubunKabe', 15, {
      'houseStructure': this.houseStructure  
    });
    this.loadExtract('balcony', 30, {
      'houseStructure': this.houseStructure,
      'gaisyuu': this.gaisyuu
    });
    this.loadExtract('roofgarden', 30, {
      'houseStructure': this.houseStructure
    });
    this.twoD.load({
      'text': this.text,
      'line': this.line
    });
    this.loadExtract('tsumakabe', 46, {
      'houseStructure': this.houseStructure
    });
    this.loadExtract('yane', 36, {
      'orientation': this.orientation, 
      'houseStructure': this.houseStructure, 
      'text': this.text, 
      'twoD':  this.twoD,
      'tsumakabe': this.tsumakabe,
      'gaisyuu': this.gaisyuu
    });

    this.loadExtract('wall', 12, {
      'houseStructure': this.houseStructure,
      'gaisyuu': this.gaisyuu,
      'yane': this.yane,
      'balcony': this.balcony
    });

    this.loadExtract('bearingWall', 20, {
      'planInfo': this.planInfo,
      'houseStructure': this.houseStructure,
      'coordinate': this.coordinate,
      'menseki': this.menseki,
      'gaisyuu': this.gaisyuu,
      'condition': this.options.include.bearingWall
    });
    this.loadExtract('tategu', 21, {
      'planInfo': this.planInfo,
      'houseStructure': this.houseStructure,
      'balcony': this.balcony,
    })
  }

  loadExtract(propertyName, index, option){
    if(this.options.extractAll){
      !option ? this[propertyName].load( this.dataList(index) ) : this[propertyName].load( this.dataList(index), option);  
    }else{
      if (this.options.extract.includes(propertyName)){
        !option ? this[propertyName].load( this.dataList(index) ) : this[propertyName].load( this.dataList(index), option);
      }
    }
  }

  notIncludedProperty(propertyName){
    if (!this.options.extractAll){
      if (!this.options.extract.includes(propertyName)){
        delete this[propertyName]
      }  
    } 
    if(this[propertyName]){
      if ('ln' in this[propertyName])
        delete this[propertyName].ln
    }
  }

  isDTXClass(key){
    return this[key].__proto__.constructor.name.startsWith('DTX');
  }

  deleteproperty(){
    for (const key in this){
      if (this.isDTXClass(key)){
        this.notIncludedProperty(key)
      }
    }
    super.deleteproperty()
  }
}


