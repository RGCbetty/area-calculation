import BelowBalcony from "./belowbalcony";
import { BEaves } from '../../../../../assets/BPU/Tables'

class Direction{
    constructor(floor){
        this.floor = floor;
        this.south = '';
        this.east = '';
        this.north = '';
        this.west = '';
        this.all = '';
        this.irreg = '';
        this.height = '';
        this.area = 0;
    }
}

const others = [
    'PH',
    'Irreg',
    'Gar',
    'Fuj'
]

export default class BelowEaves extends BelowBalcony{
    constructor(){
        super()
        this.belowEavesData = [];
    }

    //loops and calls add method while generating a name per level and area
    getFloors(){
        this.belowEavesData = []
        let fl = +this.houseLevel.split('F')[0]
        for (let i =1; i <= fl; i++){
            this.addFloors( `${i}F` ) 
        }

        for (let other of others){
            this.addFloors( other ) 
        }

    }

    //add floors with height from tables
    addFloors(name){
        let item = new Direction(name)

        if( item.floor == 'Gar' ){
            item.height = BEaves.BE[`${this.kanabakari}-${this.houseLevel}`][`車庫-${this.fireproofType}`]
        }else if( item.floor == 'Fuj'){
            item.height = BEaves.BE[`${this.kanabakari}-${this.houseLevel}`]['風除室']
        }else if( item.floor == 'Irreg'){
            item.height = 2.68
        }else{
            item.height = BEaves.BE[`${this.kanabakari}-${this.houseLevel}`][item.floor]
        }

        this.belowEavesData.push( item )
    }

    //add and compute total area of eaves perimeter
    addAndCompute(item){
        //check if each location has a value, default into zero to avoid undefined values
        let s = item.south ? parseFloat(item.south) : 0
        let e = item.east ? parseFloat(item.east) : 0
        let n = item.north ? parseFloat(item.north) : 0
        let w = item.west ? parseFloat(item.west) : 0
        item.all = s + e + n + w
        let irr = item.irreg ? parseFloat(item.irreg) : 0

        //compute all sides with module and height for each location
        item.area = ( ( item.all * this.module ) + irr ) * item.height
        item.area = this.round(item.area, 3)
    }

    ///for Wall Data
    totalBEavesData(params){
        let level = this.houseLevel.slice(0,1)
        if( params == '1' ){

            if( level == params ){

                return this.belowEavesData.filter(o => o.floor == `${params}F` || o.floor == 'Irreg' || o.floor == 'Fuj' || o.floor == 'PH')
                    .map(o => o.area).reduce( (a, b) => a + b, 0)
            }else{

                return this.belowEavesData.filter(o => o.floor == `${params}F` || o.floor == 'Irreg' || o.floor == 'Fuj')
                    .map(o => o.area).reduce( (a, b) => a + b, 0)
            }

        }else if( level == params ){

            return this.belowEavesData.filter(o => o.floor == `${params}F` || o.floor == 'PH')
                .map(o => o.area).reduce( (a, b) => a + b, 0)

        }else{
            
            return this.belowEavesData.filter(o => o.floor == `${params}F` || o.floor.slice(0,1) == params)
                .map(o => o.area).reduce( (a, b) => a + b, 0)
        }

    }

}