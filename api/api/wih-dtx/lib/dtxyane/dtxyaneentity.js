const { CommonItem } = require('../dtxheadertype')
const DTXYaneEave = require('./dtxyaneeave')
const DTXYaneEaveList = require('./dtxyaneeavelist')
const DTXYaneKeraba = require('./dtxyanekeraba')
const DTXYaneKerabaList = require('./dtxyanekerabalist')

const { toDbl, toStr, toEnm } = require('../dtxfunct')
const { DPoint } = require('../../cadmodule/cadtypes')
const cad2d = require('../../cadmodule/cad2d')
const { radToDeg, degToRad, round } = require('../../cadmodule/mathex')

const {
  roofDivisionEnum,
  differentSlopeFlagEnum,
  eaveDesignEnum,
} = require('./dtxyanetype')

module.exports = class DTXYaneEntity extends CommonItem {
  constructor() {
    super()
    this.clear()
  }

  clear() {
    super.clear()
    this.direction = ''
    this.roofDivision = ''
    this.differentSlopeFlag = ''
    this.eaveDesign = ''
    this.slopeOrigin = new DPoint()
    this.slopeDirection = new DPoint()
    this.arrowDirection = ''
    this.pitch = 0
    this.standardElevationHeight = 0
    this.roofThickness = 0
    this.gullFindingHeight = 0
    this.muffleDisplayLimitLength = 0
    this.cosmeticGloveName = ''
    this.gableTipShape = ''
    this.eavesGutterAmount = 0
    this.ridgeThickness = 0
    this.ridgeWidth = 0
    this.kerabaEaves = new DTXYaneKerabaList()
    this.upperEaves = new DTXYaneEaveList()
    this.lowerEaves = new DTXYaneEaveList()
    this.slantedEaves = new DTXYaneEaveList()

    this.kerabaHafuLength = 0
    this.upperEavesHafuLength = 0
    this.lowerEavesHafuLength = 0
    this.horizontalHafuLength = 0

    this.isHonmune = false
    this.isSumimune = false

    this.roofArea = 0
  }

  getroofArea() {
    const vecDot = (v1, v2) => {
      return v1.dX * v2.dX + v1.dY * v2.dY
    }

    const vecRot90CW = v => {
      return new DPoint(v.dY, -v.dX)
      // { x: v.y, y: -v.x };
    }

    const vecRot90CCW = v => {
      return new DPoint(-v.dY, v.dX)
      // { x: -v.y, y: v.x };
    }

    const polyIsCw = p => {
      return (
        vecDot(
          vecRot90CW(new DPoint(p[1].dX - p[0].dX, p[1].dY - p[0].dY)),
          new DPoint(p[2].dX - p[1].dX, p[2].dY - p[1].dY),
        ) >= 0
      )
    }

    let rot = polyIsCw(this.dPoint) ? vecRot90CCW : vecRot90CW

    let dPoints = []

    // console.log( rot )

    // let res = [
    //   '',
    //   '',
    //   ''
    // ]

    // let nP = 0;
    // let pP = 0;
    // let lP = 0;
    // let rP = 0;

    // let length = this.dPoint.length

    // lP = length - 1
    // pP = length - 2

    // for (rP=0; rp<=pointCount ;rP++){
    //   nP = cad2d.nextPoint(rP, length)

    //   res[0] = cad2d.cardinalDirection_2D(this.dPoint[pP], this.dPoint[lP]);
    //   res[1] = cad2d.cardinalDirection_2D(this.dPoint[lP], this.dPoint[rP])
    //   res[2] = cad2d.cardinalDirection_2D(this.dPoint[lP], this.dPoint[nP])

    //   pP = lP
    //   lP = rP
    // }

    let pitchFactor = round(Math.sqrt(this.pitch ** 2 + 100) / 10, 3)
  }

  assignUpperEavesHafuLength(options) {
    let gaisyuu = options.gaisyuu
    let tsumakabe = options.tsumakabe
    let noNeedAdditional = false

    let res = 0

    for (let upper of this.upperEaves) {
      for (let tsuma of tsumakabe.items) {
        if (tsuma.layerNumber > this.layerNumber) break
        if (tsuma.layerNumber < this.layerNumber) continue

        noNeedAdditional =
          upper.isPointinLine(tsuma.dPoint[0]) &&
          upper.isPointinLine(tsuma.dPoint[1])
        upper.noNeedinHafu = noNeedAdditional
        if (noNeedAdditional) break
      }

      if (noNeedAdditional) {
        continue
      } else {
        if (this.layerNumber < gaisyuu.items.length) {
          noNeedAdditional = cad2d.pointInPolygonEdge_2D(
            upper.centerPoint,
            gaisyuu.items[this.layerNumber].dPoint,
          )
          upper.noNeedinHafu = noNeedAdditional
        }

        if (noNeedAdditional) continue
        else res += upper.length
      }
    }

    this.upperEavesHafuLength = res
  }

  assignLowerEavesHafuLength() {
    let res = 0
    for (let lower of this.lowerEaves) {
      res += lower.length
    }
    this.lowerEavesHafuLength = res
  }

  assignKerabaHafuLength(options) {
    let gaisyuu = options.gaisyuu
    let tsumakabe = options.tsumakabe

    let res = 0
    let noNeedAdditional = false

    let sqr = this.pitch ** 2
    let sqrt = Math.sqrt(sqr + 100)
    let hyp = round((sqrt * 10) / 100, 3)

    for (let keraba of this.kerabaEaves) {
      for (let tsuma of tsumakabe.items) {
        if (tsuma.layerNumber > this.layerNumber) break
        if (tsuma.layerNumber < this.layerNumber) continue

        noNeedAdditional =
          keraba.isPointinLine(tsuma.dPoint[0]) &&
          keraba.isPointinLine(tsuma.dPoint[1])
        keraba.noNeedinHafu = noNeedAdditional
        if (noNeedAdditional) break
      }

      if (noNeedAdditional) {
        continue
      } else {
        if (this.layerNumber < gaisyuu.items.length) {
          noNeedAdditional = cad2d.pointInPolygonEdge_2D(
            keraba.centerPoint,
            gaisyuu.items[this.layerNumber].dPoint,
          )
          keraba.noNeedinHafu = noNeedAdditional
        }

        if (noNeedAdditional) continue
        else res += keraba.length * hyp
      }
    }

    this.kerabaHafuLength = round(res / 1000, 3)
  }

  addRoofDirection(ot) {
    if (this.slopeDirection.dX === 1 && this.slopeDirection.dY === 0) {
      this.direction = ot.positiveX
      this.arrowDirection = 'cdPositiveX'
    } else if (this.slopeDirection.dX === -1 && this.slopeDirection.dY === 0) {
      this.direction = ot.negativeX
      this.arrowDirection = 'cdNegativeX'
    } else if (this.slopeDirection.dX === 0 && this.slopeDirection.dY === 1) {
      this.direction = ot.positiveY
      this.arrowDirection = 'cdPositiveY'
    } else if (this.slopeDirection.dX === 0 && this.slopeDirection.dY === -1) {
      this.direction = ot.negativeY
      this.arrowDirection = 'cdNegativeY'
    }
  }

  addTopEdge(hs) {
    if (this.dPoint.length > 3) {
      let vMax, vMin
      let vHighUpper

      let vBeamHt = hs.beamHT(this.layerNumber)
      let vHighest = 0
      let vTan = this.pitch / 10
      let vArcT = Math.atan(vTan)
      let vradD = radToDeg(vArcT)
      let vAng = parseFloat(vradD.toFixed(1))

      for (const vUpper of this.upperEaves) {
        vMin = new DPoint(this.slopeOrigin.dX, this.slopeOrigin.dY)

        switch (this.arrowDirection) {
          case 'cdPositiveX':
          case 'cdNegativeX':
            vMax = new DPoint(vUpper.dPoint1.dX, vMin.dY)
            break
          default:
            vMax = new DPoint(vMin.dX, vUpper.dPoint1.dY)
            break
        }

        let vLen = parseFloat(cad2d.lineDistance_2D(vMin, vMax).toFixed(2))
        let vAdj = parseFloat((vTan * vLen).toFixed(2))
        let vCos = parseFloat(Math.cos(degToRad(vAng)).toFixed(3))
        let vTop = parseFloat((this.roofThickness / vCos).toFixed(2))
        let vHT = parseFloat((vBeamHt + vTop + vAdj).toFixed(2))

        if (vHT > vHighest) {
          vHighest = vHT
          vHighUpper = vUpper
        }

        vUpper.topEdge = vHT
      }

      for (const vLower of this.lowerEaves) {
        vMax = new DPoint(vHighUpper.dPoint1.dX, vHighUpper.dPoint1.dY)
        switch (this.arrowDirection) {
          case 'cdPositiveX':
          case 'cdNegativeX':
            vMin = new DPoint(vLower.dPoint1.dX, vMax.dY)
            break
          default:
            vMin = new DPoint(vMax.dX, vLower.dPoint1.dY)
            break
        }

        let vLen = parseFloat(cad2d.lineDistance_2D(vMin, vMax).toFixed(2))
        let vAdj = parseFloat((vTan * vLen).toFixed(2))
        vLower.topEdge = parseFloat((vHighest - vAdj).toFixed(2))
      }
    }
  }

  addKeraba_Eave() {
    let rP = 0
    let lP = this.pointCount - 1

    const addItem = aItem => {
      aItem.dPoint1 = this.dPoint[rP]
      aItem.dPoint2 = this.dPoint[lP]
      aItem.pID_1 = rP
      aItem.pID_2 = lP
      return aItem
    }

    const addKeraba = () => {
      let item = new DTXYaneKeraba()
      return addItem(item)
    }

    const addEaves = () => {
      let item = new DTXYaneEave()
      return addItem(item)
    }

    for (rP = 0; rP < this.pointCount; rP++) {
      let vCD = this.cardinalDirection(rP, lP)
      switch (this.arrowDirection) {
        case 'cdPositiveX':
          switch (vCD) {
            case 'cdPositiveY':
              this.lowerEaves.push(addEaves())
              break
            case 'cdNegativeY':
              this.upperEaves.push(addEaves())
              break
            case 'cdPositiveX':
            case 'cdNegativeX':
              this.kerabaEaves.push(addKeraba())
              break
            default:
              this.slantedEaves.push(addEaves())
              break
          }
          break
        case 'cdNegativeX':
          switch (vCD) {
            case 'cdPositiveY':
              this.upperEaves.push(addEaves())
              break
            case 'cdNegativeY':
              this.lowerEaves.push(addEaves())
              break
            case 'cdPositiveX':
            case 'cdNegativeX':
              this.kerabaEaves.push(addKeraba())
              break
            default:
              this.slantedEaves.push(addEaves())
              break
          }
          break
        case 'cdPositiveY':
          switch (vCD) {
            case 'cdPositiveX':
              this.upperEaves.push(addEaves())
              break
            case 'cdNegativeX':
              this.lowerEaves.push(addEaves())
              break
            case 'cdPositiveY':
            case 'cdNegativeY':
              this.kerabaEaves.push(addKeraba())
              break
            default:
              this.slantedEaves.push(addEaves())
              break
          }
          break
        case 'cdNegativeY':
          switch (vCD) {
            case 'cdPositiveX':
              this.lowerEaves.push(addEaves())
              break
            case 'cdNegativeX':
              this.upperEaves.push(addEaves())
              break
            case 'cdPositiveY':
            case 'cdNegativeY':
              this.kerabaEaves.push(addKeraba())
              break
            default:
              this.slantedEaves.push(addEaves())
              break
          }
          break
      }
      lP = rP
    }
  }

  addSolarNumber(solarNumber) {
    if (this.dPoint.length > 3) {
      let vPoint = []
      vPoint.length = this.pointCount

      const addDYValue = () => {
        for (const vUpper of this.upperEaves) {
          let pt1 = new DPoint()
          let pt2 = new DPoint()
          pt1.dY = vUpper.topEdge
          pt2.dY = vUpper.topEdge

          vPoint[vUpper.pID_1] = pt1
          vPoint[vUpper.pID_2] = pt2
        }

        for (const vLower of this.lowerEaves) {
          let pt1 = new DPoint()
          let pt2 = new DPoint()

          pt1.dY = vLower.topEdge
          pt2.dY = vLower.topEdge

          vPoint[vLower.pID_1] = pt1
          vPoint[vLower.pID_2] = pt2
        }
      }

      for (let vSO of solarNumber.items) {
        if (vSO.isAlreadyAssigned) continue
        if (vSO.layerName !== this.direction) continue

        addDYValue()

        switch (this.arrowDirection) {
          case 'cdPositiveX':
          case 'cdNegativeX':
            switch (this.arrowDirection) {
              case 'cdPositiveX':
                for (let i = 0; i < this.pointCount; i++) {
                  vPoint[i].dX = this.dPoint[i].dY
                }
                break
              case 'cdNegativeX':
                for (let i = 0; i < this.pointCount; i++) {
                  vPoint[i].dX = this.dPoint[i].dY * -1
                }
                break
            }
            break
          default:
            switch (this.arrowDirection) {
              case 'cdPositiveY':
                for (let i = 0; i < this.pointCount; i++) {
                  vPoint[i].dX = this.dPoint[i].dX * -1
                }
                break
              case 'cdNegativeY':
                for (let i = 0; i < this.pointCount; i++) {
                  vPoint[i].dX = this.dPoint[i].dX
                }
                break
            }
            break
        }

        let vPL = cad2d.pointinpolygon_2Dwn(vSO.dPoint[0], vPoint)
        if (vPL) {
          this.name = vSO.name
          vSO.isAlreadyAssigned = true
          break
        }
      }
    }
  }

  addRoofDimension(additionalRoofDim) {
    let vPE = false

    const pointisEqual = (aDimPt = 0, AEavePt = 0) => {
      return aDimPt === AEavePt
    }

    for (let vRD of additionalRoofDim.items) {
      if (vRD.isAlreadyAssigned) continue
      switch (vRD.eaveType) {
        case 'etKeraba':
          for (let vKeraba of this.kerabaEaves) {
            if (vKeraba.additionalDim) continue
            switch (this.arrowDirection) {
              case 'cdPositiveX':
                vPE = pointisEqual(vRD.dPoint[0].dX, vKeraba.dPoint1.dY)
                break
              case 'cdNegativeX':
                vPE = pointisEqual(vRD.dPoint[0].dX, vKeraba.dPoint1.dY * -1)
                break
              case 'cdPositiveY':
              case 'cdNegativeY':
                vPE = pointisEqual(vRD.dPoint[0].dX, vKeraba.dPoint1.dX)
                break
            }

            if (vPE) {
              vKeraba.additionalDim = vRD
              vRD.isAlreadyAssigned = true
              break
            }
          }
          break
        case 'etLower':
          for (let vLower of this.lowerEaves) {
            if (vLower.additionalDim) continue
            switch (this.arrowDirection) {
              case 'cdPositiveX':
              case 'cdNegativeX':
                vPE = pointisEqual(vRD.dPoint[0].dX, vLower.dPoint1.dX)
                break
              case 'cdPositiveY':
              case 'cdNegativeY':
                vPE = pointisEqual(vRD.dPoint[0].dX, vLower.dPoint1.dY)
                break
            }

            if (vPE) {
              vLower.additionalDim = vRD
              vRD.isAlreadyAssigned = true
              break
            }
          }
          break
        case 'etUpper':
          for (let vUpper of this.upperEaves) {
            if (vUpper.additionalDim) continue
            switch (this.arrowDirection) {
              case 'cdPositiveX':
              case 'cdNegativeX':
                vPE = pointisEqual(vRD.dPoint[0].dX, vUpper.dPoint1.dX)
                break
              case 'cdPositiveY':
              case 'cdNegativeY':
                vPE = pointisEqual(vRD.dPoint[0].dX, vUpper.dPoint1.dY)
                break
            }
            if (vPE) {
              vUpper.additionalDim = vRD
              vRD.isAlreadyAssigned = true
              break
            }
          }
          break
      }
    }
  }

  assign(data, ln, values) {
    this.addCommonItem(data, ln, true)
    this.setLayerName(values.houseStructure)
    this.roofDivision = toEnm(
      { str: data[ln + 2], pos: 10, len: 5 },
      roofDivisionEnum,
    )
    this.differentSlopeFlag = toEnm(
      { str: data[ln + 2], pos: 15, len: 5 },
      differentSlopeFlagEnum,
    )
    this.eaveDesign = toEnm(
      { str: data[ln + 2], pos: 20, len: 5 },
      eaveDesignEnum,
    )
    this.slopeOrigin.dX = toDbl({ str: data[ln + 3], pos: 0, len: 10 })
    this.slopeOrigin.dY = toDbl({ str: data[ln + 3], pos: 10, len: 10 })
    this.slopeDirection.dX = toDbl({ str: data[ln + 3], pos: 20, len: 10 })
    this.slopeDirection.dY = toDbl({ str: data[ln + 3], pos: 30, len: 10 })
    this.addRoofDirection(values.orientation)
    this.pitch = toDbl({ str: data[ln + 3], pos: 40, len: 10 })
    this.standardElevationHeight = toDbl({
      str: data[ln + 3],
      pos: 50,
      len: 10,
    })
    this.roofThickness = toDbl({ str: data[ln + 3], pos: 60, len: 10 })
    this.gullFindingHeight = toDbl({ str: data[ln + 3], pos: 70, len: 10 })
    this.muffleDisplayLimitLength = toDbl({
      str: data[ln + 3],
      pos: 80,
      len: 10,
    })
    this.addCoordinate(data, ln + 4, true)
    this.addKeraba_Eave()
    this.addTopEdge(values.houseStructure)
    this.addSolarNumber(values.twoD.solarNumber)
    this.addRoofDimension(values.twoD.additionalRoofDim)
    this.cosmeticGloveName = toStr({ str: data[ln + this.pointCount + 5] })
    this.gableTipShape = toEnm(
      { str: data[ln + this.pointCount + 7], pos: 0, len: 5 },
      eaveDesignEnum,
    )
    this.eavesGutterAmount = toDbl({
      str: data[ln + this.pointCount + 7],
      pos: 5,
      len: 10,
    })
    this.ridgeThickness = toDbl({
      str: data[ln + this.pointCount + 8],
      pos: 0,
      len: 10,
    })
    this.ridgeWidth = toDbl({
      str: data[ln + this.pointCount + 8],
      pos: 10,
      len: 10,
    })

    this.assignUpperEavesHafuLength(values)
    this.assignLowerEavesHafuLength(values)
    this.assignKerabaHafuLength(values)

    this.horizontalHafuLength =
      (this.lowerEavesHafuLength + this.upperEavesHafuLength) / 1000
    this.roofArea =
      this.areaInMeterSquared * round(Math.sqrt(this.pitch ** 2 + 100) / 10, 3)

    this.getroofArea()
  }
}
