const {DPoint} = require('./cadtypes')

module.exports = class Cal2D{
  
  static async GetOffsetPolyline(tP = [], offsetValue = 0, offsetToRight = false, isClosed = true){
    
    const GetRelayOffsetPoint = (tP = [], OffsetSize = 0, RoutateRight = false) => {
      
      let  tRetTempA = [];
      let  tRetTempB = [];
    
      let  tRet = [];
      let  tOffset = [];
    
      let  PL11, PL12, PL21, PL22 = new DPoint;
    
      let  intBound = 0;
      let intLoop = 0;  

      for (){
        
      }

    };
    
    let tRetTempA, tRetTempB = [];

    let tRet = [];
    let tOffset = [];
    
    let PL11, PL12, PL21, PL22 = new DPoint();

    let A1, B1, C1, A2, B2, C2 = 0;  

    let intBound = 0;
    let intLoop = 0;

    let StartPoint, LastPoint = new DPoint();

    if (isClosed) {
      if (tP.length >= 3 ){
        return GetRelayOffsetPoint(tP, OffSetValue, OffsetToRight);
      }
    }
    

  }

}