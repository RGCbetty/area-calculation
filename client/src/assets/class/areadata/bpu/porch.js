import Deduction from './deduction'
import {HangingWall, BalconyWall, Column } from '../../../../assets/BPU/Tables'

export default class Porch extends Deduction{
    constructor(){
        super()
        this.location = '',
        this.size = '',
        this.material = '',
        this.jobsched = '',
        this.height = '',
        this.irregular = false,
        this.area = ''
    }

    //gets the height of the independent column on tables based on it's location
    porchHeight(item){
        let type = item.location.length > 5 ? 'Balcony' : 'HW'
        if ( type == 'Balcony' ){
            let floor = `${item.location.slice(0,1)}F`
            let tile = 'TC'
            let name = `${this.kanabakari}-${this.houseLevel}.${floor}`
            item.height = BalconyWall.BB[tile][name]
        }else{
            let hwall = `${item.location}-240-3F`
            item.height = HangingWall.HW[hwall].Opening
        }
        this.porchCompute(item)
    }

    //computes total area
    porchCompute(item){
        if( item.height && item.quantity ){
            let area = 0
            if( item.irregular ){
                //for irregular columns
                area = item.size > 0 ? ( parseFloat(item.size) ) * parseFloat(item.height) : 0
                item.area = item.quantity.length > 0 ? area * parseFloat(item.quantity) : 0
            }else{
                //regular columns have prepared data on Column Table
                let width = Column.COL[item.size].area
                area = width * parseFloat(item.height)
                item.area = area * parseFloat(item.quantity)
            }
            item.area = this.round(item.area, 3)
        }
        this.porchJobsched(item)
    }

    porchJobsched(item){
        //automatically sets the jobsched of Porch based on it's size and floor level.
        if( !item.irregular && item.material == 'GT' ){
            if( parseInt(item.size) == 303 ){
                item.jobsched = item.location.slice(0,2) == '1F' ? 'Unit' : 'Normal'
            }else{
                item.jobsched = 'Normal'
            }
        }else{
            item.jobsched = 'Normal'
        }
    }
}