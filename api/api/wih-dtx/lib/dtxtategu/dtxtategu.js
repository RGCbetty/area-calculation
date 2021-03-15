import { CommonItem } from "../dtxheadertype";

class DTXTategu extends CommonItem{

  constructor(){
    super();
    this.clear();
  }

  assign(data, ln) {
    this.addCommonItem(data, ln, true);
   
    this.addCoordinate(data, ln+3, true);
    
  }

  clear(){
    super.clear();
  }

}

class TateguProperty extends CommonItem{
  constructor(){
    super()
  }

  load(data, options){
    let vItemCount = this.count(data);

    for (let i=1; i<=vItemCount; i++){
      let item = new DTXTategu();
      item.assign(data, this.ln);
      item.setLayerName(options.houseStructure);
      this.addItem(item);
      this.ln += 7
    }
  }

  
}

class GenkanDoa extends TateguProperty {
  constructor(){
    super()
  }

}

class GaibuDoa extends TateguProperty {
  constructor(){
    super()
  }

}

class NaibuDoa extends TateguProperty {
  constructor(){
    super()
  }

}

