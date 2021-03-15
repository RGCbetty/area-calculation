function Compute (items, description, module){
  if(Array.isArray(description)){

    let type = description[0].split(' ')
    let type1 = description[1].split(' ')
      if(type[0] == 'MR' || type1[0] == 'SP' ){
          let MR = items.filter(i => i.description ? i.description.includes(description[0]) : null).map((j) => ({
            grid: !j.l_grid || NaN ? 0 : parseFloat(j.l_grid),
            total: j.total == '-' ? 0 : parseFloat(j.total),
            pitch: j.pitch == '' ? 0 : parseFloat(j.pitch),
          }))
          let SP = items.filter(i => i.description ? i.description.includes(description[1]): null).map((j) => ({
            grid: !j.l_grid || NaN ? 0 : parseFloat(j.l_grid),
            total: j.total == '-' ? 0 : parseFloat(j.total),
            pitch: j.pitch == '' ? 0 : parseFloat(j.pitch),
          }))
            let deduct = 0
            let total = 0
            let MRgrids = MR.map(k => k.grid)
            let MRtotalGrids = MRgrids.length > 0 ? MRgrids.reduce( (total, value) => total + value, 0) : 0
            let MRarea = MR.filter(i=> i.total !== 0).map(o => o.total)
            let MRtotalArea = MRarea.length > 0 ? MRarea.reduce((total, value) => total + value, 0) : 0

            let MRpitches = []
            for(let detail of MR ){
              MRpitches.push(detail.pitch)
            }

              if(MRpitches.length > 0){
                for(let i = 0; i < MRpitches.length; i++){
                  deduct = MRtotalGrids * module * .161 *  MRpitches[i];
                  total = (MRtotalArea  * MRpitches[i]) - deduct
                }
              }

            let SPgrids = SP.map(k => k.grid)
            let SPtotalGrids = SPgrids.length > 0 ? SPgrids.reduce( (total, value) => total + value, 0) : 0
            let SParea = SP.filter(i=> i.total !== 0).map(o => o.total)
            let SPtotalArea = SParea.length > 0 ? SParea.reduce((total, value) => total + value, 0) : 0

            let SPpitches = []
            for(let detail of SP ){
              SPpitches.push(detail.pitch)
            }

            if(SPpitches.length > 0){
              for(let i = 0; i < SPpitches.length; i++){
                deduct = SPtotalGrids * module * .161 * SPpitches[i];
                total = (SPtotalArea  * SPpitches[i]) - deduct
              }
            }

          return [total, deduct]
    } 
  } else {
    let details = items.filter(i => i.description == description).map(j => j.total == '-' ? 0 : parseFloat(j.total))
    let totalArea = details.length > 0 ? details.reduce((total, value) => total + value, 0) : 0
    return totalArea
  }

}

export default Compute