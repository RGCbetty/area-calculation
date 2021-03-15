import DTXItem from "../dtxitem";

export default class DTXTateguEntities extends DTXItem{
  constructor(extract){
    super(extract);

    delete this.items

    this.naibu = [];
    this.gaibu = [];
    this.genkan = [];
  }
}