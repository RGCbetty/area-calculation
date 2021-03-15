import deepClone from "lodash.clonedeep";
import moment from "moment";

export default class Coverpage {
    constructor() {
        this.content = [];
    }
    Coverpage(areaData, contentList, pos) {
        this.content = contentList;
        // this.content.push({
        //   width: 100,
        //   height: 50,
        //   margin: -10
        // })
        this.content.push({
            // columns: [
            // {
            stack: [
                {
                    width: "70%",
                    style: "tableExample",
                    color: "#444",
                    table: {
                        widths: ["auto", "*", "auto", "auto"],
                        // headerRows: 2,

                        // keepWithHeaderRows: 1,
                        body: [
                            [
                                {
                                    image:
                                        "data:image/png;base64,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",
                                    rowSpan: 3,
                                    width: 100,
                                    height: 50,
                                    alignment: "center"
                                },
                                {
                                    text: [
                                        {
                                            text: "HACCHU Answer Sheet\n",
                                            style: "tableHeader"
                                        },
                                        {
                                            text: "PRE-ESTIMATION / PRE-DATA",
                                            style: "tableHeader"
                                        }
                                    ],
                                    rowSpan: 3,
                                    margin: [0, 10, 0, 0],
                                    alignment: "center"
                                },

                                {
                                    text: "DATE",
                                    colSpan: 2,
                                    style: "thead",
                                    alignment: "center"
                                },
                                {}
                            ],
                            [
                                {},

                                {},

                                {
                                    text: "Est._Date",
                                    style: "tableHeader",
                                    alignment: "center"
                                },
                                {
                                    text: "Batch_Rcvd.",
                                    style: "tableHeader",
                                    alignment: "center"
                                }
                            ],
                            [
                                {},

                                {},

                                {
                                    text: `${moment().format("YYYY/MM/DD")}`,
                                    style: "tableHeader",
                                    alignment: "center"
                                },
                                {
                                    text: `${moment().format("YYYY/MM/DD")}`,
                                    style: "tableHeader",
                                    alignment: "center"
                                }
                            ]
                        ]
                    }
                }
            ]
        });
        this.content[0].stack.push({
            width: "70%",
            style: "tableExample",
            color: "#444",
            margin: [0, -15, 0, 0],
            table: {
                widths: ["*", "*", "*", "*", "*", "*"],
                // headerRows: 2,

                // keepWithHeaderRows: 1,
                body: [
                    [
                        {
                            text: "Plan Code",
                            style: "tableHeader",
                            alignment: "center"
                        },

                        {
                            text: "Kanabakari",
                            style: "tableHeader",
                            alignment: "center"
                        },

                        {
                            text: "Data User",
                            style: "tableHeader",
                            alignment: "center"
                        },

                        {
                            text: "House Type",
                            style: "tableHeader",
                            alignment: "center"
                        },

                        {
                            text: "Estimator",
                            style: "tableHeader",
                            alignment: "center"
                        },

                        {
                            text: "Date checked",
                            style: "tableHeader",
                            alignment: "center"
                        }
                    ],
                    [
                        {
                            text: `${areaData.planInfo.plan_code}`,
                            style: "tbody1",
                            alignment: "center"
                        },

                        {
                            text: `${areaData.planInfo.kanabakari}`,
                            style: "tbody1",
                            alignment: "center"
                        },

                        {
                            text: `${areaData.planInfo.data_user}`,
                            style: "tbody1",
                            alignment: "center"
                        },

                        {
                            text: `${areaData.planInfo.houseType}`,
                            style: "tbody1",
                            alignment: "center"
                        },

                        {
                            text: `${areaData.planInfo.employee_name}`,
                            style: "tbody1",
                            alignment: "center"
                        },

                        {
                            text: `${areaData.planInfo.date}`,
                            style: "tbody1",
                            alignment: "center"
                        }
                    ],
                    [
                        {
                            text: "Plan No.",
                            style: "tableHeader",
                            alignment: "center"
                        },

                        {
                            text: "Module No.",
                            style: "tableHeader",
                            alignment: "center"
                        },

                        {
                            text: "Tile Type",
                            style: "tableHeader",
                            alignment: "center"
                        },

                        {
                            text: "Fireproof Type",
                            style: "tableHeader",
                            alignment: "center"
                        },

                        {
                            text: "F-Checker",
                            style: "tableHeader",
                            alignment: "center"
                        },

                        {
                            text: "Roof Material",
                            style: "tableHeader",
                            alignment: "center"
                        }
                    ],
                    [
                        {
                            text: `${areaData.planInfo.plan_no}`,
                            style: "tbody1",
                            alignment: "center"
                        },

                        {
                            text: `.${areaData.planInfo.module_no}`,
                            style: "tbody1",
                            alignment: "center"
                        },

                        {
                            text: `${areaData.planInfo.fireproof}`,
                            style: "tbody1",
                            alignment: "center"
                        },

                        {
                            text: `${areaData.planInfo.employee_name}`,
                            style: "tbody1",
                            alignment: "center"
                        },

                        {
                            text: `${areaData.planInfo.employee_name}`,
                            style: "tbody1",
                            alignment: "center"
                        },

                        {
                            text: `${areaData.planInfo.roof_material}`,
                            style: "tbody1",
                            alignment: "center"
                        }
                    ]
                ]
            }
        });

        this.content[0].stack.push({
            width: "70%",
            style: "tableExample",
            color: "#444",
            margin: [0, 0, 0, 0],
            table: {
                widths: ["*", "*", "*", "*", "*", "*"],
                // headerRows: 2,

                // keepWithHeaderRows: 1,
                body: [
                    [
                        {
                            text: "ID",
                            style: "tableHeader",
                            alignment: "center"
                        },
                        {
                            text: "ID CSV",
                            style: "tableHeader",
                            alignment: "center"
                        },

                        {
                            text: "Title",
                            style: "tableHeader",
                            alignment: "center"
                        },

                        {
                            text: "Value",
                            style: "tableHeader",
                            alignment: "center"
                        },

                        {
                            text: "Remarks",
                            style: "tableHeader",
                            alignment: "center"
                        },

                        {
                            text: "Unit",
                            style: "tableHeader",
                            alignment: "center"
                        }
                    ]
                ]
            }
        });
        let items = deepClone(areaData.items);
        for (let i = 0; i < items.length; i++) {
            let trow = [];
            for (let key in items[i]) {
                if (key == "title") {
                    if (items[i][key].match(/\((.*)\)/))
                        items[i][key] = items[i][key].match(/\((.*)\)/).pop();
                }
                if (key == "value") {
                    items[i][key] = Number(
                        Math.round(items[i][key] + "e" + 3) + "e-" + 3
                    );
                }

                if (items[i][key]) {
                    trow.push({
                        text: items[i][key],
                        alignment: "center",
                        style: "tbody1",
                        margin: [0, 1]
                    });
                }
            }
            this.content[0].stack[2].table.body.push(trow);
        }
    }
}
