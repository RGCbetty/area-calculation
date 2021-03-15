import Summary from "./Summary";

export default class Hafu extends Summary {
  constructor() {
    super();
  }
  Hafu(areaData, contentList, pos) {
    this.content = contentList;
    this.HafuTable(areaData.hafu.items, pos);
    this.allPitchTable(areaData.standard.allpitch, pos);
    this.HafuSlant(areaData.hafu.slants, pos);
    this.HafuHorizontal(areaData.hafu.horizontals, pos);
    this.HafuSubTotal(areaData.hafu.subTotal, pos);
  }
  HafuTable(hafuItems, pos) {
    this.content.push({
      columnGap: 5,
      pageBreak: "before",
      columns: [
        {
          stack: [
            { text: "Hafu", style: "subheader" },
            {
              width: "70%",
              style: "tableExample",
              color: "#444",
              table: {
                widths: [20, 35, 35, 35, 50, 100],
                body: [
                  [
                    {
                      text: "No",
                      alignment: "center",
                      style: "tbody",
                      rowSpan: 2,
                      margin: [0, 8, 0, 0],
                    },
                    {
                      text: "Length",
                      alignment: "center",
                      style: "tbody",
                      colSpan: 3,
                    },
                    {},
                    {},
                    {
                      text: "Subtotal",
                      alignment: "center",
                      style: "tbody",
                      rowSpan: 2,
                      margin: [0, 8, 0, 0],
                    },
                    {
                      text: "Description",
                      alignment: "center",
                      style: "tbody",
                      rowSpan: 2,
                      margin: [0, 8, 0, 0],
                    },
                  ],
                  [
                    {},
                    { text: "Grid", style: "tbody", alignment: "center" },
                    {
                      text: "Eaves",
                      style: "tbody",
                      alignment: "center",
                      colSpan: 2,
                    },
                    {},
                    {},
                    {},
                  ],
                ],
              },
            },
          ],
        },
      ],
    });
    this.buildHafuTable(hafuItems, pos);
  }
  buildHafuTable(hafuItems, pos) {
    for (let row of hafuItems) {
      let trow = [];
      for (let key in row) {
        let obj = {
          text: row[key].toString() == "" ? " " : row[key].toString(),
          alignment: "center",
          style: "tbody",
        };
        trow.push(obj);
        if (trow.length == 7) {
          let index = trow.indexOf(obj);
          trow.splice(index, 1);
        }
      }
      this.content[pos].columns[0].stack[1].table.body.push(trow);
    }
  }
}
