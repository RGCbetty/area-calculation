module.exports = class DodaiMizukiri {
  constructor() {
    this.externwallLength = 0
    this.domaOpening = 0
    this.totalPerimeter = 0
  }

  compute(options) {
    this.externwallLength = this.getExternalWallLength(options)
    this.domaOpening = this.getDomaOpening(options)
    this.totalPerimeter = this.getTotalPerimeter()

    // console.log(this)
  }

  getExternalWallLength(options) {
    let wall = options.wall
    let gaisyuu = options.gaisyuu

    if (gaisyuu.items[0]) {
      let result = 0
      result = gaisyuu.items[0].perimeterInMillimeter

      result += wall.kabe.getExternalWallLength('1階', {
        gaisyuu: gaisyuu,
      })

      result += wall.sodekabe.getExternalWallLength('1階', {
        gaisyuu: gaisyuu,
      })

      return result / 1000
    } else return 0
  }

  getDomaOpening(options) {
    let tategu = options.tategu
    if (tategu.gaibu[0] || tategu.genkan[0]) {
      return tategu.getlengthFromNegativeFloorLevel(1) / 1000
    }
    return 0
  }

  getTotalPerimeter() {
    const C_CORNER = 0.72
    const C_VALUE = 1.492
    return this.externwallLength - this.domaOpening + C_CORNER + C_VALUE
  }
}
