const { FloorArray, FloorValue } = require('./bearingwallutils')

class Axis {
  constructor(axisName) {
    this.floorName = ''
    this.axisName = axisName
    this.centerGravity_G = 0
    this.rigidity_S = 0
    this.kr = 0
    this.elasticRadius_R = 0
    this.eccentricDistance_L = 0
    this.eccentricity_E = 0
    this.judgement = ''
  }

  compute() {
    // console.log(Math.abs(this.centerGravity_G - this.rigidity_S));
    this.eccentricDistance_L = Math.abs(this.centerGravity_G - this.rigidity_S)
    this.eccentricity_E = this.eccentricDistance_L / this.elasticRadius_R
    this.judgement = this.eccentricity_E > 0.3 ? 'NG' : 'OK'
  }

  addFromRigidity(i, rigidity, forProperty, axisName) {
    if (rigidity[forProperty][axisName].floors[i].coordinateList.length > 0)
      this.rigidity_S =
        rigidity[forProperty][axisName].floors[i].coordinateList[0].sy
    else this.rigidity_S = 0
    this.kr =
      rigidity[forProperty].x.floors[i].lxiyisy2Sum +
      rigidity[forProperty].y.floors[i].lxiyisy2Sum
    this.elasticRadius_R = Math.sqrt(
      this.kr / rigidity[forProperty][axisName].floors[i].lxiSum,
    )
  }
}

class EccentricityFloorValue extends FloorValue {
  constructor(floorName) {
    super(floorName)
    this.x = new Axis('X')
    this.y = new Axis('Y')
  }

  addFromRigidity(i, rigidity, forProperty) {
    this.x.addFromRigidity(i, rigidity, forProperty, 'x')
    this.y.addFromRigidity(i, rigidity, forProperty, 'y')
  }

  addFromGravity(i, gravity, forProperty) {
    if (this.is1F()) {
      this.x.centerGravity_G = gravity[forProperty].overall_Gy
      this.y.centerGravity_G = gravity[forProperty].overall_Gx
    } else {
      this.x.centerGravity_G = gravity[forProperty].floors[i].total_Gy
      this.y.centerGravity_G = gravity[forProperty].floors[i].total_Gx
    }
  }

  compute(i, rigidity, gravity, forProperty) {
    this.addFromRigidity(i, rigidity, forProperty)
    this.addFromGravity(i, gravity, forProperty)
    this.setValues()
    this.x.compute()
    this.y.compute()
  }

  setValues() {
    this.x.floorName = this.floorName
    this.y.floorName = this.floorName
  }

  is1F() {
    return this.floorName === '1階'
  }
}

class EccentricityFloorList extends FloorArray {
  constructor() {
    super()
  }

  addFloorValue(floorName) {
    let item = new EccentricityFloorValue(floorName)
    super.push(item)
  }

  compute(rigidity, gravity, forProperty) {
    this.forEach((item, i) => {
      item.compute(i, rigidity, gravity, forProperty)
    })
  }
}

class Magnification {
  constructor() {
    this.floors = new EccentricityFloorList()
  }

  compute(options, forProperty) {
    this.floors.setFloor(options.houseStructure)
    this.floors.compute(options.rigidity, options.gravity, forProperty)
  }
}

module.exports = class EccentricityRatio {
  constructor() {
    this.standard = new Magnification()
    this.higher = new Magnification()
  }

  compute(options) {
    Object.keys(this).forEach(val => {
      this[val].compute(options, val)
    })
  }
}
