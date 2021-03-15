const Section = require('./dxfsection');
const Headers = require('./HEADER/dxfheaders');
const Tables = require('./TABLES/dxftables');
const Blocks = require('./BLOCKS/dxfblocks');
const Entities = require('./ENTITIES/dxfentities');

module.exports = class Sections extends Array{
  constructor(){
    super()

    const defLayers = require('./TABLES/LAYERS/dxfdefaultlayer');
    // const defLTypes = require('./TABLES/LTYPE/dxfdefaultltype');
    // const defStyles = require('./TABLES/STYLE/dxfdefaultstyle');

    this.newSection('HEADER', 
      Headers.newHeaders(['EXTMIN'], ['EXTMAX'], ['LIMMIN'], ['LIMMAX'], ['INSBASE'], ['LTSCALE'])
    );
    this.newSection('TABLES', 
      Tables.newTableLists(
        ['LAYER', defLayers.LAYERS])
        // ['LTYPE', defLTypes.LTYPES],
        // ['STYLE', defStyles.STYLE]),
    );
    this.newSection('BLOCKS', Blocks.newBlocks())
    this.newSection('ENTITIES', Entities.newEntities());
  }

  newSection(name, value){
    super.push(Section.newSection(name, value))
  }

  toDXFString(){
    let result = '';
    this.forEach(section => {
      result += '0\r\nSECTION\r\n'
      result += section.toDXFString();
      result += '0\r\nENDSEC\r\n'
    })
    return result
  }

}

