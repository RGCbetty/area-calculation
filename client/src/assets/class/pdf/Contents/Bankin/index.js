import Area from "./Area";
export default class Bankin extends Area {
  constructor() {
    super();
  }
  Bankin(areaData, contentList, pos) {
    this.content = contentList;
    this.BankinTableArea(areaData.bankin.area, pos);
    this.allPitchTable(areaData.standard.allpitch, pos, "before");
    this.AreaSummaryTable(areaData, pos);
    this.LengthSummaryTable(areaData, pos);
    this.BuildLengthTable(
      areaData.bankin.balcony,
      { content: pos, stack: "2", margin: -15 },
      "Balcony"
    );
    this.BuildLengthTable(
      areaData.bankin.parapet,
      { content: pos, stack: "3", margin: 0 },
      "Parapet"
    );
    this.BuildLengthTable(
      areaData.bankin.roofgarden,
      { content: pos, stack: "4", margin: 0 },
      "Roof Garden"
    );
    this.BankinTableAmaosae(areaData.bankin.items, pos);

    this.BuildYoujonet(areaData.bankin.youjonet, pos + 1);
  }
  BankinTableArea(area, pos) {
    this.content.push({
      columns: [
        {
          stack: [
            {
              text: "Bankin",
              style: "subheader",
              pageBreak: "before",
              margin: [0, 10, 0, 0],
            },
            {
              // width: "100%",

              style: "tableExample",
              color: "#444",
              margin: [0, -10, 0, 0],
              table: {
                widths: ["auto", "auto", "auto", "auto", "auto", 62, 25],

                // headerRows: 3,
                body: [
                  [
                    {
                      text: area.balconycount,
                      style: "thead",
                      alignment: "center",
                      colSpan: 2,
                      border: [0, 0, 0, 0],
                    },
                    {},
                    {
                      text: area.parapetcount,
                      style: "thead",
                      alignment: "center",
                      colSpan: 2,
                      border: [0, 0, 0, 0],
                    },
                    {},
                    {
                      text: area.roofgardencount,
                      style: "thead",
                      alignment: "center",
                      colSpan: 2,
                      border: [0, 0, 0, 0],
                    },
                    {},
                    {
                      text: area.insidegardencount,
                      style: "thead",
                      alignment: "center",
                      border: [0, 0, 0, 0],
                    },
                  ],
                  [
                    {
                      text: "No",
                      rowSpan: 2,
                      style: "thead",
                      alignment: "center",
                    },
                    {
                      text: "Length",
                      style: "tableHeader",
                      colSpan: 2,
                      alignment: "center",
                    },
                    {},
                    {
                      text: "Width",
                      style: "tableHeader",
                      colSpan: 2,
                      alignment: "center",
                    },
                    {},
                    {
                      text: "Description",
                      rowSpan: 2,
                      style: "thead",
                      alignment: "center",
                    },
                    {
                      text: "Area sq.m.",
                      rowSpan: 2,
                      style: "thead",
                      alignment: "center",
                    },
                  ],
                  [
                    {},
                    {
                      text: "Grids",
                      style: "tableHeader",
                      alignment: "center",
                    },
                    {
                      text: "Meter",
                      style: "tableHeader",
                      alignment: "center",
                    },
                    {
                      text: "Grids",
                      style: "tableHeader",
                      alignment: "center",
                    },
                    {
                      text: "Meter",
                      style: "tableHeader",
                      alignment: "center",
                    },
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
    this.buildBankinTableBody(area.items, pos);
  }

  buildBankinTableBody(bankinItems, pos) {
    for (let row of bankinItems) {
      let trow = [];
      for (let key in row) {
        trow.push({
          text: row[key].toString() == "" ? " " : row[key].toString(),
          alignment: "center",
          style: "tbody",
        });
      }
      this.content[pos].columns[0].stack[1].table.body.push(trow);
    }
  }
}
