const CSV = require('../index')

module.exports = class SekisanCSV extends CSV {
  constructor() {
    super()
  }

  getCommonArea() {
    let filter = this.values.filter((rec) => {
      return (rec[0] >= 2 && rec[0] <= 6) || rec[0] == 723 || rec[0] == 51
    })
    //   return (rec[0] >= 2 && rec[0] <= 6) || rec[0] == 51 || rec[0] == 723
    // })
    //removed rec[0] == 558 || rec[0] == 559 *kisoMenseki and *GaisyuuNagasa
    let add = []
    let ins = 0

    // console.log(filter)

    filter.forEach((rec, i) => {
      switch (rec[1]) {
        case '建築 面積':
          rec[0] = '70810'
          rec.push('00001190')
          break
        case '延床 面積':
          rec[0] = '70820'
          rec.push('00001200')
          add = ['70816', '延床面積/図面', rec[2], rec[3], '00001200']
          ins = i
          break
        case '1F 床面積':
          rec[0] = '70830'
          rec.push('00001210')
          break
        case '1F 床面積':
          rec[0] = '70830'
          rec.push('00001210')
          break
        case '2F 床面積':
          rec[0] = '70840'
          rec.push('00001220')
          break
        case '3F 床面積':
          rec[0] = '70850'
          rec.push('00001230')
          break
        // case '1F 外周領域周長':
        //   rec[0] = '70500'
        //   rec.push('00080210')
        //   break
        case '施工面積':
          rec[0] = '70815'
          rec.push('00001195')
          break
        default:
          rec.push('')
      }
    })
    filter.splice(ins, 0, add)

    return filter
  }

  loadFromArchServer(controlNumber) {
    const C_PATH =
      '\\\\arch-svr.hrd-s.com\\SHIYOUSHO\\Import_WIH\\SEKISAN_CSV_BACKUP\\'
    let filepath = C_PATH + controlNumber + '.csv'
    let filepathKanji = `${C_PATH}${controlNumber}-積算数量.csv`
    if (this.loadFromFile(filepath)) {
      return true
    } else if (this.loadFromFile(filepathKanji)) {
      return true
    } else {
      return false
    }
  }
}
