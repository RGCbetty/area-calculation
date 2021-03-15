const DTXFile = require('./dtxfile')
const path = require('path')

const monthString = value => {
  switch (value) {
    case 1:
      return '① January'
    case 2:
      return '② February'
    case 3:
      return '③ March'
    case 4:
      return '④ April'
    case 5:
      return '⑤ May'
    case 6:
      return '⑥ June'
    case 7:
      return '⑦ July'
    case 8:
      return '⑧ August'
    case 9:
      return '⑨ September'
    case 10:
      return '⑩ October'
    case 11:
      return '⑪ November'
    case 12:
      return '⑫ December'
  }
}

module.exports = class DTXFileShiyousho extends DTXFile {
  constructor() {
    super()
  }

  loadFromShiyoushoServer() {
    let controlAndRevNum = this.options.controlNum.split('-', 4)
    let index2 = controlAndRevNum[2].padStart(2, '0')
    let index3 = ''

    // let temp_index3 = controlNum[3].padStart(3,'0')
    if (controlAndRevNum[3].length === 1) {
      index3 = controlAndRevNum[3].padStart(2, '0')
    } else if (controlAndRevNum[3].length === 2) {
      if (isNaN(controlAndRevNum[3])) {
        index3 = controlAndRevNum[3].padStart(3, '0')
      } else {
        index3 = controlAndRevNum[3]
      }
    } else {
      index3 = controlAndRevNum[3]
    }

    controlAndRevNum.splice(-2, 2, index2, index3)
    let val = controlAndRevNum.slice(0, 3).join('-') + controlAndRevNum[3]

    let found = false
    if (val.split('-').length === 3) {
      const today = new Date()
      let dd = today.getDate()
      let mm = today.getMonth() + 1
      let yyyy = today.getFullYear()

      let curmm = mm
      let curdd = dd

      while (yyyy >= 2018) {
        while (curmm >= 1) {
          while (curdd >= 1) {
            let ddstr = String(curdd).padStart(2, '0')
            let path = `\\\\shiyousho.hrd-s.com\\dc-svr\\CAD-WIH-LZH DATA ${yyyy.toString()}\\CAD-WIH-DTX DATA ${yyyy.toString()}\\${monthString(
              curmm,
            )}\\${ddstr}\\${val}.dtx`
            // let path = `\\\\cpu-15114\\s2\\datas\\CAD-WIH-LZH DATA ${yyyy.toString()}\\CAD-WIH-DTX DATA ${yyyy.toString()}\\${monthString(curmm)}\\${ddstr}\\${val}.dtx`

            found = this.loadFromFile(path)
            if (found) break
            curdd -= 1
          }

          if (found) break
          curdd = 31
          curmm -= 1
        }

        if (found) break
        curmm = 12
        yyyy -= 1
      }
    }

    return found
  }
}
