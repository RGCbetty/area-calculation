//AutoCAD Color Index (ACI)
//http://sub-atomic.com/~moses/acadcolors.html

const ACI = {
    LAYER : 0,
    RED : 1,
    YELLOW : 2,
    GREEN : 3,
    CYAN : 4,
    BLUE : 5,
    MAGENTA : 6,
    WHITE : 7
}

const LAYERS = [
  {
    name: '',  
    colorNumber: ACI.WHITE, 
    lineTypeName: 'CONTINUOUS',
    standardFlag: 0,
    trueColor: -1
  }
]

module.exports = {
  LAYERS,
  ACI
}