const {toDbl, toBul, toEnm} = require('./dtxfunct' );
const {reformEnum} = require('./dtxtypes')

class DTXPlanDetailItem{
  
  constructor(){
    this.clear();  
  }

  load(data){
    this.kenchikuSeigenTaka = toDbl( {'str': data[1], 'pos':  0, 'len': 10 } )
    this.hokui              = toDbl( {'str': data[1], 'pos': 10, 'len': 10 } )
    this.toukei             = toDbl( {'str': data[1], 'pos': 20, 'len': 10 } )
    this.ippanKabeAtsu      = toDbl( {'str': data[1], 'pos': 30, 'len': 10 } )
    this.gaihekiAtsu        = toDbl( {'str': data[1], 'pos': 40, 'len': 10 } )
    this.yaneShiageAtsu     = toDbl( {'str': data[1], 'pos': 50, 'len': 10 } )
    this.nunoKisoAtsumi     = toDbl( {'str': data[1], 'pos': 60, 'len': 10 } )
    this.tategutanbu        = toDbl( {'str': data[1], 'pos': 70, 'len': 10 } )
    this.shitajiAtsu        = toDbl( {'str': data[1], 'pos': 80, 'len': 10 } )  
    this.mensekiHoseiyou    = toDbl( {'str': data[1], 'pos': 90, 'len': 10 } )
    this.gaiHekiReform      = toEnm( {'str': data[2], 'pos':  0, 'len':  5 }, reformEnum);
    this.yaneReform         = toEnm( {'str': data[2], 'pos':  5, 'len':  5 }, reformEnum);
    this.tateguKaiheiJoutai = toBul( {'str': data[3]} )
    this.mojiHoukou         = toDbl( {'str': data[4], 'pos':  0, 'len': 10 } )
    this.sunpouHouko        = toDbl( {'str': data[4], 'pos': 10, 'len': 10 } )

    let vShitajiAtsuDiv2    = -this.shitajiAtsu / 2;
    this.naibuKabeAtsu      = this.ippanKabeAtsu / 2;
    this.ippanShiageAtsu    = this.naibuKabeAtsu + vShitajiAtsuDiv2;
    this.gaiheikiShiageAtsu = ( -this.ippanKabeAtsu + this.ippanShiageAtsu ) + this.gaihekiAtsu;
    this.gaibuKabeAtsu      = ( this.gaihekiAtsu - this.gaiheikiShiageAtsu ) - this.naibuKabeAtsu;
    this.gaihekiFromGrid    = this.gaihekiAtsu - this.naibuKabeAtsu;
  }

  clear(){
    this.kenchikuSeigenTaka    = 0;
    this.hokui                 = 0;
    this.toukei                = 0;
    this.ippanKabeAtsu         = 0;
    this.gaihekiAtsu           = 0;
    this.yaneShiageAtsu        = 0;
    this.nunoKisoAtsumi        = 0;
    this.tategutanbu           = 0;
    this.shitajiAtsu           = 0;
    this.mensekiHoseiyou       = 0;
    this.gaiHekiReform         = {};
    this.yaneReform            = {}; 
    this.tateguKaiheiJoutai    = false;
    this.mojiHoukou            = 0;
    this.sunpouHouko           = 0;
    this.naibuKabeAtsu         = 0; 
    this.gaibuKabeAtsu         = 0;
    this.gaihekiFromGrid       = 0;
    this.ippanShiageAtsu       = 0;
    this.gaiheikiShiageAtsu    = 0;
  }
}

module.exports = DTXPlanDetailItem
