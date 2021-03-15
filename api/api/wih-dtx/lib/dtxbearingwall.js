const {CommonItem} = require('./dtxheadertype')
const { DTXItem } = require("./dtxbase");
const Enumeration = require("./dtxenumeration");
const { toInt, toDbl, toEnm } = require("./dtxfunct");
const RigidityComp = require('./computation/bearingwall/rigiditycomputation');
const GravityComp = require('./computation/bearingwall/gravitycomputation');
const EccentricityRatio = require('./computation/bearingwall/eccentricityratio');
const BearingWall = require('./computation/bearingwall/bearingwallcomputation');
const DxfEccentricityCalculationTable = require('../dxf-server/dxfbearingwall/src/dxfeccentricitycalculationtable');


const shuruiEnum = Enumeration.newEnum(
  ['shuruiGouhan'],
  ['sujikai_kata'],
  ['sujikai_tasuki'],
  ['monGataRamen']
);

const toritsukeHoukouEnum = Enumeration.newEnum(
  ['leftSideTowardEnd', -1]
  ['fromPlywoodStartPoint', 1]
);

class DTXBearingWall extends CommonItem{
  constructor(){
    super();
    this.clear();
    this.pointCount = 2;
  }

  assign(data, ln) {
    this.layerNumber        = toInt({'str': data[ln+1], 'pos':  0, 'len':  5});
    this.shurui             = toEnm({'str': data[ln+1], 'pos':  5, 'len':  5}, shuruiEnum);
    this.toritsukeHoukou    = toEnm({'str': data[ln+1], 'pos':  10, 'len':  5}, toritsukeHoukouEnum);
    this.bairitsu           = toDbl({'str': data[ln+1], 'pos':  15, 'len':  10})
    this.addCoordinate(data, ln+2, false);
  }

  clear(){
    super.clear();
    this.shurui = {};
    this.toritsukeHoukou = {};
    this.bairitsu = 0;
  }
}

class DTXBearingWallItem extends DTXItem{
  constructor(){
    super()
    this.rigidityComputation = new RigidityComp();
    this.gravityComputation = new GravityComp();
    this.eccentricityRatio = new EccentricityRatio();
    this.bearingwall = new BearingWall();
  }

  load(data, options){
    
    let vItemCount = this.count(data);
    for (let i=1; i<=vItemCount; i++) {
      let item = new DTXBearingWall()
      item.assign(data, this.ln);
      item.setLayerName(options.houseStructure);
      this.addItem(item);
      this.ln += 2; 
    }

    this.compute(options);
    this.exportDXF(options);
  }

  compute(options){
    Object.assign(options, {bearingWall: this});
    this.rigidityComputation.compute(options);
    this.gravityComputation.compute(options);
    this.eccentricityRatio.compute({
      houseStructure: options.houseStructure,
      rigidity: this.rigidityComputation,
      gravity: this.gravityComputation
    });
    Object.assign(options, {});
    this.bearingwall.compute({
      houseStructure: options.houseStructure,
      gaisyuu: options.gaisyuu,   
      coordinate: options.coordinate,
      rigidity: this.rigidityComputation
    })
  }

  exportDXF(options){

    let dxfStandard = new DxfEccentricityCalculationTable(
      this.gravityComputation.standard,
      this.rigidityComputation.standard, 
      this.eccentricityRatio.standard);
    dxfStandard.exportDXF('Standard', options)

    let dxfHigher= new DxfEccentricityCalculationTable(
      this.gravityComputation.higher,
      this.rigidityComputation.higher, 
      this.eccentricityRatio.higher);
      dxfHigher.exportDXF('Higher', options)
  }
}

module.exports = {
  DTXBearingWall,
  DTXBearingWallItem
}