import Pitch from "../Pitch";

export default class Youjonet extends Pitch {
  constructor() {
    super();
  }
  BuildYoujonet(youjonet, pos) {
    this.content.push({
      columnGap: 5,
      columns: [
        {
          stack: [
            {
              text: "Youjonet",
              style: "subheader",
              pageBreak: "before",
              margin: [0, 0, 0, 0],
            },
            {
              width: "70%",
              style: "tableExample",
              color: "#444",
              margin: [0, 0, 0, 0],
              table: {
                widths: [
                  "auto",
                  "auto",
                  "auto",
                  28,
                  "auto",
                  "auto",
                  28,
                  "auto",
                  "auto",
                  28,
                ],
                headerRows: 2,
                body: [
                  [
                    {
                      text: "Flr. Level",
                      style: "tbody1",
                      alignment: "center",
                    },
                    {
                      text: "1F",
                      style: "tbody1",
                      alignment: "center",
                      colSpan: 3,
                    },
                    {},
                    {},
                    {
                      text: "2F",
                      style: "tbody1",
                      alignment: "center",
                      colSpan: 3,
                    },
                    {},
                    {},
                    {
                      text: "3F",
                      style: "tbody1",
                      alignment: "center",
                      colSpan: 3,
                    },
                    {},
                    {},
                  ],
                  [
                    { text: "Direction", style: "tbody1", alignment: "center" },
                    { text: "Grids", style: "tbody1", alignment: "center" },
                    { text: "Const", style: "tbody1", alignment: "center" },
                    { text: "Irr", style: "tbody1", alignment: "center" },
                    { text: "Grids", style: "tbody1", alignment: "center" },
                    { text: "Const", style: "tbody1", alignment: "center" },
                    { text: "Irr", style: "tbody1", alignment: "center" },
                    { text: "Grids", style: "tbody1", alignment: "center" },
                    { text: "Const", style: "tbody1", alignment: "center" },
                    { text: "Irr", style: "tbody1", alignment: "center" },
                  ],
                ],
              },
            },
          ],
        },
      ],
    });
    this.buildYoujonetTableBody(youjonet, pos);
    this.BankinYoujonetKatanagareParapet(youjonet.kataganareP, pos);
    this.BankinYoujonetKatanagareRoof(youjonet.kataganareR, pos);
    this.BankinYoujonetComputation(youjonet, pos);
  }
  buildYoujonetTableBody(youjonet, pos) {
    for (let row of youjonet.items) {
      let trow = [];

      for (let key in row) {
        trow.push({
          text: row[key].toString() == "" ? " " : row[key].toString(),
          alignment: "center",
          style: "tbody",
          margin: [0, 10],
        });
      }
      this.content[pos].columns[0].stack[1].table.body.push(trow);
    }
  }
  BankinYoujonetKatanagareParapet(youjonetItems, pos) {
    this.content[pos].columns.push({
      stack: [
        {
          style: "tableExample",
          color: "#444",
          width: "70%",
          pageBreak: "before",
          table: {
            widths: ["auto", "auto", "auto", "auto", 49],
            headerRows: 3,
            body: [
              [
                {
                  text: "Youjonet Katanagare (PARAPET)",
                  style: "tableHeader",
                  border: [0, 0, 0, 0],
                  colSpan: 5,
                },
                {},
                {},
                {},
                {},
              ],
              [
                {
                  text: "Direction",
                  style: "tbody",
                  alignment: "center",
                  rowSpan: 2,
                  margin: [0, 8, 0, 0],
                },
                {
                  text: "Length",
                  style: "tbody",
                  alignment: "center",
                  colSpan: 2,
                },
                {},
                { text: "Parapet", style: "tbody", alignment: "center" },
                {
                  text: "Area",
                  style: "tbody",
                  alignment: "center",
                  rowSpan: 2,
                  margin: [0, 8, 0, 0],
                },
              ],
              [
                {},
                { text: "Grid", style: "tbody", alignment: "center" },
                { text: "Addt`l", style: "tbody", alignment: "center" },
                { text: "Height", style: "tbody", alignment: "center" },
                {},
              ],
            ],
          },
        },
      ],
    });
    this.buildYoujonetKatanagarePTableBody(youjonetItems, pos);
  }
  buildYoujonetKatanagarePTableBody(youjonetItems, pos) {
    for (let row of youjonetItems) {
      let trow = [];
      for (let key in row) {
        trow.push({
          text: row[key].toString() == "" ? " " : row[key].toString(),
          alignment: "center",
          style: "tbody",
        });
      }
      this.content[pos].columns[1].stack[0].table.body.push(trow);
    }
  }

  BankinYoujonetKatanagareRoof(youjonetItems, pos) {
    this.content[pos].columns[1].stack.push({
      width: "70%",
      style: "tableExample",
      color: "#444",
      table: {
        widths: ["auto", 25, "auto", "auto", "auto", 20],
        headerRows: 3,
        body: [
          [
            {
              text: "Youjonet Katanagare (ROOF)",
              style: "tableHeader",
              colSpan: 6,
              border: [0, 0, 0, 0],
            },
            {},
            {},
            {},
            {},
            {},
          ],
          [
            {
              text: "Direction",
              alignment: "center",
              style: "tbody",
              margin: [0, 8, 0, 0],
              rowSpan: 2,
            },
            {
              text: "Pitch",
              alignment: "center",
              style: "tbody",
              margin: [0, 8, 0, 0],
              rowSpan: 2,
            },
            { text: "Lenght", alignment: "center", style: "tbody", colSpan: 2 },
            {},
            {
              text: "Width",
              alignment: "center",
              style: "tbody",
              margin: [0, 8, 0, 0],
              rowSpan: 2,
            },
            {
              text: "Area",
              alignment: "center",
              style: "tbody",
              margin: [0, 8, 0, 0],
              rowSpan: 2,
            },
          ],
          [
            {},
            {},
            { text: "Grids", alignment: "center", style: "tbody" },
            { text: "Addt`l", alignment: "center", style: "tbody" },
            {},
            {},
          ],
        ],
      },
    });
    this.buildYoujonetKatanagareRTableBody(youjonetItems, pos);
  }
  buildYoujonetKatanagareRTableBody(youjonetItems, pos) {
    for (let row of youjonetItems) {
      let trow = [];

      for (let key in row) {
        trow.push({
          text: row[key].toString() == "" ? " " : row[key].toString(),
          alignment: "center",
          style: "tbody",
        });
      }
      this.content[pos].columns[1].stack[1].table.body.push(trow);
    }
  }

  BankinYoujonetComputation(youjonet) {
    let directions = ["E", "W", "S", "N"];
    let trow = [
      [
        {
          text: "Computation",
          style: "tableHeader",
          colSpan: 3,
          border: [0, 0, 0, 0],
        },
        {},
        {},
      ],
    ];
    for (let x = 0; x < 4; x++) {
      let row = [
        {
          text: directions[x] + ":" + youjonet.coordinates[x] + "*0.91*3+0*3",
          style: "tbody",
          alignment: "center",
        },
        {
          text:
            Number(youjonet.areaP[x] + youjonet.areaR[x]) != 0
              ? Number(youjonet.areaP[x] + youjonet.areaR[x]).toFixed(3)
              : 0,
          style: "tbody",
          alignment: "center",
        },
        {},
      ];
      trow.push(row);
    }
    trow[1][2] = {
      text: "70730",
      style: "tbody",
      alignment: "center",
    };
    trow[2][2] = {
      text:
        Number(youjonet.total + youjonet.totalP + youjonet.totalR) != 0
          ? Number(youjonet.total + youjonet.totalP + youjonet.totalR).toFixed(
              3
            )
          : 0,
      alignment: "center",
      style: "tbody",
      rowSpan: 3,
      margin: [0, 15, 0, 0],
    };
    this.content.push({
      width: "70%",
      style: "tableExample",
      color: "#444",
      margin: [0, 5],
      table: {
        widths: ["*", "*", "*"],
        body: trow,
      },
    });
  }
}
