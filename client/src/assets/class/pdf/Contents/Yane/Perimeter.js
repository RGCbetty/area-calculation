// import PitchContent from "./Pitch";
import Total from "./Total";

export default class Perimeter extends Total {
  constructor() {
    super();
  }
  buildPerimeterTable(areaData) {
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
              text: "Perimeter",
              colSpan: 2,
              style: "tableHeader",
              alignment: "center",
            },
            {},
          ],
          [
            { text: "1F", style: "tableHeader", alignment: "center" },
            {
              text: `${areaData.yane.lperimeter["1F"]}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
          [
            { text: "2F", style: "tableHeader", alignment: "center" },
            {
              text: `${areaData.yane.lperimeter["2F"]}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
        ],
      },
    });
  }
}
