let descriptionList = []
class Items extends Array {
  constructor() {
    super()
  }
}
// class Properties {
//   constructor(){
//     this.description = ''
//     this.value = []
//   }

// }
export default class Parapet {
  constructor() {
    // this.properties = new Properties
    this.items = new Items()
    this.items1 = new Items()
    this.module = 0
    this.fw = 0
    this.ow = 0
    this.count = 0
  }
  computeAll() {
    this.fw = this.items
      .map(rec => {
        return rec.properties
      })
      .flat()
      .filter(prop => {
        return prop.part.includes('FW') && prop.total !== ''
      })
      .reduce((acc, obj) => {
        return acc + obj.total
      }, 0)
    this.ow = this.items
      .map(rec => {
        return rec.properties
      })
      .flat()
      .filter(prop => {
        return prop.part.includes('OW') && prop.total !== ''
      })
      .reduce((acc, obj) => {
        return acc + obj.total
      }, 0)
    this.count = this.items.filter(item =>
      item.properties[0].total !== '' ? item.properties[1].total !== '' : 0,
    ).length
  }
  computeRow(item, index) {
    let fw, ow
    if (item.grid != 0 || item.grid != 0) {
      if (item.part == 'FW') {
        fw = item.grid
        item.total = Number(Math.round(parseFloat(fw) * 0.91 + 'e3') + 'e-3')
        //  Number(Math.round((parseFloat(item.l_grid) * 0.910 ) * (parseFloat(item.w_grid) * 0.910) +'e3')+'e-3')
      } else {
        ow = item.grid
        item.total = Number(
          Math.round(parseFloat(ow) * parseFloat(0.91) + 'e3') + 'e-3',
        )
      }
    } else {
      item.total = ''
    }
    this.computeAll()
  }
  insertProperties(module) {
    this.module = module
    this.items = []
    this.items1 = []
    let descriptionList = []
    let descriptionList1 = []
    ;(function makeDescriptions() {
      for (let i = 1; i <= 5; i++) {
        descriptionList.push(`PA-${i}`)
      }
      for (let i = 6; i <= 10; i++) {
        descriptionList1.push(`PA-${i}`)
      }
    })()
    for (let j = 0; j < descriptionList.length; j++) {
      this.items.push({
        description: `${descriptionList[j]}`,
        properties: [
          { part: 'FW', grid: '', meter: '', total: '' },
          { part: 'OW', grid: '', meter: '', total: '' },
        ],
      })
      this.items1.push({
        description: `${descriptionList1[j]}`,
        properties: [
          { part: 'FW', grid: '', meter: '', total: '' },
          { part: 'OW', grid: '', meter: '', total: '' },
        ],
      })
    }
  }
  // insertProperties(module) {
  //   this.module = module
  //   this.items = []
  //   descriptionList = []

  //   this.insertDescriptions()
  //   for (let i = 1; i < descriptionList.length; i++) {
  //     this.items.push({
  //       description: `${descriptionList[i]}`,
  //       properties: [
  //         { part: 'FW', grid: '', meter: '', total: '' },
  //         { part: 'OW', grid: '', meter: '', total: '' },
  //       ],
  //     })
  //   }
  // }
  insertDescriptions() {
    for (let i = 0; i <= 5; i++) {
      descriptionList.push(`PA-${i}`)
    }
  }
}
