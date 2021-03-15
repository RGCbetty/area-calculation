import Perimeter from "./Perimeter";

export default class Penthouse extends Perimeter {
  constructor() {
    super();
  }
  buildPenthouseTable(areaData) {
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
              text: "Penthouse",
              colSpan: 2,
              style: "tableHeader",
              alignment: "center",
            },
            {},
          ],
          [
            { text: "Pitch", style: "tableHeader", alignment: "center" },
            {
              text: `${areaData.standard.mr[`PH`].value || 0}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
          [
            { text: "Perimeter", style: "tableHeader", alignment: "center" },
            {
              text: `${areaData.yane.penthouse.perimeter.value}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
          [
            { text: "Area", style: "tableHeader", alignment: "center" },
            {
              text: `${areaData.yane.penthouse.area.PH.value}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
        ],
      },
    });
  }
}
