const tateguTypes = require('./dtxtategutypes')
const { CommonItem } = require('../dtxheadertype')
const { toInt, toBul, toDbl, toStr } = require('../dtxfunct')
const { DPoint } = require('../../cadmodule/cadtypes')
const dtxTypes = require('../dtxtypes')
const dtxtables = require('./dtxtategutables')

module.exports = class extends CommonItem {
  constructor() {
    super()
    this.pointCount = 3
    this.heyamei1 = ''
    this.heyamei2 = ''
    this.name = ''
    this.madoTaka = 0
    this.hingeLocation = {}
    this.tateguShape = 0
    this.ranma = {
      jouhou: {},
      taka: 0,
    }
    this.nakazan = false
    this.kutsuzuri = false
    this.fuzokuhinyouGaibuHokyou = {}
    this.menkoshi = {
      pitch: 0,
      taipu: {},
    }
    this.madoTesuri = false
    this.uchiShouji = false
    this.amado = {}
    this.tobukuruIchi = {}
    this.gaibuToritsuke = {}
    this.shiyouBasho = {}
    this.moru = {
      haba: 0,
      atsumi: 0,
      deHaba: 0,
      sayuuHaba: 0,
      sayuuAtsumi: 0,
      taipu: {},
    }
    this.saikouDanmen = false
    this.haichiKijun = {}
    this.wakuKeijyou = {}
    this.kumiawaseTateguBangou = 0
    this.uchinoritaka = 0
    this.kaikouTaka = 0
    this.demadoHaba = 0
    this.jitsuTateguHaba = 0
    this.konaTateguHaba = 0
    this.shattaAmado = {
      mitsukeTaka: 0,
      deHaba: 0,
      mentoriTaka: 0,
      mentoriHaba: 0,
    }
    this.symbol = {
      directory: '',
      filename: '',
      hyouriHenkou: {},
    }
    this.textDisplay = {
      houkou: new DPoint(),
      ichi: new DPoint(),
    }
    this.signDisplay = {
      houkou: new DPoint(),
      ichi: new DPoint(),
    }
    this.defaultValue = {
      item: [],
    }
    this.jitsuZahyouKeisan = 0
    this.keshouKoushi = {
      pitch: 0,
      taipu: {},
      pitchShitei: false,
      pitchAjust: false,
      tate: 0,
      yoko: 0,
    }
    this.madohisashiJidou = {}
    this.kakuchouTotte = {}
    this.katagawaWashitsu = {
      totte: {},
      baai: false,
      userFilename: '',
    }
    this.kataHikidoInput = {}
    this.sign = {
      number: 0,
      sign: {},
      material: {},
      jidouSaibanLock: false,
      signString: '',
      mikomi: 0,
      wakuZaishitsu: 0,
    }
    this.remarks = {
      zaishitsu: ['', ''],
      shiage: ['', ''],
      kanamono: '',
      garasu: '',
      fuzokuhin: '',
      wakuKeijou: '',
      bikou: ['', '', '', '', ''],
    }
    this.details = {
      count: 0,
      items: [],
    }
    this.textureDisplay = false
    this.autoSetto = false
    this.rail = {
      dehaba: 0,
      takasa: 0,
      setchiSuru: {
        fukashiRyou: 0,
        takasa: 0,
      },
    }
    this.thermalCalculation = false
    this.heatPenetration = false
    this.heatConductionRate = 0
    this.glassSpecFlag = false
    this.glassSpec = ''
    this.reform = {}
    this.openingRatio = 0
    this.uaClassification = {}
    this.tategutype = {}

    this.getlengthFromNegativeFloorLevel = this.getlengthFromNegativeFloorLevel
  }

  addCommonProperty(row, data, csv, ln) {
    if (row >= 0) {
      //From CSV
      this.heyamei1 = csv.cells(row, 5)
      this.heyamei2 = csv.cells(row, 6)
      this.name = csv.cells(row, 11)

      this.madoTaka = Number(csv.cells(row, 24))
      this.hingeLocation = tateguTypes.houkouTypeEnum[csv.cells(row, 41)]
    }
    this.addCommonItem(data, ln, false)

    this.tateguShape = toInt({ str: data[ln + 2], pos: 5, len: 5 })
    this.openingDirection =
      tateguTypes.leftRightDirectionEnum[
        toStr({ str: data[ln + 2], pos: 10, len: 5 })
      ]
    this.ranma.jouhou =
      tateguTypes.ranmaJouhouEnum[toStr({ str: data[ln + 2], pos: 15, len: 5 })]
    this.nakazan = toBul({ str: data[ln + 2], pos: 20, len: 5 })
    this.kutsuzuri = toBul({ str: data[ln + 2], pos: 25, len: 5 })
    this.fuzokuhinyouGaibuHokyou =
      tateguTypes.leftRightDirectionEnum[
        toStr({ str: data[ln + 2], pos: 30, len: 5 })
      ]
    this.menkoshi.taipu =
      tateguTypes.menKoshiEnum[toStr({ str: data[ln + 2], pos: 35, len: 5 })]
    this.madoTesuri = toBul({ str: data[ln + 2], pos: 40, len: 5 })
    this.uchiShouji = toBul({ str: data[ln + 2], pos: 45, len: 5 })
    this.amado =
      tateguTypes.amadoTypeEnum[toStr({ str: data[ln + 2], pos: 50, len: 5 })]
    this.tobukuruIchi =
      tateguTypes.tobukuruIchiEnum[
        toStr({ str: data[ln + 2], pos: 55, len: 5 })
      ]
    this.gaibuToritsuke =
      tateguTypes.gaibuToritsukeEnum[
        toStr({ str: data[ln + 2], pos: 60, len: 5 })
      ]
    this.shiyouBasho =
      tateguTypes.shiyouBashoEnum[toStr({ str: data[ln + 2], pos: 65, len: 5 })]
    this.moru.taipu =
      tateguTypes.moruTypeEnum[toStr({ str: data[ln + 2], pos: 70, len: 5 })]
    this.saikouDanmen = toBul({ str: data[ln + 2], pos: 75, len: 5 })
    this.haichiKijun =
      tateguTypes.haichiKijunEnum[toStr({ str: data[ln + 2], pos: 80, len: 5 })]
    this.wakuKeijyou =
      tateguTypes.wakuKeijyouEnum[toStr({ str: data[ln + 2], pos: 85, len: 5 })]
    this.kumiawaseTateguBangou = toInt({ str: data[ln + 2], pos: 90, len: 5 })

    this.uchinoritaka = toDbl({ str: data[ln + 3], pos: 0, len: 10 })
    this.kaikouTaka = toDbl({ str: data[ln + 3], pos: 10, len: 10 })
    this.demadoHaba = toDbl({ str: data[ln + 3], pos: 20, len: 10 })
    this.moru.haba = toDbl({ str: data[ln + 3], pos: 30, len: 10 })
    this.moru.atsumi = toDbl({ str: data[ln + 3], pos: 40, len: 10 })
    this.moru.deHaba = toDbl({ str: data[ln + 3], pos: 50, len: 10 })
    this.moru.sayuuHaba = toDbl({ str: data[ln + 3], pos: 60, len: 10 })
    this.moru.sayuuAtsumi = toDbl({ str: data[ln + 3], pos: 70, len: 10 })

    this.jitsuTateguHaba = toDbl({ str: data[ln + 4], pos: 0, len: 10 })
    this.konaTateguHaba = toDbl({ str: data[ln + 4], pos: 10, len: 10 })
    this.shattaAmado.mitsukeTaka = toDbl({
      str: data[ln + 4],
      pos: 20,
      len: 10,
    })
    this.shattaAmado.deHaba = toDbl({ str: data[ln + 4], pos: 30, len: 10 })
    this.shattaAmado.mentoriTaka = toDbl({
      str: data[ln + 4],
      pos: 40,
      len: 10,
    })
    this.shattaAmado.mentoriHaba = toDbl({
      str: data[ln + 4],
      pos: 50,
      len: 10,
    })

    this.symbol.directory = toStr({ str: data[ln + 5] })
    this.symbol.filename = toStr({ str: data[ln + 6] })
    this.addCoordinate(data, ln + 7, false)

    this.textDisplay.houkou.dX = toDbl({ str: data[ln + 8], pos: 0, len: 10 })
    this.textDisplay.houkou.dY = toDbl({ str: data[ln + 8], pos: 10, len: 10 })
    this.textDisplay.ichi.dX = toDbl({ str: data[ln + 8], pos: 20, len: 10 })
    this.textDisplay.ichi.dY = toDbl({ str: data[ln + 8], pos: 30, len: 10 })

    this.signDisplay.houkou.dX = toDbl({ str: data[ln + 9], pos: 0, len: 10 })
    this.signDisplay.houkou.dY = toDbl({ str: data[ln + 9], pos: 10, len: 10 })
    this.signDisplay.ichi.dX = toDbl({ str: data[ln + 9], pos: 20, len: 10 })
    this.signDisplay.ichi.dY = toDbl({ str: data[ln + 9], pos: 30, len: 10 })

    this.defaultValue.item[0] = toDbl({ str: data[ln + 10], pos: 0, len: 10 })
    this.defaultValue.item[1] = toDbl({ str: data[ln + 10], pos: 10, len: 10 })
    this.defaultValue.item[2] = toDbl({ str: data[ln + 10], pos: 20, len: 10 })
    this.ranma.taka = toDbl({ str: data[ln + 10], pos: 30, len: 10 })
    this.jitsuZahyouKeisan = toDbl({ str: data[ln + 10], pos: 40, len: 10 })
    this.menkoshi.pitch = toDbl({ str: data[ln + 10], pos: 50, len: 10 })
    this.keshouKoushi.pitch = toDbl({ str: data[ln + 10], pos: 60, len: 10 })

    this.keshouKoushi.taipu =
      tateguTypes.keshouKoushiEnum[
        toStr({ str: data[ln + 11], pos: 0, len: 5 })
      ]
    this.uchiShouji = toBul({ str: data[ln + 11], pos: 5, len: 5 })
    this.madohisashiJidou =
      tateguTypes.madohisashiJidouEnum[
        toStr({ str: data[ln + 11], pos: 10, len: 5 })
      ]
    this.kakuchouTotte =
      tateguTypes.kakuchouTotteEnum[
        toStr({ str: data[ln + 11], pos: 15, len: 5 })
      ]
    this.katagawaWashitsu.totte =
      tateguTypes.katagawaWashitsuTotteEnum[
        toStr({ str: data[ln + 11], pos: 20, len: 5 })
      ]
    this.katagawaWashitsu.baai = toBul({ str: data[ln + 11], pos: 25, len: 5 })

    this.katagawaWashitsu.userFilename = toStr({ str: data[ln + 12] })

    this.symbol.hyouriHenkou =
      tateguTypes.hyouriHenkouEnum[
        toStr({ str: data[ln + 13], pos: 0, len: 5 })
      ]
    this.kataHikidoInput =
      tateguTypes.kataHikidoInputEnum[
        toStr({ str: data[ln + 13], pos: 5, len: 5 })
      ]
    this.sign.sign =
      tateguTypes.signMethodEnum[toStr({ str: data[ln + 13], pos: 10, len: 5 })]
    this.sign.material =
      tateguTypes.materialTypeEnum[
        toStr({ str: data[ln + 13], pos: 15, len: 5 })
      ]
    this.sign.number = toInt({ str: data[ln + 13], pos: 20, len: 5 })
    this.sign.jidouSaibanLock = toBul({ str: data[ln + 13], pos: 25, len: 5 })

    this.sign.signString = toStr({ str: data[ln + 14] })

    this.sign.mikomi = toDbl({ str: data[ln + 15], pos: 0, len: 10 })
    this.sign.wakuZaishitsu = toDbl({ str: data[ln + 15], pos: 10, len: 10 })

    this.remarks.zaishitsu[0] = toStr({ str: data[ln + 16] })
    this.remarks.zaishitsu[1] = toStr({ str: data[ln + 17] })
    this.remarks.shiage[0] = toStr({ str: data[ln + 18] })
    this.remarks.shiage[1] = toStr({ str: data[ln + 19] })
    this.remarks.kanamono = toStr({ str: data[ln + 20] })
    this.remarks.garasu = toStr({ str: data[ln + 21] })
    this.remarks.fuzokuhin = toStr({ str: data[ln + 22] })
    this.remarks.wakuKeijou = toStr({ str: data[ln + 23] })
    this.remarks.bikou[0] = toStr({ str: data[ln + 24] })
    this.remarks.bikou[1] = toStr({ str: data[ln + 25] })
    this.remarks.bikou[2] = toStr({ str: data[ln + 26] })
    this.remarks.bikou[3] = toStr({ str: data[ln + 27] })
    this.remarks.bikou[4] = toStr({ str: data[ln + 28] })

    this.details.count = toInt({ str: data[ln + 29] })
    for (let i = 1; i <= this.details.count; i++) {
      let item = {
        shurui: toInt({ str: data[ln + 29 + i], pos: 0, len: 5 }),
        koumokuBangou:
          tateguTypes.koumokuBangouEnum[
            toStr({ str: data[ln + 29 + i], pos: 5, len: 5 })
          ],
        wakuByouga: toBul({ str: data[ln + 29 + i], pos: 10, len: 5 }),
      }
      this.details.items.push(item)
    }

    this.textDisplay = toBul({ str: data[ln + 30 + this.details.count] })

    this.keshouKoushi.pitchShitei = toBul({
      str: data[ln + 31 + this.details.count],
      pos: 0,
      len: 5,
    })
    this.keshouKoushi.pitchAjust = toBul({
      str: data[ln + 31 + this.details.count],
      pos: 5,
      len: 5,
    })
    this.keshouKoushi.tate = toInt({
      str: data[ln + 31 + this.details.count],
      pos: 10,
      len: 5,
    })
    this.keshouKoushi.yoko = toInt({
      str: data[ln + 31 + this.details.count],
      pos: 15,
      len: 5,
    })

    this.autoSetto = toBul({ str: data[ln + 32 + this.details.count] })

    this.rail.dehaba = toDbl({
      str: data[ln + 33 + this.details.count],
      pos: 0,
      len: 10,
    })
    this.rail.takasa = toDbl({
      str: data[ln + 33 + this.details.count],
      pos: 10,
      len: 10,
    })
    this.rail.setchiSuru.fukashiRyou = toDbl({
      str: data[ln + 33 + this.details.count],
      pos: 20,
      len: 10,
    })
    this.rail.setchiSuru.takasa = toDbl({
      str: data[ln + 33 + this.details.count],
      pos: 30,
      len: 10,
    })

    this.thermalCalculation = toBul({
      str: data[ln + 34 + this.details.count],
      pos: 0,
      len: 5,
    })
    this.heatPenetration = toBul({
      str: data[ln + 34 + this.details.count],
      pos: 5,
      len: 5,
    })
    this.heatConductionRate = toDbl({
      str: data[ln + 34 + this.details.count],
      pos: 10,
      len: 10,
    })
    this.glassSpecFlag = toBul({
      str: data[ln + 34 + this.details.count],
      pos: 20,
      len: 5,
    })

    this.glassSpec = toStr({ str: data[ln + 35 + this.details.count] })
    this.reform =
      dtxTypes.reformEnum[toStr({ str: data[ln + 36 + this.details.count] })]
    this.openingRatio = toDbl({ str: data[ln + 37 + this.details.count] })
    this.uaClassification =
      tateguTypes.uaClassificationEnum[
        toStr({ str: data[ln + 38 + this.details.count] })
      ]

    switch (true) {
      case this.tateguShape <= 18:
        this.tategutype = tateguTypes.tateguTypeEnum['0']
        break
      case this.tateguShape <= 125:
        this.tategutype = tateguTypes.tateguTypeEnum['1']
        break
      case this.tateguShape <= 913:
        this.tategutype = tateguTypes.tateguTypeEnum['2']
        break
    }
  }

  getlengthFromNegativeFloorLevel(layerNumber) {
    return layerNumber == this.layerNumber
      ? this.lengthFromNegativeFloorLevel
      : 0
  }

  get lengthFromNegativeFloorLevel() {
    const getGridLength = () => {
      const C_GRID = 455
      const LIMIT = 3640

      let min = 0,
        max = C_GRID

      // console.log( this.jitsuTateguHaba )

      while (max <= LIMIT) {
        if (this.jitsuTateguHaba > min && this.jitsuTateguHaba <= max) {
          return max
        }
        min += C_GRID
        max += C_GRID
      }
      return 0
    }
    return this.madoTaka < -100 ? getGridLength() : 0
  }
}
