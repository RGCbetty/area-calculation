export default class Pitch {
  constructor() {}
  allPitchTable(pitch, pos, isPageBreak) {
    this.content[pos].columns.push({
      stack: [
        {
          text: "Pitch",
          style: "tableHeader",
          pageBreak: `${isPageBreak ? isPageBreak : null}`,
          margin: [0, 20, 0, 0],
        },
        {
          style: "tableExample",
          color: "#444",
          width: "70%",
          table: {
            widths: [50, 47, 47, 47],
            // headerRows: 2,
            // keepWithHeaderRows: 1,
            body: [
              [
                { text: "FL", style: "tableHeader", alignment: "center" },
                { text: "P1", style: "tableHeader", alignment: "center" },
                { text: "P2", style: "tableHeader", alignment: "center" },
                { text: "P3", style: "tableHeader", alignment: "center" },
              ],
            ],
          },
        },
      ],
    });
    this.allPitchBody(pitch, pos);
  }
  allPitchBody(pitch, pos) {
    let row = [];
    let row1 = [];
    let row2 = [];
    for (let floors in pitch) {
      if (floors == "1F") {
        row.push({
          text: floors,
          style: "tableHeader",
          alignment: "center",
        });
      } else if (floors == "2F") {
        row1.push({
          text: floors,
          style: "tableHeader",
          alignment: "center",
        });
      } else if (floors == "3F") {
        row2.push({
          text: floors,
          style: "tableHeader",
          alignment: "center",
        });
      }
      if (floors != "PH") {
        for (let pitches in pitch[floors]) {
          for (let value in pitch[floors][pitches]) {
            if (floors == "1F") {
              row.push({
                text: pitch[floors][pitches][value],
                style: "tableHeader",
                alignment: "center",
              });
            } else if (floors == "2F") {
              row1.push({
                text: pitch[floors][pitches][value],
                style: "tableHeader",
                alignment: "center",
              });
            } else if (floors == "3F") {
              row2.push({
                text: pitch[floors][pitches][value],
                style: "tableHeader",
                alignment: "center",
              });
            }
          }
        }
      }
    }
    this.content[pos].columns[1].stack[1].table.body.push(row);
    this.content[pos].columns[1].stack[1].table.body.push(row1);
    this.content[pos].columns[1].stack[1].table.body.push(row2);
  }
  pitchTable(mr, sp, pos) {
    this.content[pos].columns.push({
      stack: [
        { text: "Main Roof", style: "subheader" },
        {
          style: "tableExample",
          color: "#444",
          width: "70%",
          table: {
            widths: ["auto", 30, 30, 30, 30],
            // headerRows: 2,
            // keepWithHeaderRows: 1,
            body: [
              [
                { text: "FL", style: "tableHeader", alignment: "center" },
                { text: "P1", style: "tableHeader", alignment: "center" },
                { text: "P2", style: "tableHeader", alignment: "center" },
                { text: "P3", style: "tableHeader", alignment: "center" },
                {
                  text: "Roof Style",
                  style: "tableHeader",
                  alignment: "center",
                },
              ],
            ],
          },
        },
        { text: "Solar Panel", style: "subheader", margin: [0, -10, 0, 0] },
        {
          style: "tableExample",
          color: "#444",
          width: "70%",
          table: {
            widths: [40, 32, 32, 32, 32],
            // headerRows: 2,
            // keepWithHeaderRows: 1,
            body: [
              [
                { text: "FL", style: "tableHeader", alignment: "center" },
                { text: "P1", style: "tableHeader", alignment: "center" },
                { text: "P2", style: "tableHeader", alignment: "center" },
                { text: "P3", style: "tableHeader", alignment: "center" },
              ],
            ],
          },
        },
      ],
    });
    let indexMR = 1;
    let indexSP = 3;
    this.buildPitchBody(mr, indexMR, pos);
    this.buildPitchBody(sp, indexSP, pos);
  }
  buildPitchBody(yane, i, pos) {
    let row = [];
    let row1 = [];
    let row2 = [];
    let ph = [];
    for (let floors in yane) {
      if (floors == "1F") {
        row.push({
          text: floors,
          style: "tableHeader",
          alignment: "center",
        });
      } else if (floors == "2F") {
        row1.push({
          text: floors,
          style: "tableHeader",
          alignment: "center",
        });
      } else if (floors == "3F") {
        row2.push({
          text: floors,
          style: "tableHeader",
          alignment: "center",
        });
      } else if (floors == "PH" && i == 1) {
        ph.push({
          text: floors,
          style: "tableHeader",
          alignment: "center",
        });
      }

      if (floors !== "PH") {
        for (let pitches in yane[floors]) {
          for (let value in yane[floors][pitches]) {
            if (floors == "1F") {
              if (pitches == "roofStyle") continue;
              row.push({
                text: yane[floors][pitches][value],
                style: "tableHeader",
                alignment: "center",
              });
            } else if (floors == "2F") {
              if (pitches == "roofStyle") continue;
              row1.push({
                text: yane[floors][pitches][value],
                style: "tableHeader",
                alignment: "center",
              });
            } else if (floors == "3F") {
              if (pitches == "roofStyle") continue;
              row2.push({
                text: yane[floors][pitches][value],
                style: "tableHeader",
                alignment: "center",
              });
            }
          }
          if (floors == "1F" && pitches == "roofStyle") {
            if (i == 3) continue;
            row.push({
              text: yane[floors][pitches],
              style: "tableHeader",
              alignment: "center",
            });
          } else if (floors == "2F" && pitches == "roofStyle") {
            if (i == 3) continue;
            row1.push({
              text: yane[floors][pitches],
              style: "tableHeader",
              alignment: "center",
            });
          } else if (floors == "3F" && pitches == "roofStyle") {
            if (i == 3) continue;
            row2.push({
              text: yane[floors][pitches],
              style: "tableHeader",
              alignment: "center",
            });
          }
        }
      } else {
        for (let value in yane[floors]) {
          if (i == 1) {
            ph.push({
              text: yane[floors][value],
              style: "tableHeader",
              colSpan: 4,
              alignment: "center",
            });
            ph.push({});
            ph.push({});
            ph.push({});
          }
        }
      }
    }
    this.content[pos].columns[1].stack[i].table.body.push(row);
    this.content[pos].columns[1].stack[i].table.body.push(row1);
    this.content[pos].columns[1].stack[i].table.body.push(row2);
    if (i == 1) {
      this.content[pos].columns[1].stack[i].table.body.push(ph);
    }
  }
}
