import Pitch from "../Pitch";

export default class Slant extends Pitch {
  constructor() {
    super();
  }
  HafuSlant(hafuSlants, pos) {
    let data = [
        [
          {
            text: "HAFU slant m/mm",
            alignment: "center",
            style: "tbody",
            colSpan: 2,
            rowSpan: 2,
          },
          {},
        ],
        [{}, {}],
      ],
      total = 0;
    for (let x = 0; x < hafuSlants.length; x++) {
      let row = [
        { text: `${x + 1}F`, alignment: "center", style: "tbody" },
        {
          text: hafuSlants[x] != 0 ? Number(hafuSlants[x]).toFixed(3) : 0,
          alignment: "center",
          style: "tbody",
        },
      ];
      data.push(row);
      total += hafuSlants[x];
    }
    data.push([
      { text: "Total", alignment: "center", style: "tbody" },
      { text: Number(total).toFixed(3), alignment: "center", style: "tbody" },
    ]);

    this.content[pos].columns[1].stack.push({
      style: "tableExample",
      color: "#444",
      margin: [0, 5],
      table: {
        widths: [100, 100],
        body: data,
      },
    });
  }
  HafuHorizontal(hafuHorizontal, pos) {
    let data = [
        [
          {
            text: "HAFU horizontal m/mm",
            alignment: "center",
            style: "tbody",
            colSpan: 2,
            rowSpan: 2,
          },
          {},
        ],
        [{}, {}],
      ],
      total = 0;
    for (let x = 0; x < hafuHorizontal.length; x++) {
      let row = [
        { text: `${x + 1}F`, alignment: "center", style: "tbody" },
        {
          text:
            hafuHorizontal[x] != 0 ? Number(hafuHorizontal[x]).toFixed(3) : 0,
          alignment: "center",
          style: "tbody",
        },
      ];
      data.push(row);
      total += hafuHorizontal[x];
    }
    data.push([
      { text: "Total", alignment: "center", style: "tbody" },
      { text: Number(total).toFixed(3), alignment: "center", style: "tbody" },
    ]);

    this.content[pos].columns[1].stack.push({
      style: "tableExample",
      color: "#444",
      margin: [0, 5],
      table: {
        widths: [100, 100],
        body: data,
      },
    });
  }
  HafuSubTotal(hafuSubTotal, pos) {
    this.content.push({
      style: "tableExample",
      color: "#444",
      margin: [0, 5],
      table: {
        widths: [20, 80, 80, 80, 80, 80, 80],
        body: [
          [
            { text: "No", alignment: "center", style: "tbody" },
            { text: "HANA 1F", alignment: "center", style: "tbody" },
            { text: "HAFU 1F", alignment: "center", style: "tbody" },
            { text: "HANA 2F", alignment: "center", style: "tbody" },
            { text: "HAFU 2F", alignment: "center", style: "tbody" },
            { text: "HANA 3F", alignment: "center", style: "tbody" },
            { text: "HAFU 3F", alignment: "center", style: "tbody" },
          ],
        ],
      },
    });
    this.buildHafuSubTotalTable(hafuSubTotal, pos);
  }
  buildHafuSubTotalTable(hafuSubTotal, pos) {
    for (let row of hafuSubTotal) {
      let trow = [];
      for (let key in row) {
        // if (!row[key]) continue;
        trow.push({
          text: !row[key] ? "0" : row[key].toString(),
          alignment: "center",
          style: "tbody",
        });
      }
      this.content[pos + 1].table.body.push(trow);
    }
  }
}
