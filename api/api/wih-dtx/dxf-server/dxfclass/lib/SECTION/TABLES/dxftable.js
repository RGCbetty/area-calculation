const Layers = require('./LAYERS/dxflayers');
const LTypes = require('./LTYPE/dxfltypes');
const Styles = require('./STYLE/dxfstyles');

class Table{
  static newTable(table = []){
   
    let name = '';
    let values = [];
    
    if (table.length > 0){
      name = table[0]
      if (table.length == 2) 
        values = table[1]
    }
    
    if (Table.isLAYER(name))
      return Layers.newLayers(values);
    else if(Table.isLTYPE(name))
      return LTypes.newLTypes(values);
    else if (Table.isSTYLE(name))
      return Styles.newStyles(values);
  }

  static isLAYER(name){
    return name == 'LAYER'
  }

  static isLTYPE(name){
    return name == 'LTYPE'
  }

  static isSTYLE(name){
    return name == 'STYLE'
  }
}

module.exports = class Tables extends Array{
  /**
  * @param {array} tables Array of "two elements arrays". 
  * [  
  *   [ value1_TableName, [value1_value1, value1_value2] ], 
  *   [ value2_TableName, [value2_value1, value2_value2] ]
  * ]
  */
  constructor(tables = []){
    super();
    tables.forEach(table => {
      this.addTable( Table.newTable(table));
    })
  }

  static newTables(...tables){
    return new Tables(tables)
  }

  addTable(table){
    super.push(table)
  }

  toDXFString(i){
    let result = '';

    if (i == 0) 
      result = `0\r\nTABLE\r\n`
    else
      result = `  0\r\nTABLE\r\n`

    this.forEach( table => {
      result += table.toDXFString();
    })

    if (i == 0) 
      result += `0\r\nENDTAB\r\n`
    else
      result += '  0\r\nENDTAB\r\n'

    return result
  }
}