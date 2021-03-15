import DTXItem from "../dtxitem";

export default class DTXPlanDetail extends DTXItem{
  constructor(extract){
    super(extract);
    delete this.items
  }
}