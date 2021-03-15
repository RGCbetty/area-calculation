import DTXItem from '../dtxitem'

export default class DTXPlanInformationItem extends DTXItem{
  constructor(extract){
    super(extract)
    delete this.items
  }
  
}

