import roofDeduct from "./roofDeduct";
import getAreaOpening from '../../../../BPU/dtxtategutables'

export default class Sash extends roofDeduct{
    constructor(){
        super()
        this.floor = '';
        this.quantity = '';
        this.data = [];
        this.area = ''
        this.forDelete = false
    }

    computeSash(item){
        let w = item.width ? parseFloat(item.width) : 0;
        let h = item.height ? parseFloat(item.height) : 0;

        item.area = getAreaOpening(w, h)
        item.area = this.round(item.area, 5)
    }
}
