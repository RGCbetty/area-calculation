import Dehairi from "./Dehairi";

export default class Nokiten extends Dehairi {
  constructor() {
    super();
  }
  Nokiten(areaData, contentList, pos) {
    this.content = contentList;
    this.NokitenTable(areaData.nokiten, pos, "Nokiten");
    this.pitchTable(areaData.standard.mr, areaData.standard.sp, pos);
    this.Underlayer(areaData.nokiten, pos);
    this.Nsiding(areaData.nokiten, pos);
    this.TotalSummary(areaData.nokiten, pos);

    this.NokitenTable(areaData.nokitenD, pos + 1, "Nokiten Dehairi");
    this.pitchTable(areaData.standard.mr, areaData.standard.sp, pos + 1);
    this.Nsiding(areaData.nokitenD, pos + 1);
    this.TotalSummary(areaData.nokitenD, pos + 1);
  }
  TotalSummary(nokiten, pos) {
    this.content[pos].columns[1].stack.push({
      style: "tableExample",
      color: "#444",
      margin: [0, 10, 0, 0],
      table: {
        widths: [105, 106],
        // headerRows: 2,
        // keepWithHeaderRows: 1,
        body: [
          [
            {
              text: "Summary",
              colSpan: 2,
              style: "tableHeader",
              alignment: "center",
            },
            {},
          ],
          [
            {
              text: "Garage",
              style: "tableHeader",
              alignment: "center",
            },
            {
              text: `${nokiten.summary.garage}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
          [
            {
              text: "Balcony",
              style: "tableHeader",
              alignment: "center",
            },
            {
              text: `${nokiten.balconytotal}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
          [
            {
              text: "1F",
              style: "tableHeader",
              alignment: "center",
            },
            {
              text: `${nokiten.overAll1F}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
          [
            {
              text: "2F",
              style: "tableHeader",
              alignment: "center",
            },
            {
              text: `${nokiten.overAll2F}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
          [
            {
              text: "3F",
              style: "tableHeader",
              alignment: "center",
            },
            {
              text: `${nokiten.overAll3F}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
          [
            {
              text: "Total",
              style: "tableHeader",
              alignment: "center",
            },
            {
              text: `${nokiten.totalSummary}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
        ],
      },
    });
  }
  Nsiding(nokiten, pos) {
    this.content[pos].columns[1].stack.push({
      style: "tableExample",
      color: "#444",
      margin: [0, 10, 0, 0],
      table: {
        widths: [52, 52, 110],
        // headerRows: 2,
        // keepWithHeaderRows: 1,
        body: [
          [
            {
              text: "N.Siding",
              colSpan: 2,
              style: "tableHeader",
              alignment: "center",
            },
            {},
            {
              text: "0.161",
              style: "tableHeader",
              alignment: "center",
            },
          ],
          [
            {
              text: "Garage",
              colSpan: 2,
              style: "tableHeader",
              alignment: "center",
            },
            {},
            {
              text: `${nokiten.siding.garage}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
          [
            {
              text: "Balcony",
              colSpan: 2,
              style: "tableHeader",
              alignment: "center",
            },
            {},
            {
              text: `${nokiten.balconytotal}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
          [
            {
              text: "H. Wall",
              colSpan: 2,
              style: "tableHeader",
              alignment: "center",
            },
            {},
            {
              text: `${nokiten.hangingwalltotal}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
          [
            {
              text: "1F",
              style: "tableHeader",
              alignment: "center",
            },
            {
              text: `${nokiten.siding.floorMinus[0] +
                nokiten.summary.floorDeduct[0]}`,
              style: "tableHeader",
              alignment: "center",
            },
            {
              text: `${nokiten.partialEaves1F}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
          [
            {
              text: "2F",
              style: "tableHeader",
              alignment: "center",
            },
            {
              text: `${nokiten.siding.floorMinus[1] +
                nokiten.summary.floorDeduct[1]}`,
              style: "tableHeader",
              alignment: "center",
            },
            {
              text: `${nokiten.partialEaves2F}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
          [
            {
              text: "3F",
              style: "tableHeader",
              alignment: "center",
            },
            {
              text: `${nokiten.siding.floorMinus[2] +
                nokiten.summary.floorDeduct[2]}`,
              style: "tableHeader",
              alignment: "center",
            },
            {
              text: `${nokiten.partialEaves3F}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
          [
            {
              text: "All Eaves",
              colSpan: 2,
              style: "tableHeader",
              alignment: "center",
            },
            {},
            {
              text: `${nokiten.totalEaves}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
        ],
      },
    });
  }
  Underlayer(nokiten, pos) {
    this.content[pos].columns[1].stack.push({
      style: "tableExample",
      color: "#444",
      margin: [0, 10, 0, 0],
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
        ],
        // headerRows: 2,
        // keepWithHeaderRows: 1,
        body: [
          [
            {
              text: "Underlayer Check",
              colSpan: 8,
              style: "tableHeader",
              alignment: "center",
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
        ],
      },
    });
    this.underlayerBody(nokiten, pos);
  }
  underlayerBody(nokiten, pos) {
    this.content[pos].columns[1].stack[4].table.body.push([
      {
        text: "Fujoshitsu",
        colSpan: 2,
        style: "tableHeader",
        alignment: "center",
      },
      {},
      {
        text: `${nokiten.selected ? nokiten.selected : " "}`,
        colSpan: 6,
        style: "tableHeader",
        alignment: "center",
      },
      {},
      {},
      {},
      {},
      {},
    ]);
    this.content[pos].columns[1].stack[4].table.body.push([
      {
        text: " ",
        colSpan: 2,
        style: "tableHeader",
        alignment: "center",
      },
      {},
      {
        text: "1st Floor",
        colSpan: 3,
        style: "tableHeader",
        alignment: "center",
      },
      {},
      {},
      {
        text: "2nd Floor",
        colSpan: 3,
        style: "tableHeader",
        alignment: "center",
      },
      {},
      {},
    ]);
    this.content[pos].columns[1].stack[4].table.body.push([
      {
        text: "Balcony",
        colSpan: 2,
        style: "tableHeader",
        alignment: "center",
      },
      {},
      {
        text: `${nokiten.underlayer.balconyFloors[0]}`,
        colSpan: 3,
        style: "tableHeader",
        alignment: "center",
      },
      {},
      {},
      {
        text: `${nokiten.underlayer.balconyFloors[1]}`,
        colSpan: 3,
        style: "tableHeader",
        alignment: "center",
      },
      {},
      {},
    ]);
    this.content[pos].columns[1].stack[4].table.body.push([
      {
        text: " ",
        colSpan: 2,
        style: "tableHeader",
        alignment: "center",
      },
      {},
      {
        text: "1st Floor",
        colSpan: 2,
        style: "tableHeader",
        alignment: "center",
      },
      {},
      {
        text: "2nd Floor",
        colSpan: 2,
        style: "tableHeader",
        alignment: "center",
      },
      {},
      {
        text: "3rd Floor",
        colSpan: 2,
        style: "tableHeader",
        alignment: "center",
      },
      {},
    ]);
    this.content[pos].columns[1].stack[4].table.body.push([
      {
        text: "H.Wall",
        colSpan: 2,
        style: "tableHeader",
        alignment: "center",
      },
      {},
      {
        text: "GT",
        style: "tableHeader",
        alignment: "center",
      },
      {
        text: `${nokiten.underlayer.h_wallFloors[0]}`,
        style: "tableHeader",
        alignment: "center",
      },
      { text: "GT", style: "tableHeader", alignment: "center" },
      {
        text: `${nokiten.underlayer.h_wallFloors[1]}`,
        style: "tableHeader",
        alignment: "center",
      },
      { text: "GT", style: "tableHeader", alignment: "center" },
      {
        text: `${nokiten.underlayer.h_wallFloors[2]}`,
        style: "tableHeader",
        alignment: "center",
      },
    ]);
  }
  NokitenTable(nokiten, pos, title) {
    this.content.push({
      columnGap: 10,
      pageBreak: "before",
      columns: [
        {
          stack: [
            { text: `${title}`, style: "subheader" },
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
                    {},
                  ],
                ],
              },
            },
          ],
        },
      ],
    });
    this.buildTableBody(nokiten.items, pos);
  }
  buildTableBody(nokitenItems, pos) {
    for (let row of nokitenItems) {
      let trow = [];
      for (let key in row) {
        // console.log('value', value)
        if (key == "pitch" || key == "roofstyle") continue;
        trow.push({
          text: row[key].toString(),
          alignment: "center",
          style: "tbody",
          margin: [0, 10],
        });
      }
      this.content[pos].columns[0].stack[1].table.body.push(trow);
    }
  }
}
