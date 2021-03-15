const {DTXItem} = require('../dtxbase')
const DTXYaneEntity = require('./dtxyaneentity');
const cad2d = require('../../cadmodule/cad2d')
const { round } = require('../../cadmodule/mathex')

const { toDbl, toInt } = require("../dtxfunct");

module.exports = class DTXYaneEntities extends DTXItem{
  constructor(){
    super()
    this.honmune = {
      total: 0
    }
    this.sumimune = {
      total:0
    };

  }

  load(data, options) {
    
    let vItemCount = this.count(data);
    for(let i=1; i<=vItemCount; i++){
      
      let vPC     = toInt({'str': data[this.ln+2], 'pos':  5, 'len':  5})
      let vPitch  = toDbl({'str': data[this.ln+3], 'pos': 40, 'len': 10})
      
      if(vPitch > 0){
        let item = new DTXYaneEntity();
        item.assign(data, this.ln, options);
        this.addItem(item);
      }
      
      this.ln += ( vPC + 8 );
    
    }

    this.checkHonmune();
    
  }

  checkHonmune(){
    
    for (let i = 0; i<this.items.length-1; i++){

      let currentYane = this.items[i];

      for (let j = i+1; j<this.items.length; j++ ){

        let nextYane = this.items[j];

        if (currentYane.layerNumber === nextYane.layerNumber){

          // honmune
          for (let currentEave of currentYane.upperEaves ){

            if (currentEave.isMuneType) continue;
  
            for (let nextEave of nextYane.upperEaves){
              
              if (nextEave.isMuneType) continue;
  
              let cP = cad2d.centerPoint_2D( currentEave.dPoint1, currentEave.dPoint2 );
              if ( cad2d.pointLiesOnLine_2D(cP, nextEave.dPoint1, nextEave.dPoint2) ){
                currentEave.isMuneType = true;

                if ( cad2d.lineDistance_2D( currentEave.dPoint1, currentEave.dPoint2 ) === cad2d.lineDistance_2D( nextEave.dPoint1, nextEave.dPoint2 )){
                  nextEave.isMuneType = true
                }

                let len = cad2d.lineDistance_2D( currentEave.dPoint1, currentEave.dPoint2 ) / 1000;

                if ( currentYane.layerName in this.honmune  ){
                  this.honmune[currentYane.layerName].push(len);
                }else{
                  let val = {
                    [currentYane.layerName]: [len]
                  }
                  Object.assign(this.honmune, val)
                }

                this.honmune.total += len;
              }
  
            }

          }

          // sumimune
          for (let currentEave of currentYane.slantedEaves ){

            if (currentEave.isMuneType) continue;

            for (let nextEave of nextYane.slantedEaves){

              if (nextEave.isMuneType) continue;

              let cP = cad2d.centerPoint_2D( currentEave.dPoint1, currentEave.dPoint2 );
              if ( cad2d.pointLiesOnLine_2D(cP, nextEave.dPoint1, nextEave.dPoint2) ){
                currentEave.isMuneType = true;
                
                if ( cad2d.lineDistance_2D( currentEave.dPoint1, currentEave.dPoint2 ) === cad2d.lineDistance_2D( nextEave.dPoint1, nextEave.dPoint2 )){
                  nextEave.isMuneType = true
                }

                let len = round( cad2d.lineDistance_2D( currentEave.dPoint1, currentEave.dPoint2 ) / 1000 , 3) ;

                if ( currentYane.layerName in this.sumimune  ){
                  if ( currentYane.pitch in this.sumimune[currentYane.layerName]  ){
                    this.sumimune[currentYane.layerName][currentYane.pitch].values.push(len);
                  }else{
                    let val = {
                      [currentYane.pitch]: {
                        values: [len],
                        total: 0 
                      }
                    }
                    
                    Object.assign(this.sumimune[currentYane.layerName], val)
                  }
                }else{

                  let val = { 
                    [currentYane.layerName] : {
                      [currentYane.pitch]: {
                        values: [len],
                        total: 0
                      }
                    }
                  }
                  Object.assign(this.sumimune, val)
                }

              }
              
            }
            
          }
        }
      }
    }

    //Summation process
    let sumimuneValues = Object.entries(this.sumimune)
    for ( let sumiValue of sumimuneValues ){

      if (sumiValue[0] === 'total') continue;

      let floor = {
        total: 0
      }

      let pitchValues = Object.entries(sumiValue[1])

      for (let pitchValue of pitchValues){
        pitchValue[1].total = pitchValue[1].values.reduce( ( total, value ) => total + value ) * round( Math.sqrt( ( ( Number( pitchValue[0] ) ** 2 ) / 100 ) + 2 ), 3)
        floor.total += pitchValue[1].total;
      }

      Object.assign( this.sumimune[sumiValue[0]], floor ) 
      
      this.sumimune.total += floor.total
    }
  }

}