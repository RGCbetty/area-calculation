import DTXHeader from './dtxheader'

export default class DTXFile extends DTXHeader{
  constructor(extractAll = false){
    super(extractAll)
  }
}