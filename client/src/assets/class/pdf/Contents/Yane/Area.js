import Penthouse from "./Penthouse";

export default class AreaContent extends Penthouse {
  constructor() {
    super();
  }
  TotalTable(area) {
    this.content[1].columns[1].stack.push({
      style: "tableExample",
      color: "#444",
      margin: [0, 4, 0, 0],
      table: {
        widths: [80, 80],
        // headerRows: 2,
        // keepWithHeaderRows: 1,
        body: [
          [
            { text: "Total", style: "tableHeader", alignment: "center" },
            {
              text: `${area.yane.mr.area.total}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
          [
            { text: "Yosemune", style: "tableHeader", alignment: "center" },
            {
              text: `${area.yane.mr.kiritsuma.yosemune.total}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
          [
            { text: "Kiritsuma", style: "tableHeader", alignment: "center" },
            {
              text: `${area.yane.mr.kiritsuma.kiritsuma.total}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
          [
            { text: "Perimeter1", style: "tableHeader", alignment: "center" },
            {
              text: `${area.yane.mr.perimeter.p1.value}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
          [
            { text: "Perimeter2", style: "tableHeader", alignment: "center" },
            {
              text: `${area.yane.mr.perimeter.p2.value}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
          [
            { text: "Perimeter3", style: "tableHeader", alignment: "center" },
            {
              text: `${area.yane.mr.perimeter.p3.value}`,
              style: "tableHeader",
              alignment: "center",
            },
          ],
        ],
      },
    });
  }
  mrAreaTable(area) {
    this.content[1].columns[1].stack.push({
      style: "tableExample",
      color: "#444",
      margin: [0, -5],
      table: {
        widths: ["auto", "auto", "auto", 65],
        // headerRows: 2,
        // keepWithHeaderRows: 1,
        body: [
          [
            {
              text: "Main Roof",
              colSpan: 4,
              style: "tableHeader",
              alignment: "center",
            },
            {},
            {},
            {},
          ],
        ],
      },
    });
    this.buildTableMrBody(area);
  }
  spAreaTable(areaData) {
    this.content[1].columns[1].stack.push({
      style: "tableExample",
      color: "#444",
      margin: [0, 0, 0, 0],
      table: {
        widths: [80, 80],
        // headerRows: 2,
        // keepWithHeaderRows: 1,
        body: [
          [
            {
              text: "Solar Panel",
              colSpan: 2,
              style: "tableHeader",
              alignment: "center",
            },
            {},
          ],
        ],
      },
    });
    this.buildTableSpBody(areaData);
  }
  buildTableSpBody(areaItems) {
    let row = [];
    let row1 = [];
    let row2 = [];
    let row3 = [];
    // console.log(areaItems)
    for (let floors in areaItems) {
      if (floors == "1F") {
        row.push({
          text: `${floors} Area`,
          style: "tableHeader",
          alignment: "center",
        });
        row.push({
          text: areaItems.sum1F,
          style: "tableHeader",
          alignment: "center",
        });
      } else if (floors == "2F") {
        // console.log(areaItems.sum2F)
        row1.push({
          text: `${floors} Area`,
          style: "tableHeader",
          alignment: "center",
        });
        row1.push({
          text: areaItems.sum2F,
          style: "tableHeader",
          alignment: "center",
        });
      } else if (floors == "3F") {
        // console.log(areaItems.sum3F)
        row2.push({
          text: `${floors} Area`,
          style: "tableHeader",
          alignment: "center",
        });
        row2.push({
          text: areaItems.sum3F,
          style: "tableHeader",
          alignment: "center",
        });
      }
      // if(floors !== 'PH'){
      // for(let pitches in areaItems[floors]){
      //   for(let value in areaItems[floors][pitches]){
      //     if(floors == '1F'){
      //         row.push({
      //           text: areaItems.sum1F,
      //           style: 'tableHeader',
      //           alignment: 'center',
      //           rowSpan: 3,
      //           margin: [0, 10]
      //         })
      //     } else if(floors == '2F') {
      //           row1.push({
      //             text: areaItems.sum2F,
      //             style: 'tableHeader',
      //             alignment: 'center',
      //             rowSpan: 3,
      //             margin: [0, 10]
      //           })
      //     } else if(floors == '3F') {
      //           row2.push({
      //             text: areaItems.sum3F,
      //             style: 'tableHeader',
      //             alignment: 'center',
      //             rowSpan: 3,
      //             margin: [0, 10]
      //           })
      //     }
      //   }
      // }
      // }
    }
    row3.push({
      text: `Total`,
      style: "tableHeader",
      alignment: "center",
    });
    row3.push({
      text: areaItems.total,
      style: "tableHeader",
      alignment: "center",
    });
    this.content[1].columns[1].stack[8].table.body.push(row);
    this.content[1].columns[1].stack[8].table.body.push(row1);
    this.content[1].columns[1].stack[8].table.body.push(row2);
    this.content[1].columns[1].stack[8].table.body.push(row3);
  }
  buildTableMrBody(areaItems) {
    let row = [];
    let row1 = [];
    let row2 = [];
    let row3 = [];
    let row4 = [];
    let row5 = [];
    let row6 = [];
    let row7 = [];
    let row8 = [];
    for (let floors in areaItems) {
      if (floors == "1F") {
        row.push({
          text: `${floors} Area`,
          style: "tableHeader",
          alignment: "center",
          margin: [0, 10],
          rowSpan: 3,
        });
      } else if (floors == "2F") {
        row3.push({
          text: `${floors} Area`,
          style: "tableHeader",
          alignment: "center",
          margin: [0, 10],
          rowSpan: 3,
        });
      } else if (floors == "3F") {
        row6.push({
          text: `${floors} Area`,
          style: "tableHeader",
          alignment: "center",
          margin: [0, 10],
          rowSpan: 3,
        });
      }
      if (floors !== "PH") {
        for (let pitches in areaItems[floors]) {
          if (floors == "1F") {
            if (pitches == "p1") {
              row.push({
                text: pitches,
                style: "tableHeader",
                alignment: "center",
              });
            } else if (pitches == "p2") {
              row1.push({});
              row1.push({
                text: pitches,
                style: "tableHeader",
                alignment: "center",
              });
            } else if (pitches == "p3") {
              row2.push({});
              row2.push({
                text: pitches,
                style: "tableHeader",
                alignment: "center",
              });
            }
          } else if (floors == "2F") {
            if (pitches == "p1") {
              row3.push({
                text: pitches,
                style: "tableHeader",
                alignment: "center",
              });
            } else if (pitches == "p2") {
              row4.push({});
              row4.push({
                text: pitches,
                style: "tableHeader",
                alignment: "center",
              });
            } else if (pitches == "p3") {
              row5.push({});
              row5.push({
                text: pitches,
                style: "tableHeader",
                alignment: "center",
              });
            }
          } else if (floors == "3F") {
            if (pitches == "p1") {
              row6.push({
                text: pitches,
                style: "tableHeader",
                alignment: "center",
              });
            } else if (pitches == "p2") {
              row7.push({});
              row7.push({
                text: pitches,
                style: "tableHeader",
                alignment: "center",
              });
            } else if (pitches == "p3") {
              row8.push({});
              row8.push({
                text: pitches,
                style: "tableHeader",
                alignment: "center",
              });
            }
          }
          for (let value in areaItems[floors][pitches]) {
            if (floors == "1F") {
              if (pitches == "p1") {
                row.push({
                  text: areaItems[floors][pitches].round(),
                  style: "tableHeader",
                  alignment: "center",
                });
                row.push({
                  text: areaItems.sum1F,
                  style: "tableHeader",
                  alignment: "center",
                  rowSpan: 3,
                  margin: [0, 10],
                });
              } else if (pitches == "p2") {
                row1.push({
                  text: areaItems[floors][pitches].round(),
                  style: "tableHeader",
                  alignment: "center",
                });
                row1.push({});
              } else if (pitches == "p3") {
                row2.push({
                  text: areaItems[floors][pitches].round(),
                  style: "tableHeader",
                  alignment: "center",
                });
                row2.push({});
              }
            } else if (floors == "2F") {
              if (pitches == "p1") {
                row3.push({
                  text: areaItems[floors][pitches].round(),
                  style: "tableHeader",
                  alignment: "center",
                });
                row3.push({
                  text: areaItems.sum2F,
                  style: "tableHeader",
                  alignment: "center",
                  rowSpan: 3,
                  margin: [0, 10],
                });
              } else if (pitches == "p2") {
                row4.push({
                  text: areaItems[floors][pitches].round(),
                  style: "tableHeader",
                  alignment: "center",
                });
                row4.push({});
              } else if (pitches == "p3") {
                row5.push({
                  text: areaItems[floors][pitches].round(),
                  style: "tableHeader",
                  alignment: "center",
                });
                row5.push({});
              }
            } else if (floors == "3F") {
              if (pitches == "p1") {
                row6.push({
                  text: areaItems[floors][pitches].round(),
                  style: "tableHeader",
                  alignment: "center",
                });
                row6.push({
                  text: areaItems.sum3F,
                  style: "tableHeader",
                  alignment: "center",
                  rowSpan: 3,
                  margin: [0, 10],
                });
              } else if (pitches == "p2") {
                row7.push({
                  text: areaItems[floors][pitches].round(),
                  style: "tableHeader",
                  alignment: "center",
                });
                row7.push({});
              } else if (pitches == "p3") {
                row8.push({
                  text: areaItems[floors][pitches].round(),
                  style: "tableHeader",
                  alignment: "center",
                });
                row8.push({});
              }
            }
          }
        }
      }
    }
    this.content[1].columns[1].stack[4].table.body.push(row);
    this.content[1].columns[1].stack[4].table.body.push(row1);
    this.content[1].columns[1].stack[4].table.body.push(row2);
    this.content[1].columns[1].stack[4].table.body.push(row3);
    this.content[1].columns[1].stack[4].table.body.push(row4);
    this.content[1].columns[1].stack[4].table.body.push(row5);
    this.content[1].columns[1].stack[4].table.body.push(row6);
    this.content[1].columns[1].stack[4].table.body.push(row7);
    this.content[1].columns[1].stack[4].table.body.push(row8);
  }
}
