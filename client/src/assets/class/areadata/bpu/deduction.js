import Balcony from './balcony'

export default class Deduction extends Balcony{
    constructor(){
        super()
        this.area = '';
        this.material = '';
        this.description = '';
        this.fl  = '';
        this.shape = '';
        this.h1 = '';
        this.h2 = '';
        this.base = '';
        this.pitch = '';
        this.forDelete = false
    }

    ///computes the deduction based on the returned shape
    computeDeduction(item){
        let h1 = item.h1.length != 0 ? parseFloat(item.h1) * this.module : 0
        let h2 = item.h2.length != 0 ? parseFloat(item.h2) * this.module : 0
        let base = item.base.length != 0 ? parseFloat(item.base) * this.module : 0
        let pitch = item.pitch.length != 0 ? parseFloat(item.pitch) / 10 : 0

        let area1 = base * 0.225
        let area2 = 0

        if( item.shape == 'Triangle' ){
            area2 = ( ( base * h1 ) * pitch ) / 2
        }else if( item.shape == 'Rectangle' ){
            area2 = ( base * h1 ) * pitch
        }else{
            area2 = ( ( base * ( h1 + h2 ) ) * pitch ) / 2
        }


        item.area = -Math.abs(area1 + area2)
        item.area = this.round(item.area, 5)
    }
}