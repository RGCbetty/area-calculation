const Tables = require('./dxftable');

module.exports = class TableLists extends Array{
  
  /**
  * @param {array} tableList Array of "two elements arrays". 
  * [  
  *   [ value1_TableName, [value1_value1, value1_value2] ], 
  *   [ value2_TableName, [value2_value1, value2_value2] ]
  * ]
  */
  constructor(tableList = []){
    super()
    tableList.forEach(tables => {
      this.addTables(Tables.newTables(tables)) 
    })
  }

  /**
  * @param {array} tableList Array of "two elements arrays". 
  * [  
  *   [ value1_TableName, [value1_value1, value1_value2] ], 
  *   [ value2_TableName, [value2_value1, value2_value2] ]
  * ]
  */
  static newTableLists(...tableList){
    return new TableLists( tableList)
  }

  addTables(tables){
    super.push(tables);
  }

  toDXFString(){
    let result = ''
    this.forEach( (tables, i) => {
      result += tables.toDXFString(i)
    })
    return result;
    
  }
}