module.exports = class Enumeration{
  static newEnum(...enumObj){
    
    let ord = 0;
    let newEnum = {}
    
    for (const enumVal of enumObj){

      if (enumVal.length === 1){
        if (typeof enumVal[0] === 'string'){
          let newVal = {};
          newVal[enumVal[0]] = enumVal[0]
          newVal[String(ord)] = ord
          
          newEnum[enumVal[0]] = newVal
          newEnum[String(ord)] = newVal
        }
      }else{
        let keystr = 0;
        let newVal = {};
        for (let i=0; i<enumVal.length; i++){
          if (typeof enumVal[i] === 'string'){
            newVal[enumVal[i]] = enumVal[i] 
            keystr = i;
          }else if(typeof enumVal[i] === 'number'){
            ord = enumVal[i]
            newVal[String(ord)] = ord 
          }
        }
        newEnum[enumVal[keystr]] = newVal
        newEnum[String(ord)] = newVal
      }
      ord++
    }
    return Object.freeze(newEnum);
  }

  static getEnumValue(Enums, value){
    return Enums.value
  }
}



  
