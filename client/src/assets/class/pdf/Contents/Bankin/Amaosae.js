import Youjonet from "./Youjonet";

export default class Amaosae extends Youjonet {
  constructor() {
    super();
  }
  BankinTableAmaosae(amaosaeItems, pos) {
    this.content[pos].columns[0].stack.push({
      width: "70%",
      style: "tableExample",
      color: "#444",
      margin: [0, 0, 0, 0],
      table: {
        widths: ["auto", "auto", "auto", "auto", "auto", "auto", "auto"],
        headerRows: 1,
        body: [
          [
            {
              text: "Amaosae",
              style: "tableHeader",
              colSpan: 7,
              border: [0, 0, 0, 0],
            },
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          [
            {
              text: "No",
              rowSpan: 2,
              style: "thead",
              alignment: "center",
              margin: [0, 0, 0, 0],
            },
            {
              text: "Grids",
              rowSpan: 2,
              style: "thead",
              alignment: "center",
              margin: [0, 0, 0, 0],
            },
            {
              text: "Add`l",
              rowSpan: 2,
              style: "thead",
              alignment: "center",
              margin: [0, 0, 0, 0],
            },
            {
              text: "Const.",
              rowSpan: 2,
              style: "thead",
              alignment: "center",
              margin: [0, 0, 0, 0],
            },
            {
              text: "ITEM",
              rowSpan: 2,
              style: "thead",
              alignment: "center",
              margin: [0, 0, 0, 0],
            },
            {
              text: "Dir",
              rowSpan: 2,
              style: "thead",
              alignment: "center",
              margin: [0, 0, 0, 0],
            },
            {
              text: "Length, M",
              rowSpan: 2,
              style: "thead",
              alignment: "center",
              margin: [0, 0, 0, 0],
            },
          ],
          [{}, {}, {}, {}, {}, {}, {}],
        ],
      },
    });
    this.buildBankinTableAmaosaeBody(amaosaeItems, pos);
  }
  buildBankinTableAmaosaeBody(amaosaeItems, pos) {
    for (let row of amaosaeItems) {
      let trow = [];
      for (let key in row) {
        let obj = {
          text: row[key].toString() == "" ? " " : row[key].toString(),
          alignment: "center",
          style: "tbody",
        };
        trow.push(obj);
        if (trow.length == 8) {
          let index = trow.indexOf(obj);
          trow.splice(index, 1);
        }
      }
      this.content[pos].columns[0].stack[4].table.body.push(trow);
    }
  }
}
