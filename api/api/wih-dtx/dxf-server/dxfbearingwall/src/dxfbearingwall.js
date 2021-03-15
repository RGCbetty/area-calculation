//const DxfFile = require('../../dxfclass');
const DxfGravityTable = require('../../dxfbearingwall/src/dxfgravitytable')
const path = require('path');
const mathEx = require('./../../../cadmodule/mathex')


module.exports = class DxfBearingWall extends DxfGravityTable{
  constructor(){
    super()
  }

  drawTable(){

  }

  drawRigidityTemplate(rigValue){

  }

  drawECCTemplate(eccValue){
    const Dtx = require('../../../../wih-dtx');
    const eccDraw = new DxfBearingWall();

    let ecc = new Dtx({
      extract: ['line', 'text']
    });

    ecc.loadFromFile(path.join(path.dirname(__dirname), 'dtxtemplate/ecc.dtx' ));

    ecc.line.items.forEach(ln => {
      eccDraw.drawLine(ln.dPoint[0].dX, ln.dPoint[0].dY, ln.dPoint[1].dX, ln.dPoint[1].dY) 
    })

    ecc.text.items.forEach(tx => {
      let value = ''
      if (tx.materialCode){
        let val = tx.materialCode.split('-')
        if (typeof eccValue[val[0]][val[1]][val[2]] == 'number')
          value = mathEx.round(eccValue[val[0]][val[1]][val[2]], 3).toFixed(3)
        else
          value = eccValue[val[0]][val[1]][val[2]]
      }else{
        value = tx.text
      }
      eccDraw.drawText(tx.dPoint[0].dX, tx.dPoint[0].dY, value)
    })

    //console.log(eccDraw.sections[3])

    eccDraw.exportFile(__dirname + 'sample.dxf');
      
  
  }

}