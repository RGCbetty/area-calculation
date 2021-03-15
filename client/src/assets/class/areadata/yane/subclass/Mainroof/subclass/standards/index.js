
class Pitch  {
  constructor(){
    this.value = 0
  }
  round(){
    return Number(Math.round(this.value+'e'+3)+'e-'+3);
  }
}

class Floor {
  constructor(){
    this.p1 = new Pitch();
    this.p2 = new Pitch();
    this.p3 = new Pitch();
  }
 
}

class Standards {
  constructor(){
    this['1F'] = new Floor();
    this['2F'] = new Floor();
    this['3F'] = new Floor();
    this['PH'] = new Pitch;
  }
  get sum1F(){
    const toSum = ( () => {
      return {
        total(value){
            return Object.keys(value).map(key => value[key].value).reduce((previous, current) => previous + current);
        }
      }
    })();
    return Number(Math.round(toSum.total(this["1F"])+'e'+3)+'e-'+3) 
     
  //  return Object.keys(this).map(key => val[key].value).reduce((previous, current) => previous + current);
  }
  get sum2F(){
    const toSum = ( () => {
      return {
        total(value){
            return Object.keys(value).map(key => value[key].value).reduce((previous, current) => previous + current);
        }
      }
    })(); 
    return Number(Math.round(toSum.total(this["2F"])+'e'+3)+'e-'+3) 
  //  return Object.keys(this).map(key => val[key].value).reduce((previous, current) => previous + current);
  }
  get sum3F(){
    const toSum = ( () => {
      return {
        total(value){
            return Object.keys(value).map(key => value[key].value).reduce((previous, current) => previous + current);
        }
      }
    })(); 
    return Number(Math.round(toSum.total(this["3F"])+'e'+3)+'e-'+3) 
  //  return Object.keys(this).map(key => val[key].value).reduce((previous, current) => previous + current);
  }
  get total(){
    return Number(Math.round((this.sum1F + this.sum2F + this.sum3F)+'e'+3)+'e-'+3)
  }
}


export {Standards, Floor, Pitch};