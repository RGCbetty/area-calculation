import Amaosae from "./Amaosae";
import deepClone from "lodash.clonedeep";

export default class Length extends Amaosae {
  constructor() {
    super();
  }
  BuildLengthTable(BPRG, pos, title) {
    this.content[pos.content].columns[1].stack.push({
      style: "tableExample",
      color: "#444",
      margin: [-5, pos.margin, 0, 0],
      table: {
        widths: [
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
        ],
        headerRows: 3,
        // keepWithHeaderRows: 1,
        body: [
          [
            {
              text: `${title} ${BPRG.count}`,
              colSpan: 10,
              style: "tbody1",
              border: [0, 0, 0, 0],
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          [
            {
              text: "DESC",
              rowSpan: 2,
              alignment: "center",
              style: "tbody1",
              margin: [0, 8, 0, 0],
            },
            {
              text: "PART",
              rowSpan: 2,
              alignment: "center",
              style: "tbody1",
              margin: [0, 8, 0, 0],
            },
            {
              text: "Length",
              colSpan: 2,
              alignment: "center",
              style: "tbody1",
            },
            {},
            {
              text: "Amt",
              rowSpan: 2,
              alignment: "center",
              style: "tbody1",
              margin: [0, 8, 0, 0],
            },
            {
              text: "DESC",
              rowSpan: 2,
              alignment: "center",
              style: "tbody1",
              margin: [0, 8, 0, 0],
            },
            {
              text: "PART",
              rowSpan: 2,
              alignment: "center",
              style: "tbody1",
              margin: [0, 8, 0, 0],
            },
            {
              text: "Length",
              colSpan: 2,
              alignment: "center",
              style: "tbody1",
            },
            {},
            {
              text: "Amt",
              rowSpan: 2,
              alignment: "center",
              style: "tbody1",
              margin: [0, 8, 0, 0],
            },
          ],
          [
            {},
            {},
            { text: "Grid", alignment: "center", style: "tbody1" },
            { text: "Meter", alignment: "center", style: "tbody1" },
            {},
            {},
            {},
            { text: "Grid", alignment: "center", style: "tbody1" },
            { text: "Meter", alignment: "center", style: "tbody1" },
            {},
          ],
        ],
      },
    });

    this.buildLengthBody(BPRG.items, BPRG.items1, pos);
  }
  buildLengthBody(items, items1, pos) {
    items1.forEach((item, index) => {
      items[index].description1 = item.description;
      items[index].properties1 = item.properties;
    });
    for (let item of items) {
      let ow = [],
        fw = [],
        ow1 = [],
        fw1 = [];
      fw.push({
        text: item.description,
        alignment: "center",
        style: "tbody1",
        rowSpan: 2,
        margin: [0, 8, 0, 0],
      });

      ow.push({
        text: "",
      });

      for (let props in item.properties) {
        for (let fields in item.properties[props]) {
          if (item.properties[props].part == "OW") {
            ow.push({
              text: item.properties[props][fields].toString(),
              style: "tbody1",
              alignment: "center",
            });
            ow1.push({
              text: item.properties1[props][fields].toString(),
              style: "tbody1",
              alignment: "center",
            });
          } else {
            fw.push({
              text: item.properties[props][fields].toString(),
              style: "tbody1",
              alignment: "center",
            });
            fw1.push({
              text: item.properties1[props][fields].toString(),
              style: "tbody1",
              alignment: "center",
            });
          }
        }
      }
      fw.push({
        text: item.description1,
        alignment: "center",
        style: "tbody1",
        rowSpan: 2,
        margin: [0, 8, 0, 0],
      });
      ow.push({
        text: "",
      });
      ow1.forEach((item) => {
        ow.push(item);
      });
      fw1.forEach((item) => {
        fw.push(item);
      });
      this.content[pos.content].columns[1].stack[pos.stack].table.body.push(
        fw,
        ow
      );
    }
    // for (let x of items1) {
    //   let ow = [],
    //     fw = [];
    //   fw.push({
    //     text: x.description,
    //     alignment: "center",
    //     style: "tbody1",
    //     rowSpan: 2,
    //     margin: [0, 8, 0, 0],
    //   });
    //   ow.push({
    //     text: "",
    //   });

    //   for (let props in x.properties) {
    //     for (let fields in x.properties[props]) {
    //       if (x.properties[props].part == "OW") {
    //         ow.push({
    //           text: x.properties[props][fields].toString(),
    //           style: "tbody1",
    //           alignment: "center",
    //         });
    //       } else {
    //         fw.push({
    //           text: x.properties[props][fields].toString(),
    //           style: "tbody1",
    //           alignment: "center",
    //         });
    //       }
    //     }
    //   }
    //   console.log(ow, "OW");
    //   console.log(fw, "FW");
    //   this.content[pos].columns[1].stack[2].table.body.push(fw, ow);
    // }
    // for (let x of items1) {
    //   fw.push({
    //     text: x.description,
    //     alignment: "center",
    //     style: "tbody1",
    //     rowSpan: 2,
    //     margin: [0, 8, 0, 0],
    //   });
    //   ow.push({
    //     text: "",
    //   });

    //   for (let props in x.properties) {
    //     for (let fields in x.properties[props]) {
    //       if (x.properties[props].part == "OW") {
    //         ow.push({
    //           text: x.properties[props][fields].toString(),
    //           style: "tbody1",
    //           alignment: "center",
    //         });
    //       } else {
    //         fw.push({
    //           text: x.properties[props][fields].toString(),
    //           style: "tbody1",
    //           alignment: "center",
    //         });
    //       }
    //     }
    //   }
    //   this.content[pos].columns[1].stack[2].table.body.push(fw, ow);
    // }
  }
  LengthSummaryTable(areaData, pos) {
    let SummaryItems = [];
    let items = deepClone(areaData.bankin.length);
    for (let x = 0; x < items.length; x++) {
      for (let key in items[x]) {
        if (key == "name")
          items[x][key] = items[x][key].match(/\((.*)\)/).pop();
      }
      SummaryItems.push({
        id: items[x].id,
        title: items[x].name,
        value: Number(items[x].total).toFixed(3),
      });
    }
    this.content[pos].columns[0].stack.push({
      style: "tableExample",
      color: "#444",
      margin: [0, -10, 0, 0],
      table: {
        widths: ["auto", "auto", "auto"],
        // headerRows: 2,
        width: "70%",
        // keepWithHeaderRows: 1,
        body: [
          [
            {
              text: "Total Length",
              colSpan: 3,
              style: "subheader1",
              border: [0, 0, 0, 0],
            },
            {},
            {},
          ],
          [
            { text: "ID", style: "tbody1", alignment: "center" },
            { text: "Title", style: "tbody1", alignment: "center" },
            { text: "Value", style: "tbody1", alignment: "center" },
          ],
        ],
      },
    });
    this.buildLengthTableBody(SummaryItems, pos);
  }

  buildLengthTableBody(items, pos) {
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
      this.content[pos].columns[0].stack[3].table.body.push(trow);
    }
  }
}
