import DTXItem from "../dtxitem";

export default class DTXBearingWall extends DTXItem{
  constructor(extract){
    super(extract);
    this.roofType = '';
    this.bearingwall = {
      floors: []
    }
  }
}