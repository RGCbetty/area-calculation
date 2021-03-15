function Compute (items, description){
  
  // let type = description.split(' ')[1]
  // let type1 = description.split(' ')[2]
  //   if(type == 's' || type1 == 's'){
        let slant = items.filter(i => i.description.includes(description)).map(j => j.length).filter(k => isNaN(k.length) )
        let totalArea = slant.length > 0 ? slant.reduce((total, value) => total + value, 0) : 0
      return totalArea
    // } else if(type == 'h' || type1 == 'h') {
    //     let details = items.filter(i => i.description == description).map(j => j.total == '-' ? 0 : parseFloat(j.total))
    //     let totalArea = details.length > 0 ? details.reduce((total, value) => total + value, 0) : 0
    //     return totalArea
    //   }
  }
  export default Compute