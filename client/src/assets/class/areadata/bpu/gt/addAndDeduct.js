import HWall from "./hangingWall";

export default class gtAddDeduct extends HWall{
    constructor(){
        super()
        this.type = '';
        this.withDeduct = '';
        this.meter = '';
        this.meter2 = '';
        this.base = '';
        this.width = '';
        this.height = '';
        this.pitch = '';
        this.quantity = '';
        this.baseDeduct = '';
        this.quantityDeduct = '';
        this.area = 0;
        this.floor = ''
        this.forDelete = false
    }

    clearDeduct(item){
        item.withDeduct = false;
        item.meter = '';
        item.meter2 = '';
        item.base = '';
        item.width = '';
        item.height = '';
        item.pitch = '';
        item.quantity = '';
        item.baseDeduct = '';
        item.quantityDeduct = '';
        item.area = 0;
        item.floor = ''
        item.forDelete = false
    }

    computeGTadd(item){
        let type = item.type.slice(-4)
        let m = item.meter ? parseFloat(item.meter) : 0
        let m2 = item.meter2 ? parseFloat(item.meter2) : 0
        let t = item.base ? parseFloat(item.base) * this.module : 0
        let w = item.width ? parseFloat(item.width) * this.module : 0
        let p = item.pitch ? parseFloat(item.pitch) / 10 : 0
        let q = item.quantity ? parseFloat(item.quantity) : 0
        let h = item.height ? parseFloat(item.height) : 0
        let dT = item.baseDeduct ? parseFloat(item.baseDeduct) * this.module : 0
        let dQ = item.quantityDeduct ? parseFloat(item.quantityDeduct) : 0

        if( type == 'Roof' || type == ' Tri' ){
    
            item.area = ( ( ( t * t ) * p ) / 2 ) * q

            if( item.withDeduct == true ){

                let deduct = ( ( ( dT * dT ) * p ) / 2 ) * dQ
                item.area = item.area - deduct

            }

        }else if( type == 'ngle' || type == ' Rec' ){

            item.area = ( ( t *  w ) * p ) * q

        }else if( type == 'apet' ||  type == 'kabe' || type == 'rden' ){
            
            item.area = ( t * h ) * 2

        }else if( type == 'tter' ){

            item.area = ( t - 0.168 ) * h

        }else if( type == 'ning' ){

            item.area = ( m * m2 ) * 2
            
        }
        
        else{

            item.area = ( ( t - 0.168 ) * 0.15 ) * 2
            
        }
        
        item.area = this.round(item.area, 3)
    }
}