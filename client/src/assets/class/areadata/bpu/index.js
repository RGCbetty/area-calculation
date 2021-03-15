import Porch from './porch'

class Summary {
    constructor(){
        this.balconyOutSum = [];
        this.balconyInSum = [];
        this.porchSum = [];
    }
}
  
export default class BPU extends Porch{
  constructor(){
    super()
    this.balconyData = [];
    this.deductionData = [];
    this.porchData = [];
    this.summary = new Summary;
  }

  //computes the total area calculation for BPU part
  areaSummary(){
      //function is only used as an extension for sorting
    function compare(a, b){
        let item1 = a.specs.toUpperCase();
        let item2 = b.specs.toUpperCase();

        let comparison = 0;
        comparison = item1 > item2 ? 1 : -1;

        return comparison
    }

    //balcony outside wall area is filtered from balcony data
    this.summary.balconyOutSum = this.balconyData.map(o => ({
        specs: `${o.floorLevel}/${o.balconyName}/OUTSIDE`,
        material: o.outsideMaterial,
        data: o.outsideArea
    }))
    //filtered balcony data is compared and calculated with existing deduction records
    this.summary.balconyOutSum.forEach(val => {
        this.deductionData.forEach(rec => {
            val.data = ((val.specs == rec.fl) && val.material == rec.material)
            ? val.data + rec.area : val.data
        })
    })
    this.summary.balconyOutSum.sort(compare)

    //balcony inside wall area is filtered from balcony data
    this.summary.balconyInSum = this.balconyData.map(o => ({
        specs: `${o.floorLevel}/${o.balconyName}/INSIDE`,
        material: o.insideMaterial,
        data: o.insideArea
    }))
    this.summary.balconyInSum.sort(compare)

    //porch area is extracted from porch records by filtering the array of objects, mutating them into an array of values using map,
    /////and finally reducing(computing) them into a single value. Returns two objects: GT and SD
    this.summary.porchSum = []
    let porch1 = {
        specs: 'Porch Area',
        material: 'GT',
        data: this.porchData.filter(o => o.material == 'GT')
            .map(o => o.area).reduce((a, b) => a + b, 0)
    }
    this.summary.porchSum.push(porch1)
    let porch2 = {
        specs: 'Porch Area',
        material: 'SD',
        data: this.porchData.filter(o => o.material == 'SD')
            .map(o => o.area).reduce((a, b) => a + b, 0)
    }
    this.summary.porchSum.push(porch2)

  }

  ///for Wall Summary
  getDataFromBalcony(field, params){
    return this.summary[field].filter(o => o.specs.slice(0,1) == params)
    .map(o => o.data).reduce((a, b) => a + b, 0)
  }

  ///for Wall Summary
  porchTotalData(params){
    let normalItems = this.porchData.filter(o => o.jobsched == 'Normal')

    return normalItems.filter(o => o.location.slice(0,1) == params)
    .map(o => o.area).reduce((a, b) => a + b, 0)
}

}