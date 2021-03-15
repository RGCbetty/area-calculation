function Compute(items, roof) {
  // console.log(roof)
  if (roof) {
    let filtered = items
      .filter((item) => (item.description ? item.description == roof : null))
      .map((item) => ({
        total: item.total == "-" ? 0 : Number(item.total),
        pitch: item.pitch == "" ? 0 : Number(item.pitch),
        roofstyle: item.roofstyle,
      }));
    let area = filtered
      .filter((item) => item.total !== 0 || item.total !== "-")
      .map((item) => item.total);
    let sumArea =
      area.length > 0 ? area.reduce((total, num) => total + num, 0) : 0;
    let details = filtered.map((item) => ({
      pitch: item.pitch == "" ? 0 : Number(item.pitch),
      roofstyle: item.roofstyle,
    }));
    //index 0 y-k
    //index 1 yosemune
    //index 2 kiritsuma
    let total = 0;
    let roofs = [0, 0, 0];
    if (roof.includes("perimeter")) {
      total = sumArea;
    } else {
      for (let i = 0; i < details.length; i++) {
        total = sumArea * details[i].pitch;
        if (details[i].roofstyle == "y-k") {
          if (total) {
            roofs.splice(0, 1, total);
          }
        } else if (details[i].roofstyle == "Yosemune") {
          if (total) {
            roofs.splice(1, 1, total);
          }
        } else if (details[i].roofstyle == "Kiritsuma") {
          if (total) {
            roofs.splice(2, 1, total);
          }
        }
      }
    }
    // let area = filtered  ? filtered.map(item => item.total).reduce( (total, num) => total + num, 0) : null;
    return [total, roofs];
  }
}

export default Compute;
