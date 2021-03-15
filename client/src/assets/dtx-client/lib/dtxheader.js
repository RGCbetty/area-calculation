import DTXCalculation from "./dtxcalculation";
import axios from "axios";
import config from "../config";

export default class DTXHeader extends DTXCalculation {
    constructor(extractAll = false) {
        super(extractAll);
        this.server = process.env.VUE_APP_DOMAIN;
    }

    loadFromServer(controlAndRevNum) {
        this.options.controlNum = controlAndRevNum;
        return new Promise((resolve, reject) => {
            let formData = {
                options: this.options
            };

            axios
                .post(
                    `${this.server}${config.api.name}${config.api.dtx}/loadFromShiyoushoServer`,
                    formData
                )
                .then(res => {
                    // console.log(res.data)
                    Object.assign(this, res.data);

                    // this.tategu.naibu = res.data.tategu.naibu;
                    // this.tategu.gaibu = res.data.tategu.gaibu;
                    // this.tategu.genkan = res.data.tategu.genkan;

                    // this.yane.items = res.data.yane.items;

                    resolve(true);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    loadFromUploadFile(file) {
        return new Promise((resolve, reject) => {
            let formData = new FormData();
            formData.append("options", JSON.stringify(this.options));
            formData.append("file", file);

            axios
                .post(
                    `${this.server}${config.api.name}${config.api.dtx}/loadFromUploadFile`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                )
                .then(res => {
                    Object.assign(this, res.data);
                    // let self = this;

                    // self = {...this, ...res.data};

                    // Object.assign(this.planInfo, res.data.planInfo);
                    // Object.assign(this.houseStructure, res.data.houseStructure);
                    // Object.assign(this.planDetail, res.data.planDetail);
                    // Object.assign(this.coordinate, res.data.coordinate);
                    // Object.assign(this.gaisyuu, res.data.gaisyuu);
                    // Object.assign(this.orientation, res.data.orientation);
                    // Object.assign(this.nakaniwa, res.data.nakaniwa);
                    // Object.assign(this.heya, res.data.heya);
                    // Object.assign(this.shuunou, res.data.shuunou);
                    // Object.assign(this.parapetWall, res.data.parapetWall);
                    // Object.assign(this.wall, res.data.wall);
                    // Object.assign(this.porch, res.data.porch);
                    // Object.assign(this.line, res.data.line);
                    // Object.assign(this.circle, res.data.circle);
                    // Object.assign(this.doubleArrow, res.data.doubleArrow);
                    // Object.assign(this.text, res.data.text);
                    // Object.assign(this.atsumiRyouiki, res.data.atsumiRyouiki);
                    // Object.assign(this.menseki, res.data.menseki);
                    // Object.assign(this.wooddeck, res.data.wooddeck);
                    // Object.assign(this.keishamen, res.data.keishamen);
                    // Object.assign(this.void, res.data.void);
                    // Object.assign(this.tokonoma, res.data.tokonoma);
                    // Object.assign(this.tatami, res.data.tatami);
                    // Object.assign(this.bubunKabe, res.data.bubunKabe);
                    // Object.assign(this.balcony, res.data.balcony);
                    // Object.assign(this.twoD, res.data.twoD);
                    // Object.assign(this.tsumakabe, res.data.tsumakabe);
                    // Object.assign(this.yane, res.data.yane);
                    // Object.assign(this.bearingWall, res.data.bearingWall);
                    // Object.assign(this.tategu, res.data.tategu);

                    resolve(true);
                })

                .catch(err => {
                    reject(err);
                });
        });
    }

    downloadFile(filename) {
        return `${this.server}${config.api.name}${config.api.download}/${filename}`;
    }

    // downloadItem ({ url, label }) {
    //   axios.get(url, { responseType: 'blob' })
    //   .then(({ data }) => {
    //       const blob = new Blob([data], { type: 'text/plain' })
    //       const link = document.createElement('a')
    //       link.href = window.URL.createObjectURL(blob)
    //       link.download = label
    //       link.click()
    //     })
    //   .catch(error => console.error(error))
    // },
}
