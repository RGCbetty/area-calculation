const toDbl = (options) => {
  if ( ('pos' in options) && ('len' in options) ) { 
    return parseFloat( options.str.substring(options.pos, options.pos + options.len ).trim() );
  }else{
    return parseFloat( options.str.trim() )
  }
}

const toBul = (options) => {
  if ( ('pos' in options) && ('len' in options) ) { 
    return Boolean( parseInt( options.str.substring(options.pos, options.pos + options.len ).trim() ));
  }else{
    return Boolean( parseInt( options.str.trim() ) )
  }
}

const toInt = (options) => {
  if ( ('pos' in options) && ('len' in options) ) { 
    return parseInt( options.str.substring(options.pos, options.pos + options.len ).trim() );
  }else{
    return parseInt( options.str.trim() )
  }
}

const toStr = (options) => {
  if ( ('pos' in options) && ('len' in options) ) { 
    return options.str.substring(options.pos, options.pos + options.len ).trim()
  }else{
    return options.str.trim()
  }
}

const toEnm = (options, enumObj = {}) => {
  
  let enumKey = '';
  
  if (typeof options === 'object'){
    if ( ('str' in options ) && ('pos' in options) && ('len' in options) )
      enumKey = toInt(options)
  }else if (typeof options === 'string'){
    enumKey = options 
  };

  if ( (enumKey) && (enumObj) ){
    for (const key in enumObj){
      for (const key2 in enumObj[key]){
        if (enumObj[key][key2] === enumKey){
          return enumObj[key];
        }
      }
    }
  }
  return {}
}

const itemCount = (str = '') => {
  return parseInt( str.substring(6, 11).trim() );
}

module.exports = {
  toDbl,
  toBul,
  toInt,
  toStr,
  toEnm,
  itemCount
}
