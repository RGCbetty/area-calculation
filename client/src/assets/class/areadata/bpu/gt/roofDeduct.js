import gtAddDeduct from "./addAndDeduct"

class Roof{
    constructor(pitch){
        this.shape = '';
        this.base = '';
        this.pitch = pitch;
        this.height = '';
        this.area = '';
    }
}

class Window{
    constructor(){
        this.height = '';
        this.width = '';
        this.area = '';
    }
}

export default class roofDeduct extends gtAddDeduct{
    constructor(){
        super()
        this.floor = '';
        this.pitch = '';
        this.quantity = '';
        this.data = [];
        this.area = '';
        this.forDelete = false
    }

    addShapeData(item, type){
        let q = parseInt(item.quantity)

        if( item.data.length > 0 ){

            if( parseInt(q) > item.data.length ){

                let diff = q - item.data.length
                for( let i=1; i<=diff; i++ ){
                    let newItem = type == 'Sash' ? new Window : new Roof(item.pitch)
                    item.data.push(newItem)
                }

            }else if( q < item.data.length ){

                let diff = item.data.length - q
                for( let i=1; i<=diff; i++ ){
                    item.data.pop()
                }

            }

        }else{

            for( let i=1; i<=parseInt(item.quantity); i++ ){
                let newItem = type == 'Sash' ? new Window : new Roof(item.pitch)
                item.data.push(newItem)
            }
        }
    }

    computeRoofDeduct(item){
        let b = item.base ? parseFloat(item.base) * this.module : 0
        let h = item.height ? parseFloat(item.height) * this.module : 0
        let p = item.pitch ? parseFloat(item.pitch) / 10 : 0

        let area1 = item.shape.slice(-1) == '+' ? b * 0.225 : b * 0.075
        let area2 = item.shape.slice(0,1) == 'T' ? ( ( b * h ) * p ) / 2 : ( b * h) * p

        item.area = area1 + area2
        item.area = this.round(item.area, 5)
    }

    getTotal(item){
        item.area = -Math.abs(item.data.map(o => o.area).reduce( (a, b) => a + b, 0))
        item.area = this.round(item.area, 5)
    }
    
}