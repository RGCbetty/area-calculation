export default class BPU {
  constructor() {}
  BPU(areaData, contentList, pos) {
    this.content = contentList;
    this.GaibuTableBPU(areaData.gt.balconyData, pos);
    this.GaibuDeductionBPU(areaData.gt.deductionData, pos);
    this.GaibuSummaryBPU(areaData.gt.summary, pos);
    this.GaibuPorchDataBPU(areaData.gt.porchData, pos);

    this.GaibuGaihekiBalcony(areaData.gt.bbData, pos + 1);
    this.GaibuGaihekiSashData(areaData.gt.sashData, pos + 1);
    this.GaibuGaihekiEaves(areaData.gt.belowEavesData, pos + 1);
    this.GaibuGaihekiHangingWall(areaData.gt.hangingWallData, pos + 1);
    this.GaibuGaihekiRoofDeduction(areaData.gt.roofDeductionData, pos + 1);
    this.GaibuGaihekiAdditional(areaData.gt.GTadditionalData, pos + 1);
    this.GaibuGaihekiDeduction(areaData.gt.GTdeductionData, pos + 1);
    this.GaibuGaihekiSummary(areaData.gt.gtSummary, pos + 1);
    this.GaibuGaihekiSummary1(areaData.gt.gtSummary, pos + 1);
  }
  GaibuGaihekiSummary1(gaihekiItems, pos) {
    this.content[pos].stack.push({
      width: "70%",
      style: "tableExample",
      color: "#444",
      margin: [0, -8],
      table: {
        widths: [50, 50],
        body: [
          [
            { text: "Floor Level", style: "tbody", alignment: "center" },
            { text: "Area", style: "tbody", alignment: "center" },
          ],
        ],
      },
    });
    this.buildGaibuGaihekiSummary1(gaihekiItems, pos);
  }
  buildGaibuGaihekiSummary1(gaihekiItems, pos) {
    for (let x in gaihekiItems) {
      if (
        x != "withoutBalcony1F" &&
        x != "withoutBalcony2F" &&
        x != "sum3F" &&
        x != "sum1F" &&
        x != "sum2F" &&
        x != "sumTotal"
      ) {
        for (let row of gaihekiItems[x]) {
          let trow = [];
          for (let key in row) {
            let obj = {
              text: row[key].toString != "" ? row[key].toString() : " ",
              style: "tbody",
              alignment: "center",
            };
            trow.push(obj);
          }
          this.content[pos].stack[6].table.body.push(trow);
        }
      }
    }
  }
  GaibuGaihekiSummary(gaihekiItems, pos) {
    this.content[pos].stack.push({
      width: "70%",
      style: "tableExample",
      color: "#444",
      table: {
        widths: [50, 50],
        body: [
          [
            {
              text: "Wall Summary",
              border: [0, 0, 0, 0],
              style: "tableHeader",
              colSpan: 2,
            },
            {},
          ],
          [
            { text: "Floor Level", style: "tbody", alignment: "center" },
            { text: "Area", style: "tbody", alignment: "center" },
          ],
        ],
      },
    });
    this.buildGaibuGaihekiSummary(gaihekiItems, pos);
  }

  buildGaibuGaihekiSummary(gaihekiItems, pos) {
    for (let x in gaihekiItems) {
      if (
        x != "sumGar" &&
        x != "sumFuj" &&
        x != "withoutBalcony1F" &&
        x != "withoutBalcony2F" &&
        x != "sum3F"
      ) {
        for (let row of gaihekiItems[x]) {
          let trow = [];
          for (let key in row) {
            let obj = {
              text: row[key].toString != "" ? row[key].toString() : " ",
              style: "tbody",
              alignment: "center",
            };
            trow.push(obj);
          }
          this.content[pos].stack[5].table.body.push(trow);
        }
      }
    }
  }
  GaibuGaihekiDeduction(gaihekiItems, pos) {
    this.content[pos].stack[4].columns.push({
      width: "70%",
      style: "tableExample",
      color: "#444",
      margin: [-445, 5],
      table: {
        widths: [60, 45, 45],
        body: [
          [
            {
              text: "Deduction",
              style: "tableHeader",
              border: [0, 0, 0, 0],
              colSpan: 3,
            },
            {},
            {},
          ],
          [
            { text: "Description", alignment: "center", style: "tbody" },
            { text: "Area", alignment: "center", style: "tbody" },
            { text: "Floor", alignment: "center", style: "tbody" },
          ],
        ],
      },
    });
    this.buildGaibuGaihekiDeductionDataTable(gaihekiItems, pos);
  }
  buildGaibuGaihekiDeductionDataTable(gaihekiItems, pos) {
    let data = [];
    for (let a = 0; a < gaihekiItems.length; a++) {
      let arr = gaihekiItems[a];
      data.push({
        floor: arr.floor,
        quantity: arr.quantity,
        area: arr.area,
      });
    }
    if (data.length == 0) {
      this.content[pos].stack[4].columns[2].table.body.push([
        {
          text: "No Wall Additional Data!",
          alignment: "center",
          style: "tbody",
          colSpan: 3,
        },
        {},
        {},
      ]);
    } else {
      for (let row of data) {
        let trow = [];
        for (let key in row) {
          let obj = {
            text: row[key].toString() != "" ? row[key].toString() : " ",
            alignment: "center",
            style: "tbody",
          };
          trow.push(obj);
        }
        this.content[pos].stack[4].columns[2].table.body.push(trow);
      }
    }
  }
  GaibuGaihekiAdditional(gaihekiItems, pos) {
    this.content[pos].stack[4].columns.push({
      width: "70%",
      style: "tableExample",
      color: "#444",
      margin: [-230, 5],
      table: {
        widths: [60, 45, 45],
        body: [
          [
            {
              text: "Addtional",
              style: "tableHeader",
              border: [0, 0, 0, 0],
              colSpan: 3,
            },
            {},
            {},
          ],
          [
            { text: "Description", alignment: "center", style: "tbody" },
            { text: "Area", alignment: "center", style: "tbody" },
            { text: "Floor", alignment: "center", style: "tbody" },
          ],
        ],
      },
    });
    this.buildGaibuGaihekiAdditionalDataTable(gaihekiItems, pos);
  }
  buildGaibuGaihekiAdditionalDataTable(gaihekiItems, pos) {
    let data = [];
    for (let a = 0; a < gaihekiItems.length; a++) {
      let arr = gaihekiItems[a];
      data.push({
        floor: arr.floor,
        quantity: arr.quantity,
        area: arr.area,
      });
    }
    if (data.length == 0) {
      this.content[pos].stack[4].columns[1].table.body.push([
        {
          text: "No Wall Additional Data!",
          alignment: "center",
          style: "tbody",
          colSpan: 3,
        },
        {},
        {},
      ]);
    } else {
      for (let row of data) {
        let trow = [];
        for (let key in row) {
          let obj = {
            text: row[key].toString() != "" ? row[key].toString() : " ",
            alignment: "center",
            style: "tbody",
          };
          trow.push(obj);
        }
        this.content[pos].stack[4].columns[1].table.body.push(trow);
      }
    }
  }
  GaibuGaihekiRoofDeduction(gaihekiItems, pos) {
    this.content[pos].stack.push({
      columns: [
        {
          width: "70%",
          style: "tableExample",
          color: "#444",
          table: {
            widths: [45, 45, 45],
            body: [
              [
                {
                  text: "Roof Deduct",
                  style: "tableHeader",
                  colSpan: 3,
                  border: [0, 0, 0, 0],
                },
                {},
                {},
              ],
              [
                { text: "Floor", style: "tbody", alignment: "center" },
                { text: "Quantity", style: "tbody", alignment: "center" },
                { text: "Area", style: "tbody", alignment: "center" },
              ],
            ],
          },
        },
      ],
    });
    this.buildGaibuGaihekiRoofDeductionDataTable(gaihekiItems, pos);
  }
  buildGaibuGaihekiRoofDeductionDataTable(gaihekiItems, pos) {
    let data = [];
    for (let a = 0; a < gaihekiItems.length; a++) {
      let arr = gaihekiItems[a];
      data.push({
        floor: arr.floor,
        quantity: arr.quantity,
        area: arr.area,
      });
    }
    if (data.length == 0) {
      this.content[pos].stack[4].columns[0].table.body.push([
        {
          text: "No Roof Deduction Data!",
          alignment: "center",
          style: "tbody",
          colSpan: 3,
        },
        {},
        {},
      ]);
    } else {
      for (let row of data) {
        let trow = [];
        for (let key in row) {
          let obj = {
            text: row[key].toString() != "" ? row[key].toString() : " ",
            alignment: "center",
            style: "tbody",
          };
          trow.push(obj);
        }
        this.content[pos].stack[4].columns[0].table.body.push(trow);
      }
    }
  }
  GaibuGaihekiHangingWall(gaihekiItems, pos) {
    this.content[pos].stack.push({
      width: "70%",
      style: "tableExample",
      color: "#444",
      table: {
        widths: [40, 40, 40, 65, 50, 50, 50, 50, 65],
        body: [
          [
            {
              text: "Hanging Wall",
              style: "tableHeader",
              border: [0, 0, 0, 0],
              colSpan: 9,
            },
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
            { text: "HWALL", style: "tbody", alignment: "center" },
            { text: "Type", style: "tbody", alignment: "center" },
            { text: "Part", style: "tbody", alignment: "center" },
            { text: "Outside", style: "tbody", alignment: "center" },
            {
              text: "Opening",
              style: "tbody",
              alignment: "center",
              colSpan: 2,
            },
            {},
            { text: "タレ壁", style: "tbody", alignment: "center", colSpan: 2 },
            {},
            { text: "Inside", style: "tbody", alignment: "center" },
          ],
        ],
      },
    });
    this.buildGaibuGaihekiHangingWallDatTable(gaihekiItems, pos);
  }
  buildGaibuGaihekiHangingWallDatTable(gaihekiItems, pos) {
    let data = [];
    for (let a = 0; a < gaihekiItems.length; a++) {
      let arr = gaihekiItems[a];
      data.push({
        hwall: arr.hwall,
        part: ["Grid", "Area"],
        type: [arr.locationLine, arr.locationType],
        outside: [arr.outsideGrid, arr.outsideArea],
        openingGridArea: [arr.openingGrid, "key:" + arr.openingArea],
        openingDeduct: arr.openingDeduct,
        tarekabeGridArea: [arr.tarekabeGrid, "key:" + arr.tarekabeArea],
        tarekabeDeduct: arr.tarekabeDeduct,
        inside: [arr.insideGrid, arr.insideArea],
      });
    }
    if (data.length == 0) {
      this.content[pos].stack[3].table.body.push([
        {
          text: "No Hanging Wall Data!",
          style: "tbody",
          alignment: "center",
          colSpan: 9,
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ]);
    } else {
      for (let a = 0; a < data.length; a++) {
        let arr = data[a];
        let dataArr = [];
        for (let b = 0; b < 2; b++) {
          let val = [
            {
              hwall: arr.hwall,
              type: arr.type[b],
              part: arr.part[b],
              outside: arr.outside[b],
              openingGridArea: arr.openingGridArea[b],
              openingDeduct: arr.openingDeduct,
              tarekabeGridArea: arr.tarekabeGridArea[b],
              tarekabeDeduct: arr.tarekabeDeduct,
              inside: arr.inside[b],
            },
          ];
          dataArr.push(val);
        }
        for (let arr of dataArr) {
          for (let row of arr) {
            let trow = [];
            for (let key in row) {
              let obj = {
                text:
                  row[key].toString().split("key:").length != 1
                    ? row[key]
                        .toString()
                        .split("key:")[1]
                        .toString()
                    : row[key].toString() != ""
                    ? row[key].toString()
                    : " ",
                style: "tbody",
                alignment: "center",
                colSpan: row[key].toString().split("key:").length != 1 ? 2 : 1,
                rowSpan: key == "hwall" ? 2 : 1,
                margin: key == "hwall" ? [0, 8, 0, 0] : "",
              };
              trow.push(obj);
            }
            this.content[pos].stack[3].table.body.push(trow);
          }
        }
      }
    }
  }
  GaibuGaihekiEaves(gaihekiItems, pos) {
    this.content[pos].stack.push({
      width: "70%",
      style: "tableExample",
      color: "#444",
      table: {
        widths: [45, 50, 50, 50, 50, 50, 50, 50, 50],
        body: [
          [
            {
              text: "Below Eaves",
              style: "tableHeader",
              border: [0, 0, 0, 0],
              colSpan: 9,
            },
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
            { text: "FL", style: "tbody", alignment: "center" },
            { text: "S", style: "tbody", alignment: "center" },
            { text: "E", style: "tbody", alignment: "center" },
            { text: "N", style: "tbody", alignment: "center" },
            { text: "W", style: "tbody", alignment: "center" },
            { text: "All", style: "tbody", alignment: "center" },
            { text: "Irr", style: "tbody", alignment: "center" },
            { text: "H", style: "tbody", alignment: "center" },
            { text: "Area", style: "tbody", alignment: "center" },
          ],
        ],
      },
    });
    this.buildGaibuGaihekiEavesDataTable(gaihekiItems, pos);
  }
  buildGaibuGaihekiEavesDataTable(gaihekiItems, pos) {
    for (let row of gaihekiItems) {
      let trow = [];
      for (let key in row) {
        let obj = {
          text: row[key].toString() != "" ? row[key].toString() : " ",
          alignment: "center",
          style: "tbody",
        };
        trow.push(obj);
      }
      this.content[pos].stack[2].table.body.push(trow);
    }
  }
  GaibuGaihekiSashData(gaihekiItems, pos) {
    this.content[pos].stack[1].columns.push({
      width: "70%",
      style: "tableExample",
      color: "#444",
      margin: [-37, 5],
      table: {
        widths: [45, 45, 45],
        body: [
          [
            {
              text: "Sash",
              style: "tableHeader",
              colSpan: 3,
              border: [0, 0, 0, 0],
            },
            {},
            {},
          ],
          [
            { text: "Floor", style: "tbody", alignment: "center" },
            { text: "Quantity", style: "tbody", alignment: "center" },
            { text: "Area", style: "tbody", alignment: "center" },
          ],
        ],
      },
    });
    this.buildGaibuGaihekiSashDataTable(gaihekiItems, pos);
  }
  buildGaibuGaihekiSashDataTable(gaihekiItems, pos) {
    let data = [];
    for (let a = 0; a < gaihekiItems.length; a++) {
      let arr = gaihekiItems[a];
      data.push({
        floor: arr.floor,
        quantity: arr.quantity,
        area: arr.area,
      });
    }
    if (data.length == 0) {
      this.content[pos].stack[1].columns[1].table.body.push([
        {
          text: "No Sash Data!",
          alignment: "center",
          style: "tbody",
          colSpan: 3,
        },
        {},
        {},
      ]);
    } else {
      for (let row of data) {
        let trow = [];
        for (let key in row) {
          let obj = {
            text: row[key].toString() != "" ? row[key].toString() : " ",
            alignment: "center",
            style: "tbody",
          };
          trow.push(obj);
        }
        this.content[pos].stack[1].columns[1].table.body.push(trow);
      }
    }
  }
  GaibuGaihekiBalcony(gaihekiItems, pos) {
    this.content.push({
      pageBreak: "before",
      columnGap: 5,
      stack: [
        { text: "Gaibu Tile (Gaiheki Tile Wall)", style: "subheader" },
        {
          columnGap: 5,
          columns: [
            {
              width: "70%",
              style: "tableExample",
              color: "#444",
              table: {
                widths: [100, 35, 30, 30, 45, 45],
                body: [
                  [
                    {
                      text: "Below Balcony",
                      colSpan: 6,
                      border: [0, 0, 0, 0],
                      style: "tableHeader",
                    },
                    {},
                    {},
                    {},
                    {},
                    {},
                  ],
                  [
                    {
                      text: "Balcony",
                      alignment: "center",
                      style: "tbody1",
                      rowSpan: 2,
                      margin: [0, 8, 0, 0],
                    },
                    {
                      text: "Floor",
                      alignment: "center",
                      style: "tbody1",
                      rowSpan: 2,
                      margin: [0, 8, 0, 0],
                    },
                    {
                      text: "Width",
                      alignment: "center",
                      style: "tbody1",
                      colSpan: 2,
                    },
                    {},
                    {
                      text: "Height",
                      alignment: "center",
                      style: "tbody1",
                      rowSpan: 2,
                      margin: [0, 8, 0, 0],
                    },
                    {
                      text: "Area",
                      alignment: "center",
                      style: "tbody1",
                      rowSpan: 2,
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
                  ],
                ],
              },
            },
          ],
        },
      ],
    });
    this.buildGaihekiTileBalcony(gaihekiItems, pos);
  }
  buildGaihekiTileBalcony(gaihekiItems, pos) {
    for (let row of gaihekiItems) {
      let trow = [];
      for (let key in row) {
        let obj = {
          text: row[key].toString() != "" ? row[key].toString() : " ",
          alignment: "center",
          style: "tbody",
        };
        trow.push(obj);
      }
      this.content[pos].stack[1].columns[0].table.body.push(trow);
    }
  }
  GaibuTableBPU(gaibuItems, pos) {
    this.content.push({
      columnGap: 5,
      pageBreak: "before",
      stack: [
        { text: "Gaibu Tile(Balcony Porch Unit)", style: "subheader" },
        {
          width: "70%",
          style: "tableExample",
          color: "#444",
          table: {
            widths: [40, 80, 40, 40, 40, 50, 40, 30, 30, 30, 45],
            body: [
              [
                {
                  text: "Balcony",
                  style: "tableHeader",
                  border: [0, 0, 0, 0],
                  colSpan: 11,
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
                {},
              ],
              [
                {
                  text: "Floor Level",
                  style: "tbody",
                  alignment: "center",
                  rowSpan: 2,
                  margin: [0, 5, 0, 0],
                },
                {
                  text: "Balcony Name",
                  style: "tbody",
                  alignment: "center",
                  rowSpan: 2,
                  margin: [0, 8, 0, 0],
                },
                {
                  text: "Type",
                  style: "tbody",
                  alignment: "center",
                  rowSpan: 2,
                  margin: [0, 8, 0, 0],
                },
                {
                  text: "Under Balcony",
                  style: "tbody",
                  alignment: "center",
                  colSpan: 2,
                },
                {},
                {
                  text: "Part",
                  style: "tbody",
                  alignment: "center",
                  rowSpan: 2,
                  margin: [0, 8, 0, 0],
                },
                {
                  text: "Material",
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
                {
                  text: "Height",
                  style: "tbody",
                  alignment: "center",
                  rowSpan: 2,
                  margin: [0, 8, 0, 0],
                },
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
                {},
                {},
                {
                  text: "階 1",
                  style: "tbody",
                  alignment: "center",
                  margin: [0, 3, 0, 0],
                },
                {
                  text: "階 2",
                  style: "tbody",
                  alignment: "center",
                  margin: [0, 3, 0, 0],
                },
                {},
                {},
                { text: "Grid", style: "tbody", alignment: "center" },
                { text: "Meter", style: "tbody", alignment: "center" },
                {},
                {},
              ],
            ],
          },
        },
      ],
    });
    this.buildGTableBPU(gaibuItems, pos);
  }
  buildGTableBPU(gaibuItems, pos) {
    let data = [];
    for (let x = 0; x < gaibuItems.length; x++) {
      let arr = gaibuItems[x];
      data.push({
        floorLevel: arr.floorLevel,
        balconyName: arr.balconyName,
        type: arr.type,
        wallUnderBalcony1: arr.wallUnderBalcony1,
        wallUnderBalcony2: arr.wallUnderBalcony2,
        part: ["Outside", "Inside"],
        material: [arr.outsideMaterial, arr.insideMaterial],
        grid: [arr.outsideGrid, arr.insideGrid],
        meter: [arr.outsideMeter, arr.insideMeter],
        height: [arr.outsideHeight, arr.insideHeight],
        area: [arr.outsideArea, arr.insideArea],
      });
    }

    for (let a = 0; a < data.length; a++) {
      let arr = data[a];
      let dataArr = [];
      for (let b = 0; b < 2; b++) {
        let val = [
          {
            floorLevel: arr.floorLevel,
            balconyName: arr.balconyName,
            type: arr.type,
            wallUnderBalcony1: arr.wallUnderBalcony1,
            wallUnderBalcony2: arr.wallUnderBalcony2,
            part: arr.part[b],
            material: arr.material[b],
            grid: arr.grid[b],
            meter: arr.meter[b],
            height: arr.height[b],
            area: arr.area[b],
          },
        ];
        dataArr.push(val);
      }

      for (let arr of dataArr) {
        for (let row of arr) {
          let trow = [];
          for (let key in row) {
            let obj = {
              text: row[key].toString() != "" ? row[key].toString() : "",
              style: "tbody",
              alignment: "center",
              rowSpan:
                key == "floorLevel" ||
                key == "balconyName" ||
                key == "type" ||
                key == "wallUnderBalcony1" ||
                key == "wallUnderBalcony2"
                  ? 2
                  : 1,
              margin:
                key == "floorLevel" ||
                key == "balconyName" ||
                key == "type" ||
                key == "wallUnderBalcony1" ||
                key == "wallUnderBalcony2"
                  ? [0, 5, 0, 0]
                  : "",
            };
            trow.push(obj);
          }
          this.content[pos].stack[1].table.body.push(trow);
        }
      }
    }
  }
  GaibuDeductionBPU(gaibuDeduction, pos) {
    this.content[pos].stack.push({
      columns: [
        {
          stack: [
            { text: "Deduction", style: "tableHeader" },
            {
              width: "70%",
              style: "tableExample",
              color: "#444",
              table: {
                widths: [50, 50, 50, 120],
                body: [
                  [
                    { text: "Area", style: "tbody", alignment: "center" },
                    { text: "Material", style: "tbody", alignment: "center" },
                    { text: "Shape", style: "tbody", alignment: "center" },
                    { text: "FL", style: "tbody", alignment: "center" },
                  ],
                ],
              },
            },
          ],
        },
      ],
    });
    this.buildGaibuDeductionTableBPU(gaibuDeduction, pos);
  }
  buildGaibuDeductionTableBPU(gaibuDeduction, pos) {
    let data = [];
    gaibuDeduction.filter((arr) => {
      data.push({
        area: arr.area,
        material: arr.material,
        shape: arr.shape,
        fl: arr.fl,
      });
    });

    if (data.length == 0)
      this.content[pos].stack[2].columns[0].stack[1].table.body.push([
        {
          text: "No Balcony Deduction Data!",
          alignment: "center",
          colSpan: 4,
          style: "tbody",
        },
        {},
        {},
        {},
      ]);
    else {
      for (let row of data) {
        let trow = [];
        for (let key in row) {
          let obj = {
            text: row[key].toString() != "" ? row[key].toString() : " ",
            alignment: "center",
            style: "tbody",
          };
          trow.push(obj);
        }
        this.content[pos].stack[2].columns[0].stack[1].table.body.push(trow);
      }
    }
  }
  GaibuSummaryBPU(gaibuSummary, pos) {
    this.content[pos].stack[2].columns.push({
      stack: [
        { text: "Summary", style: "tableHeader" },
        {
          width: "70%",
          style: "tableExample",
          color: "#444",
          table: {
            widths: [115, 50, 60],
            body: [
              [
                {
                  text: "Common Specification",
                  style: "tbody",
                  alignment: "center",
                },
                { text: "Material", style: "tbody", alignment: "center" },
                { text: "Area", style: "tbody", alignment: "center" },
              ],
            ],
          },
        },
      ],
    });
    this.buildGaibuSummaryBPU(gaibuSummary, pos);
  }
  buildGaibuSummaryBPU(gaibuSummary, pos) {
    for (let a in gaibuSummary.porchSum) {
      let row = [];
      for (let key in gaibuSummary.porchSum[a]) {
        let obj = {
          text: gaibuSummary.porchSum[a][key].toString(),
          alignment: "center",
          style: "tbody",
        };
        row.push(obj);
      }
      this.content[pos].stack[2].columns[1].stack[1].table.body.push(row);
    }

    for (let b in gaibuSummary.balconyOutSum) {
      let row = [];
      for (let key in gaibuSummary.porchSum[b]) {
        let obj = {
          text: gaibuSummary.balconyOutSum[b][key].toString(),
          alignment: "center",
          style: "tbody",
        };
        row.push(obj);
      }
      this.content[pos].stack[2].columns[1].stack[1].table.body.push(row);
    }

    for (let c in gaibuSummary.balconyInSum) {
      let row = [];
      for (let key in gaibuSummary.balconyInSum[c]) {
        let obj = {
          text: gaibuSummary.balconyInSum[c][key].toString(),
          alignment: "center",
          style: "tbody",
        };
        row.push(obj);
      }
      this.content[pos].stack[2].columns[1].stack[1].table.body.push(row);
    }
  }
  GaibuPorchDataBPU(gaibuPorchData, pos) {
    this.content[pos].stack.push(
      { text: "Porch", style: "tbody" },
      {
        width: "70%",
        style: "tableExample",
        color: "#444",
        table: {
          widths: [115, 50, 50, 50, 90, 65, 80],
          body: [
            [
              { text: "Location", style: "tbody", alignment: "center" },
              { text: "Size", style: "tbody", alignment: "center" },
              { text: "Quantity", style: "tbody", alignment: "center" },
              { text: "Material", style: "tbody", alignment: "center" },
              { text: "JobSched", style: "tbody", alignment: "center" },
              { text: "Height", style: "tbody", alignment: "center" },
              { text: "Area", style: "tbody", alignment: "center" },
            ],
          ],
        },
      }
    );
    this.buidGaibuPorchData(gaibuPorchData, pos);
  }
  buidGaibuPorchData(gaibuPorchData, pos) {
    let data = [];
    gaibuPorchData.filter((arr) => {
      data.push({
        location: arr.location,
        size: arr.size,
        quantity: arr.quantity,
        material: arr.material,
        jobsched: arr.jobsched,
        height: arr.height,
        area: arr.area,
      });
    });

    if (data.length == 0)
      this.content[pos].stack[4].table.body.push([
        {
          text: "No Porch Data!!",
          alignment: "center",
          colSpan: 7,
          style: "tbody",
        },
        {},
        {},
        {},
        {},
        {},
        {},
      ]);
    else {
      for (let row of data) {
        let trow = [];
        for (let key in row) {
          let obj = {
            text: row[key].toString() != "" ? row[key].toString() : " ",
            alignment: "center",
            style: "tbody",
          };
          trow.push(obj);
        }
        this.content[pos].stack[4].table.body.push(trow);
      }
    }
  }
}
