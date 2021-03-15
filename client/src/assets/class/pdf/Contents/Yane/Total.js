import Pitch from "../Pitch";

export default class Total extends Pitch {
  constructor() {
    super();
  }
  buildFlatSlopeTable(areaData) {
    this.content[1].columns[1].stack.push({
      style: "tableExample",
      color: "#444",
      margin: [0, 0, 0, 0],
      table: {
        widths: [80, 80],
        // headerRows: 2,
        // keepWithHeaderRows: 1,
        body: [
          [
            {
              text: "Total",
              colSpan: 2,
              style: "tableHeader",
              alignment: "center",
            },
            {},
          ],
          [
            { text: "Flat Roof", style: "tableHeader", alignment: "center" },
            {
              text: `${areaData.yane.total.flatRoof}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
          [
            { text: "Slope Roof", style: "tableHeader", alignment: "center" },
            {
              text: `${areaData.yane.total.slopeRoof}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
        ],
      },
    });
  }
}
