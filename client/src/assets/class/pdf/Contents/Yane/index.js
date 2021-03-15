import AreaContent from "./Area";

export default class YaneContent extends AreaContent {
  constructor() {
    super();
    this.content = [];
  }
  Yane(areaData, contentList, pos) {
    this.content = contentList;
    this.YaneTable(areaData.yane.items, pos);
    this.pitchTable(areaData.standard.mr, areaData.standard.sp, pos);
    this.mrAreaTable(areaData.yane.mr.area);
    this.TotalTable(areaData);
    this.buildPerimeterTable(areaData);
    this.buildPenthouseTable(areaData);
    this.spAreaTable(areaData.yane.sp.area);
    this.buildFlatSlopeTable(areaData);
  }
  YaneTable(items, pos) {
    this.content.push({
      columnGap: 10,
      pageBreak: "before",
      columns: [
        {
          stack: [
            { text: "Yane", style: "subheader" },
            {
              width: "70%",
              style: "tableExample",
              color: "#444",
              table: {
                widths: [
                  "auto",
                  "auto",
                  "auto",
                  "auto",
                  "auto",
                  "auto",
                  "auto",
                  90,
                  "auto",
                ],
                headerRows: 2,

                // keepWithHeaderRows: 1,
                body: [
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
                      colSpan: 3,
                      alignment: "center",
                    },
                    {},

                    {},
                    {
                      text: "Width",
                      style: "tableHeader",
                      colSpan: 3,
                      alignment: "center",
                    },
                    {},
                    {},
                    {
                      text: "Description",
                      rowSpan: 2,
                      style: "thead",
                      alignment: "center",
                    },
                    {
                      text: "Area, sq.m.",
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
                      text: "Eaves",
                      style: "tableHeader",
                      alignment: "center",
                    },
                    {
                      text: "Eaves",
                      style: "tableHeader",
                      alignment: "center",
                    },
                    {
                      text: "Grids",
                      style: "tableHeader",
                      alignment: "center",
                    },
                    {
                      text: "Eaves",
                      style: "tableHeader",
                      alignment: "center",
                    },
                    {
                      text: "Eaves",
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
    this.buildTableBody(items, pos);
  }

  buildTableBody(yaneItems, pos) {
    for (let row of yaneItems) {
      let trow = [];

      for (let key in row) {
        // console.log('value', value)
        if (key == "pitch" || key == "roofstyle") continue;
        trow.push({
          text: row[key].toString(),
          alignment: "center",
          style: "tbody",
          margin: [0, 5],
        });
      }
      this.content[pos].columns[0].stack[1].table.body.push(trow);
    }
  }
}
