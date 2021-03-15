import {BalconyWall} from '../../../../assets/BPU/Tables'

export default class Balcony{
    constructor(){
        ///added fields for basic information needed in computation
        this.houseLevel = 0;
        this.kanabakari = 0;
        this.module = 0;
        this.fireproofType = '',
        /////////////
        this.floorLevel = '',
        this.balconyName = '',
        this.type = '',
        this.wallUnderBalcony1 = '',
        this.wallUnderBalcony2 = '',
        this.outsideMaterial = '',
        this.insideMaterial = '',
        this.outsideGrid = '',
        this.insideGrid = '',
        this.outsideMeter = '',
        this.insideMeter = '',
        this.outsideHeight = '',
        this.insideHeight = '',
        this.outsideArea = '',
        this.insideArea = '',
        this.jobsched = ''
        this.forDelete = false
    }

    ///returns an array of objects with mutated fields
    balconyList(array){
        return array.map(o => ({
            floorLevel: o.layerName,
            balconyName: o.name,
            type: o.balconyType
        }))
    }

    ///sets the automatic values and height based on basic house information
    balconyTile(item){
        if( item.type.length != 0 ){
            item.wallUnderBalcony1 = 'GT'
            item.wallUnderBalcony2 = '-'
            item.outsideMaterial = 'GT'
            item.insideMaterial = 'GT'

            if( item.floorLevel.length != 0 ){
                let fl = item.floorLevel == 'PH' ? 'PH' : `${item.floorLevel.slice(0,1)}F`
                let tile = 'TC'
                let name = `${this.kanabakari}-${this.houseLevel}.${fl}`
                item.outsideHeight = BalconyWall.OW[item.type][tile][name]
                item.insideHeight = BalconyWall.IW[item.type][tile][name]
                
                this.computeBalcony(item)
            }
        }
    }

    //computes the balcony area for both inside and outside wall
    computeBalcony(item){
        
        let grid = item.outsideGrid.length != 0 ? parseFloat(item.outsideGrid) * this.module : 0
        let meter = item.outsideMeter.length != 0 ? parseFloat(item.outsideMeter) : 0
        let height = item.outsideHeight.length != 0 ? parseFloat(item.outsideHeight) : 0

        item.outsideArea = ( grid + meter) * height
        item.outsideArea = this.round(item.outsideArea, 3)

        let grid2 = item.insideGrid.length != 0 ? parseFloat(item.insideGrid) * this.module : 0
        let meter2 = item.insideMeter.length != 0 ? parseFloat(item.insideMeter) : 0
        let height2 = item.insideHeight.length != 0 ? parseFloat(item.insideHeight) : 0

        item.insideArea = ( grid2 + meter2 ) * height2
        item.insideArea = this.round(item.insideArea, 3)
        
    }

    ///added utility function; returns a rounded value usually used on total area.
    /////Accepts two parameters; the value to be processed and the desired number of decimal points.
    round(value, decimals){
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }

    
}