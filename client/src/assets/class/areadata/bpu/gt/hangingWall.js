import BelowEaves from "./belowEaves";
import { HangingWall } from '../../../../../assets/BPU/Tables'

class HW{
    constructor(name){
        this.hwall = name;
        this.locationLine = '';
        this.locationType = '';
        this.outsideGrid = '';
        this.outsideHeight = '';
        this.outsideArea = '';
        this.openingGrid = '';
        this.openingDeduct = '';
        this.openingHeight = '';
        this.openingArea = '';
        this.tarekabeGrid = '';
        this.tarekabeDeduct = '';
        this.tarekabeHeight = '';
        this.tarekabeArea = '';
        this.insideGrid = '';
        this.insideHeight = '';
        this.insideArea = '';
        this.totalArea = '';
    }
}

export default class HWall extends BelowEaves{
    constructor(){
        super()
        this.hangingWallData = [];
    }

    //method called upon user changes on Hanging Wall quantity
    checkHW(quantity){
        let q = parseInt(quantity)

        if( this.hangingWallData.length > 0 ){

            if( q == 0 ){
                //if user input is Zero
                this.hangingWallData = []
            }else if( q > this.hangingWallData.length ){

                //if user input is greater than the existing number of records, add only the difference
                let diff = q - this.hangingWallData.length
                for( let i=1; i<=diff; i++ ){
                    this.addHW(`HW${this.hangingWallData.length+1}`)
                }

            }else if( q < this.hangingWallData.length ){

                //if user input is less than the existing number of records, remove only the difference
                let diff = this.hangingWallData.length - q
                for( let i=1; i<=diff; i++ ){
                    this.hangingWallData.pop()
                }

            }

        }else{

            //if there are no existing records
            for( let i=1; i<=q; i++ ){
                this.addHW(`HW${i}`)
            }

        }
    }

    //method called to add new hanging wall class, name is based on quantity
    addHW(name){
        let item = new HW(name)
        this.hangingWallData.push(item)
    }

    //sets the height of each HW part from HangingWall table
    hwType(item){
        item.outsideHeight = HangingWall.HW[`${item.locationLine}-${this.kanabakari}-${this.houseLevel}`].Outside
        item.openingHeight = HangingWall.HW[`${item.locationLine}-${this.kanabakari}-${this.houseLevel}`].Opening
        item.tarekabeHeight = HangingWall.HW[`${item.locationLine}-${this.kanabakari}-${this.houseLevel}`].タレ壁
        item.insideHeight = HangingWall.HW[`${item.locationLine}-${this.kanabakari}-${this.houseLevel}`].Inside

        let line = item.locationLine.slice(-2)

        //deductions are based on hanging wall type and location
        if( item.locationType == 'Box' ){
            item.openingDeduct = -0.168
            item.tarekabeDeduct = line == '1L' ? '' : -0.168
        }else{
            item.openingDeduct = ''
            item.tarekabeDeduct = ''
        }

        this.computeHW(item)
    }

    //computes all parts of the hanging wall
    computeHW(item){
        //checks if each grid have values, fills them with zero if none.
        item.outsideArea = item.outsideGrid ? (parseFloat(item.outsideGrid) * this.module) * item.outsideHeight : 0
        item.insideArea = item.insideGrid ? (parseFloat(item.insideGrid) * this.module) * item.insideHeight : 0
        item.openingArea = item.openingGrid ? (parseFloat(item.openingGrid) * this.module) : 0
        item.tarekabeArea = item.tarekabeGrid ? (parseFloat(item.tarekabeGrid) * this.module) : 0

        //checks and includes if there are necessary deductions
        item.openingArea = item.openingDeduct ? (item.openingArea + item.openingDeduct) * item.openingHeight 
            : item.openingArea * item.openingHeight
        item.tarekabeArea = item.tarekabeDeduct ? (item.tarekabeArea + item.tarekabeDeduct) * item.tarekabeHeight 
            : item.tarekabeArea * item.tarekabeHeight
        
        
        let line = item.locationLine.slice(-2)
        item.outsideArea = this.round(item.outsideArea, 3)
        item.openingArea = -Math.abs(this.round(item.openingArea, 3))
        item.tarekabeArea = line == '1L' ? '-' : this.round(item.tarekabeArea, 3)
        item.insideArea = this.round(item.insideArea, 3)

        item.totalArea = item.outsideArea + item.openingArea + item.insideArea
        item.totalArea = item.tarekabeArea != '-' ? item.tarekabeArea + item.totalArea : item.totalArea
        item.totalArea = this.round( item.totalArea, 3)
    }

    ///for Wall Data
    totalHWallData(params){
        return this.hangingWallData.filter(o => parseInt(o.locationLine.slice(0,1)) == params)
            .map(o => o.totalArea).reduce( (a, b) => a + b, 0)
    }
}