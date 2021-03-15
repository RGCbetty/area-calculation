
export default class Total{
    constructor(){
        this._flatRoof = {
          name: '',
          value: 0
        }
        this._slopeRoof = {
          name: '',
          value: 0
        }
    }
    get flatRoof(){
      return Number(Math.round((this._flatRoof.value)+'e'+3)+'e-'+3)
    }
    set flatRoof(value){
      this._flatRoof.value = value
    }
    get slopeRoof(){
      return Number(Math.round((this._slopeRoof.value)+'e'+3)+'e-'+3)
    }
    set slopeRoof(value){
      this._slopeRoof.value = value
    }
    compute(item,pitch){
      let flatRoof=0,slopeRoof=0
      for(let a=1;a<=3;a++){
          for(let b=1;b<=3;b++){
           let p = pitch[`${a}F`][`p${b}`].value

           if(p>1) slopeRoof+= item[`${a}F`][`p${b}`].value;
           else if(p<=1) flatRoof+= item[`${a}F`][`p${b}`].value;
          }
      }
      this._flatRoof.name = 'Flat Roof'
      this._flatRoof.value = Number(Math.round((flatRoof)+'e'+3)+'e-'+3)
      this._slopeRoof.name = 'Slope Roof'
      this._slopeRoof.value = Number(Math.round((slopeRoof)+'e'+3)+'e-'+3)
   }
  }