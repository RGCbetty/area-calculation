class DTXPlanInformationItem{

  constructor(){
    this.filename = '';
    this.dataname = '';
    this.code1 = '';
    this.code2 = '';
    this.memo1 = '';
    this.memo2 = '';
    this.memo3 = '';
    this.memo4 = '';
    this.memo5 = '';
    this.memo6 = '';
    this.memo7 = '';
  }

  load(data){
    this.filename = data[2];
    this.dataname = data[3];
    this.code1 = data[4];
    this.code2 = data[5];
    this.memo1 = data[6];
    this.memo2 = data[7];
    this.memo3 = data[8];
    this.memo4 = data[9];
    this.memo5 = data[10];
    this.memo6 = data[11];
    this.memo7 = data[12];
  }

  clear(){
    this.filename = '';
    this.dataname = '';
    this.code1 = '';
    this.code2 = '';
    this.memo1 = '';
    this.memo2 = '';
    this.memo3 = '';
    this.memo4 = '';
    this.memo5 = '';
    this.memo6 = '';
    this.memo7 = '';
  }
}

module.exports = DTXPlanInformationItem
