class Items extends Array {
  constructor() {
    super()
  }
}

export default class RoofGarden {
  constructor() {
    this.items = new Items()
    this.items1 = new Items()
    this.module = 0
    this.fw = 0
    this.ow = 0
    this.count = 0
  }
  computeAll() {
    let fw = this.items
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
    let ow = this.items
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

    let fw1 = this.items1
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
    let ow1 = this.items1
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

    this.fw = fw + fw1
    this.ow = ow + ow1

    let count = this.items.filter(item =>
      item.properties[0].total !== '' ? item.properties[1].total !== '' : 0,
    ).length
    let count1 = this.items1.filter(item =>
      item.properties[0].total !== '' ? item.properties[1].total !== '' : 0,
    ).length
    this.count = count + count1
  }
  // computeRow(item, index) {
  //   let fw, ow
  //   console.log(item.properties)
  //   if (item.properties[index].grid != 0 || item.properties[index].grid != '') {
  //     if (item.properties[index].part == 'FW') {
  //       fw = item.properties[index].grid
  //       item.properties[index].total = Number(
  //         Math.round(parseFloat(fw) * 0.91 + 'e3') + 'e-3',
  //       )
  //       //  Number(Math.round((parseFloat(item.l_grid) * 0.910 ) * (parseFloat(item.w_grid) * 0.910) +'e3')+'e-3')
  //     } else {
  //       ow = item.properties[index].grid
  //       item.properties[index].total = Number(
  //         Math.round(parseFloat(ow) * parseFloat(0.91) + 'e3') + 'e-3',
  //       )
  //     }
  //   } else {
  //     item.properties[index].total = ''
  //   }
  //   this.computeAll()
  // }
  computeRow(item) {
    let fw, ow
    if (item.grid != '' || item.grid != 0) {
      if (item.part == 'FW') {
        fw = item.grid
        item.total = Number(
          Math.round(parseFloat(fw) * this.module + 'e3') + 'e-3',
        )
      } else {
        ow = item.grid
        item.total = Number(
          Math.round(parseFloat(ow) * parseFloat(this.module) + 'e3') + 'e-3',
        )
      }
      // let a = _.find(this.areaData.bankin.balcony.items,{description: this.areaData.bankin.balcony.items[i].description})
      // if(a!=undefined){
      //  Object.assign(a.properties[index],item)
      // }
    } else {
      item.total = ''
      item.grid = ''
    }
    this.computeAll()
  }
  insertProperties(module, desc) {
    this.module = module
    this.items = []
    this.items1 = []
    let descriptionList = []
    let descriptionList1 = []
    ;(function makeDescriptions() {
      for (let i = 1; i <= 5; i++) {
        descriptionList.push(`${desc}${i}`)
      }
      for (let i = 6; i <= 10; i++) {
        descriptionList1.push(`${desc}${i}`)
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
  // insertDescriptions() {
  //   for (let i = 0; i <= 5; i++) {
  //     descriptionList.push(`PA-${i}`)
  //   }
  // }
}
