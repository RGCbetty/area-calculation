const { DRect } = require('../../../cadmodule/cadtypes')
const { FloorArray, FloorValue } = require('./bearingwallutils')
const cad2d = require('./../../../cadmodule/cad2d')

class BearingWallValue {
  constructor(bwValue = 0, bwLength = 0) {
    this.bWValue = bwValue
    this.bWLength = (bwLength * 910) / 1000
    this.wallVolume = this.bWLength * bwValue
  }

  static create(bwValue, bwLength) {
    return new BearingWallValue(bwValue, bwLength)
  }
}

class BearingWallValues extends Array {
  constructor() {
    super()
  }

  addValue(item) {
    let withbwValue = false
    for (let value of this) {
      if (value.bWValue == item.bWValue) {
        value.bWLength += (item.bWLength * 910) / 1000
        value.wallVolume = item.bWValue * value.bWLength
        withbwValue = true
        break
      }
    }

    if (!withbwValue) {
      super.push(BearingWallValue.create(item.bWValue, item.bWLength))
    }
  }
}

class CoordinateValue {
  constructor() {
    this.names = []
    this.values = new BearingWallValues()
    this.subTotal = 0
  }
}

class BearingWallPoints extends Array {
  constructor() {
    super()
  }

  addPoint(value) {
    super.push(value)
  }

  getZoneIndex(bwItem, axisName) {
    let zone = 0
    let p1 = 0
    for (let p2 = 1; p2 < this.length; p2++) {
      if (
        this[p1] <= bwItem.dPoint[0][`d${axisName}`] &&
        bwItem.dPoint[0][`d${axisName}`] <= this[p2]
      ) {
        break
      }
      p1 = p2
      zone++
    }
    return zone
  }
}

class AxisValue {
  constructor(name) {
    this.name = name
    this.FloorArea = 0
    this.length = 0
    this.oneFourthValue = 0
    this.points = new BearingWallPoints()
    this.zones = []
  }

  get forCoordinate() {
    return this.name == 'X' ? 'Y' : 'X'
  }

  setPoints(boundary, min, max) {
    this.points.addPoint(boundary[min])
    this.points.addPoint(boundary[min] + this.oneFourthValue)
    this.points.addPoint(boundary[max] - this.oneFourthValue)
    this.points.addPoint(boundary[max])
  }

  setOneFourthValue(boundary, key) {
    this.length = boundary[key]
    this.oneFourthValue = (this.length / 910 / 4) * 910
  }

  assign(coordinates, bwItems) {
    let min = new CoordinateValue()
    let mid = new CoordinateValue()
    let max = new CoordinateValue()

    for (let coordinate of coordinates.items) {
      if (coordinate.name.indexOf(this.forCoordinate) != -1) {
        if (
          coordinate.dPoint[0][`d${this.forCoordinate}`] >= this.points[0] &&
          coordinate.dPoint[0][`d${this.forCoordinate}`] <= this.points[1]
        ) {
          min.names.push(coordinate.name)
        } else if (
          coordinate.dPoint[0][`d${this.forCoordinate}`] > this.points[1] &&
          coordinate.dPoint[0][`d${this.forCoordinate}`] < this.points[2]
        ) {
          mid.names.push(coordinate.name)
        } else if (
          coordinate.dPoint[0][`d${this.forCoordinate}`] >= this.points[2] &&
          coordinate.dPoint[0][`d${this.forCoordinate}`] <= this.points[3]
        ) {
          max.names.push(coordinate.name)
        }
      }
    }

    this.zones.push(min, mid, max)

    for (let bwItem of bwItems) {
      let zoneIndex = this.points.getZoneIndex(bwItem, this.forCoordinate)
      this.zones[zoneIndex].values.addValue(bwItem)
      this.zones[zoneIndex].subTotal +=
        cad2d.lineDistance_2D(bwItem.dPoint[0], bwItem.dPoint[1]) / 1000
    }

    // console.log(this.zones[0])
  }
}

class BearingWallFloorValue extends FloorValue {
  constructor() {
    super()
    this.x = new AxisValue('X')
    this.y = new AxisValue('Y')
    this.floorName = ''
  }

  compute(gaisyuu, coordinates, rigidity, index) {
    this.floorName = gaisyuu.items[index].layerName

    let boundary = new DRect()

    boundary.getRectFromArray(gaisyuu.items[index].dPoint)

    this.x.setOneFourthValue(boundary, 'height')
    this.y.setOneFourthValue(boundary, 'width')

    this.x.setPoints(boundary, 'bottom', 'top')
    this.y.setPoints(boundary, 'left', 'right')

    this.x.assign(coordinates, rigidity.higher.x.floors[index].coordinateList)
    this.y.assign(coordinates, rigidity.higher.y.floors[index].coordinateList)
  }
}

class BearingWallFloorList extends FloorArray {
  constructor() {
    super()
  }

  addFloorValue(floorName) {
    let item = new BearingWallFloorValue(floorName)
    super.push(item)
  }

  compute(gaisyuu, coordinate, rigidity) {
    this.forEach((floor, index) => {
      floor.compute(gaisyuu, coordinate, rigidity, index)
    })
  }
}

module.exports = class {
  constructor() {
    this.floors = new BearingWallFloorList()
  }

  compute(options) {
    this.floors.setFloor(options.houseStructure)
    this.floors.compute(options.gaisyuu, options.coordinate, options.rigidity)

    // console.log(options.rigidity.higher.y.floors[0])
  }
}
