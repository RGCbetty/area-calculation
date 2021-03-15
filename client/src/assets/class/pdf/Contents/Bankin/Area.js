import Length from "./Length";

export default class Area extends Length {
  constructor() {
    super();
  }
  AreaSummaryTable(areaData, pos) {
    let bankinArea = [];
    for (let x = 0; x < areaData.bankin.area.trow.length; x++) {
      let arr = areaData.bankin.area.trow[x];
      bankinArea.push({
        id: arr.id,
        title: arr.name,
        value: Number(arr.total).toFixed(3),
      });
    }
    this.content[pos].columns[0].stack.push({
      style: "tableExample",
      color: "#444",
      table: {
        widths: ["auto", "auto", "auto"],
        // headerRows: 2,
        width: "70%",
        // keepWithHeaderRows: 1,
        body: [
          [
            {
              text: "Total Area",
              colSpan: 3,
              style: "suheader1",
              border: [0, 0, 0, 0],
            },
            {},
            {},
          ],
          [
            { text: "ID", style: "tableHeader", alignment: "center" },
            { text: "Title", style: "tableHeader", alignment: "center" },
            { text: "Value", style: "tableHeader", alignment: "center" },
          ],
        ],
      },
    });
    this.buildAreaTableBody(bankinArea, pos);
  }
  buildAreaTableBody(items, pos) {
    for (let row of items) {
      let trow = [];
      for (let key in row) {
        // if (!row[key]) continue;
        trow.push({
          text: !row[key] ? "0" : row[key].toString(),
          alignment: "center",
          style: "tbody",
        });
      }
      this.content[pos].columns[0].stack[2].table.body.push(trow);
    }
  }
}
