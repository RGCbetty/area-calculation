<template>
    <div class="text-xs-center">
        <v-row no-gutters dense>
            <v-col cols="auto">
                <v-text-field
                    class="mb-5"
                    hide-details
                    autocomplete="off"
                    v-model="controlNumber"
                    label="Control Number"
                    return-masked-value
                    mask="#######-####"
                    outlined
                    color="success"
                    @keyup.enter="getRevNum()"
                />
            </v-col>

            <v-col cols="auto" class="ml-2">
                <v-overflow-btn
                    class="mt-1 pt-0"
                    style="width: 200px;"
                    v-model="revNum"
                    :items="revItems"
                    :label="revLabel"
                    editable
                    autocomplete="off"
                    item-value="text"
                    color="success"
                    @change="getData()"
                />
            </v-col>

            <v-col cols="auto" class="mt-4 ml-5">
                <v-btn
                    hide-details
                    dark
                    small
                    color="blue-grey"
                    @click.stop="isModalVisible = true"
                    v-if="visibility"
                >
                    <v-icon dense medium left>mdi-cog</v-icon>
                    Specs
                </v-btn>
            </v-col>

            <v-spacer></v-spacer>

            <v-col cols="auto" class="mt-4 mr-2">
                <v-btn
                    v-if="visibility"
                    hide-details
                    small
                    color="success"
                    @click="saveToDB()"
                >
                    <v-icon medium left>mdi-content-save-all</v-icon>
                    Save
                </v-btn>
            </v-col>

            <v-col cols="auto" class="mt-4 mr-2">
                <v-btn
                    v-if="visibility"
                    hide-details
                    small
                    dark
                    color="#FF0000"
                    @click="saveToPDF()"
                >
                    <v-icon medium left>mdi-file-pdf</v-icon>
                    <span>&nbsp;PDF&nbsp;</span>
                </v-btn>
            </v-col>
            <v-col cols="auto" class="mt-4">
                <v-btn
                    :class="{
                        subheading: $vuetify.breakpoint.smAndDown,
                        'text-caption': $vuetify.breakpoint.mdAndUp
                    }"
                    hide-details
                    v-if="visibility"
                    small
                    color="primary"
                    @click="exportData()"
                >
                    <v-icon medium left>mdi-export-variant</v-icon>EXPORT
                </v-btn>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row align="center" justify="center" v-if="visibility">
            <specification
                :roofmaterial="selectedYane"
                :kanabakari="kanabakari"
                :houseType="houseType"
                :fireproof="fireproof"
            />
            <plan-data :items="areaData.items" />
            <!-- <roof-area /> -->
            <LoadScreen :loadState="loading" />
        </v-row>

        <config-dialog v-model="isModalVisible">
            <template #header>
                <v-card-title class="headline">Settings</v-card-title>
            </template>
            <template #body>
                <v-card-text>
                    <specification
                        :paddingSettings="'px-0'"
                        :roofmaterial="selectedYane"
                        :kanabakari="kanabakari"
                        :houseType="houseType"
                        :fireproof="fireproof"
                    >
                        <template #roof>
                            <v-col cols="2">
                                <v-select
                                    class="py-1 pt-3"
                                    color="success"
                                    label="Roof Material"
                                    v-model="selectedYane"
                                    dense
                                    hide-details
                                    :items="yaneTypes"
                                    outlined
                                ></v-select>
                            </v-col>
                        </template>
                    </specification>
                    <v-row no-gutters>
                        <!-- <v-col cols="2" class="pa-0">
              <v-select
                color="success"
                label="Roof Material"
                v-model="selectedYane"
                dense
                hide-details
                :items="yaneTypes"
                outlined
              ></v-select>
            </v-col> -->
                        <v-spacer></v-spacer>

                        <v-col cols="3">
                            <v-select
                                color="success"
                                v-model="houseType"
                                label="THICKNESS"
                                dense
                                hide-details
                                :items="thicknessTypes"
                                outlined
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="6" class="pr-2">
                            <pitch-table
                                title="Main Roof"
                                @update="toUpdate"
                                :isEditable="true"
                                :rows="areaData.standard.mr"
                            ></pitch-table>
                        </v-col>
                        <v-col cols="6" class="pl-2">
                            <pitch-table
                                title="Solar Panel"
                                @update="toUpdate"
                                :isEditable="true"
                                :rows="areaData.standard.sp"
                            ></pitch-table>
                        </v-col>
                    </v-row>
                </v-card-text>
            </template>
            <template #footer>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <!-- <v-btn color="error" text @click="cancelSettings()">Cancel</v-btn> -->

                    <v-btn color="success" text @click="saveSettings()"
                        >Save</v-btn
                    >
                </v-card-actions>
            </template>
        </config-dialog>
    </div>
</template>

<script>
import { myMixin } from "./PitchTable/mixins";
import DTXClient from "../../assets/dtx-client/dtx-client";
// import store from '../../store'
import roundTo from "../../plugins/roundto";
import CSVClient from "../../assets/csv-client";
import SolarTableXLS from "../../assets/class/xls/solartable";
import SekisanCSV from "../../assets/class/csv/sekisan";
import AreaCalculationCSV from "../../assets/class/csv/areacalculation";
import DBClient from "../../assets/class/db";
import AreaData from "../../assets/class/areadata";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import cloneDeep from "lodash.clonedeep";
import SiyoDataBroker from "../../assets/class/db/siyodatabroker";
import HrdInformationService from "../../assets/class/db/hrdinformationservice";

// import RoofAreaVue from './RoofArea.vue';
// import DTXClient from '../../assets/dtx-client';
// import FileSaver from 'file-saver'

export default {
    mixins: [roundTo, myMixin],
    data: () => ({
        temp: new AreaData(),
        csv: new CSVClient(),
        sekisancsv: new SekisanCSV(),
        solartable: new SolarTableXLS(),
        db: new DBClient(),
        siyoBroker: new SiyoDataBroker(),
        hrdInfo: new HrdInformationService(),
        areaCalcData: new AreaCalculationCSV(),
        kanabakari: "",
        houseType: "",
        fireproof: "",
        controlNumber: "",
        revNum: "",
        revLabel: "Revision Num",
        exportInfo: [],
        items: [],
        revItems: [],
        filename: "1120327-2019-4-2",
        loading: false,
        isModalVisible: false,
        visibility: false,
        selectedYane: "",
        yaneTypes: ["Colorbest", "Garubarium", "Parapet"],
        thicknessTypes: [
            `なし`,
            "あり",
            "夢の家Ⅲ",
            "Ⅲ",
            "夢の家Ⅳ",
            "Ⅳ",
            "i-cube",
            "ismart",
            "i-smart",
            "i-cube【i-ｼﾘｰｽﾞⅡ】",
            "i-smart【i-ｼﾘｰｽﾞⅡ】",
            "i-smile",
            "i-palette",
            "i-smile(2×6)",
            "未定"
        ],
        gwTypes: ["GT", "SD", "GS"],
        toUpdateMR: {},
        toUpdateSP: {}
    }),

    components: {
        Specification: () => import("./Specification"),
        PlanData: () => import("./PlanData"),
        LoadScreen: () => import("../Utilities/loading"),
        ConfigDialog: () => import("../Utilities/ConfigDialog"),
        PitchTable: () => import("./PitchTable/index")
    },
    mounted() {},
    computed: {},
    methods: {
        toUpdate(...args) {
            const [obj, title] = args;
            if (title == "Main Roof") {
                this.toUpdateMR = obj;
            } else if (title == "Solar Panel") {
                this.toUpdateSP = obj;
            }
        },
        saveSettings() {
            const isEmpty = obj => {
                for (var x in obj) {
                    return false;
                }
                return true;
            };
            this.isModalVisible = false;
            if (!isEmpty(this.toUpdateMR)) {
                this.areaData.standard.mr = this.toUpdateMR;
            }
            if (!isEmpty(this.toUpdateSP)) {
                this.areaData.standard.sp = this.toUpdateSP;
            }

            const merge = (mr, sp) => {
                // let toMerge = JSON.parse(JSON.stringify(this.areaData.standard.mr));
                let toMerge = cloneDeep(this.areaData.standard.mr);
                for (let floors in mr) {
                    if (floors == `PH`) continue;
                    for (let i = 1; i <= floors.length + 1; i++) {
                        // if(mr[floors][`p${i}`].value !== ""){
                        if (mr[floors][`p${i}`].value) {
                            if (sp[floors][`p${i}`].value) {
                                if (i < 3) {
                                    if (mr[floors][`p${i + 1}`].value) {
                                        if (i == 1) {
                                            if (
                                                !mr[floors][`p${i + 2}`].value
                                            ) {
                                                toMerge[floors][
                                                    `p${i + 2}`
                                                ].value =
                                                    sp[floors][`p${i}`].value;
                                            }
                                        }
                                    } else {
                                        toMerge[floors][`p${i + 1}`].value =
                                            sp[floors][`p${i}`].value;
                                    }
                                }
                            } else {
                                // if(i == 1) continue;
                                // toMerge[floors][`p${i+1}`].value = sp[floors][`p${i-1}`].value
                            }
                        } else {
                            if (sp[floors][`p${i}`].value) {
                                toMerge[floors][`p${i}`].value =
                                    sp[floors][`p${i}`].value;
                            }
                        }
                        // if(this.areaData.standard.allpitch[floors][`p${i}`].value){
                        //   if(mr[floors][`p${i}`].value){
                        //     this.areaData.standard.allpitch[floors][`p${i}`].value = mr[floors][`p${i}`].value
                        //   }
                        // } else {
                        //   this.areaData.standard.allpitch[floors][`p${i}`].value = mr[floors][`p${i}`].value
                        // }

                        // this.areaData.standard.allpitch[floors][`p${i}`].value = mr[floors][`p${i}`].value
                        // }
                    }
                }

                // for(let floors in sp){
                //   if(floors == `PH`) continue;
                //     for(let i = 1; i <= floors.length + 1; i ++){
                //       // if(sp[floors][`p${i}`].value !== ""){
                //         if(this.areaData.standard.allpitch[floors][`p${i}`].value){

                //           if(sp[floors][`p${i}`].value){
                //               this.areaData.standard.allpitch[floors][`p${i}`].value = sp[floors][`p${i}`].value
                //           }
                //         } else {
                //           this.areaData.standard.allpitch[floors][`p${i}`].value = sp[floors][`p${i}`].value
                //         }
                //       // }
                //     }
                // }
                this.areaData.standard.allpitch = toMerge;
                return this.areaData.standard.allpitch;
            };
            merge(this.areaData.standard.mr, this.areaData.standard.sp);
            // console.log(this.areaData.standard.allpitch)
            // console.log(this.areaData.standard.mr)
        },
        cancelSettings() {
            this.isModalVisible = false;
            setTimeout(() => {
                this.toUpdateMR = {};
                this.toUpdateSP = {};
                // this.$refs.form.resetValidation()
                // this.editedIndex = -1
            }, 300);
        },
        forExport() {
            this.areaCalcData.asEmpty();
            let filtered = this.areaData.items
                .filter(item => {
                    return item.value > 0 && item.id_csv !== undefined;
                })
                .map(item => {
                    return {
                        id: item.id_csv,
                        value: item.value
                    };
                });
            this.areaCalcData.addData(filtered);
            // this.areaCalcData.addData(this.controlNumber, '全 体', 70460, 80010, 'バルコニ面積',  this.dtx.balcony.items.reduce((total, item) => total + item.areaInMeterSquared, 0), '㎡');
            // this.exportInfo = [];
            // this.addDataToExport('全 体', 70460, 80010, 'バルコニ面積',  this.dtx.balcony.items.reduce((total, item) => total + item.areaInMeterSquared, 0), '㎡')
            // this.addDataToExport('全 体', 70500, 80210, '1階外周部長さ', this.csv.values[7][2], 'ｍ')
            // this.addDataToExport('全 体', 70810, 1190, '建築 面積', this.csv.values[2][2], '㎡')
            // this.addDataToExport('全 体', 70815, 1195, '施工面積', this.dtx.yane.items.reduce((total, item) => total + item.areaInMeterSquared, 0), '㎡')
            // this.addDataToExport('全 体', 70816, 1196, '延床 面積/図面', this.csv.values[1][2], '㎡')
            // this.addDataToExport('全 体', 70820, 1200, '延床 面積', this.csv.values[1][2], '㎡')
            // this.addDataToExport('全 体', 70830, 1210, '1F 床面積', this.csv.values[2][2], '㎡')
            // this.addDataToExport('全 体', 11111, 1220, '2F 床面積', this.csv.values[3][2], '㎡')
            // this.addDataToExport('全 体',990174, 6500, 'ｵﾘｼﾞﾅﾙ太陽光出力', this.xls.values[0], 'kW')
            // this.exportInfo.push({'お客様コード': this.controlNumber,'共通仕様名': 'バルコニ面積','共通仕様名': this.dtx.balcony.items.reduce((total, item) => total + item.areaInMeterSquared, 0)})
            // this.exportInfo.push({'お客様コード': this.controlNumber,'共通仕様名': 'パラペット面積','共通仕様名': this.dtx.computed.balconies.reduce((total, item) => total + item.handrailLength, 0)})
            // this.exportInfo.push({'お客様コード': this.controlNumber,'共通仕様名': '1階外周部長さ','共通仕様名': 0})
            // this.exportInfo.push({'お客様コード': this.controlNumber,'共通仕様名': '施工面積','共通仕様名': this.dtx.yane.items.reduce((total, item) => total + item.areaInMeterSquared, 0)})
            // this.exportInfo.push({'お客様コード': this.controlNumber,'共通仕様名': '1階外周部長さ', '共通仕様名': this.csv.values[7][2]})
        },
        saveToPDF() {
            pdfMake.fonts = {
                yourFontName: {
                    normal: "MS-Gothic.tff",
                    bold: "MS-Gothic.tff",
                    italics: "MS-Gothic.tff",
                    bolditalics: "MS-Gothic.tff"
                }
            };
            pdfMake.tableLayouts = {
                exampleLayout: {
                    hLineWidth: function(i, node) {
                        return i === 0 || i === node.table.body.length ? 1 : 1;
                    },
                    vLineWidth: function(i, node) {
                        return i === 0 || i === node.table.widths.length
                            ? 1
                            : 1;
                    },
                    hLineColor: function(i, node) {
                        return i === 0 || i === node.table.body.length
                            ? "black"
                            : "gray";
                    },
                    vLineColor: function(i, node) {
                        return i === 0 || i === node.table.widths.length
                            ? "black"
                            : "gray";
                    },
                    paddingLeft: function() {
                        return 0;
                    },
                    paddingRight: function() {
                        return 0;
                    },
                    paddingTop: function() {
                        return 0;
                    },
                    paddingBottom: function() {
                        return 0;
                    }
                }
            };
            this.areaData.dd.buildContent(this.areaData);
            console.log(this.areaData.dd, ";69699696969696969869");
            this.areaData.heintsvr
                .save({
                    dir: `//heintsvr/☆shared/2020 PRE-ESTIMATION/${this.dtx.planInfo.memo1}-${this.dtx.planInfo.memo2}`,
                    pdfJSON: this.areaData.dd
                })
                .then(res => {
                    if (res.status == 201) {
                        this.swal.fire({
                            icon: "success",
                            title: "PDF has been saved to heintsvr!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
            pdfMake
                .createPdf(this.areaData.dd, {
                    tableLayouts: pdfMake.tableLayouts.exampleLayout
                })
                .open();
        },
        saveToDB() {
            // delete this.areaData.dd;
            // delete this.areaData.heintsvr;
            // delete this.areaData.bankin

            this.swal
                .fire({
                    title: "Do you want to save to database?",
                    showCancelButton: true,
                    confirmButtonText: `Save`
                })
                .then(result => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        let computed = Object.assign({}, this.areaData);
                        delete computed.dd;
                        delete computed.heintsvr;
                        this.db.saveToDB(computed).then(() => {
                            this.swal.fire("Saved!", "", "success");
                        });
                    } else if (result.isDenied) {
                        this.swal.fire("Changes are not saved", "", "info");
                    }
                });
        },

        getRevNum() {
            this.loading = true;
            this.revLabel = "Revision Num";
            this.revItems = [];
            this.revNum = "";
            this.siyoBroker.getzumenCode(this.controlNumber).then(res => {
                let zumenItems = res.data.map(obj => {
                    return obj.zumenCode;
                });

                zumenItems.forEach(zumenItem => {
                    this.revItems.push(zumenItem);
                });

                if (zumenItems.length > 0) this.revLabel = "Select Revision";
                this.loading = false;
            });
        },

        getData() {
            this.loading = true;
            this.visibility = true;
            this.$store.commit("setDTX", {
                dtx: new DTXClient(),
                area: new AreaData()
            });

            let controlNum = `${this.controlNumber}-${this.revNum}`;

            this.areaData.items = [];

            this.dtx.text.asExtract();
            this.dtx.yane.asExtract();
            this.dtx.tsumakabe.asExtract();
            this.dtx.balcony.asExtract();
            this.dtx.roofgarden.asExtract();
            this.dtx.tategu.asExtract();
            this.dtx.wall.asExtract();
            this.dtx.saveExtract();

            this.dtx.loadFromServer(controlNum).then(() => {
                this.areaData.standard.getPitchDetails(this.dtx.yane.items);
                this.hrdInfo
                    .getBasicSpecificationDetails(this.controlNumber)
                    .then(res => {
                        this.kanabakari = res.data.find(
                            ({ BasicSpecificationName }) =>
                                BasicSpecificationName === "矩計"
                        ).SpecificationDetailName;
                        this.areaData.standard.convertKanabakari(
                            this.kanabakari
                        );

                        this.houseType = res.data.find(
                            ({ BasicSpecificationName }) =>
                                BasicSpecificationName === "高気密・高断熱"
                        ).SpecificationDetailName;
                        this.fireproof = res.data.find(
                            ({ BasicSpecificationName }) =>
                                BasicSpecificationName === "防耐火仕様"
                        ).SpecificationDetailName;

                        this.areaData.standard.convertPlywoodThickness(
                            res.data.find(
                                ({ BasicSpecificationName }) =>
                                    BasicSpecificationName ===
                                    "構造用合板（壁）"
                            ).SpecificationDetailName
                        );

                        this.areaData.standard.convertFloorLevel(
                            res.data.find(
                                ({ BasicSpecificationName }) =>
                                    BasicSpecificationName === "建物階数"
                            ).SpecificationDetailName
                        );
                        this.areaData.nokiten.houseType = this.houseType;
                        this.areaData.nokiten.dehairiThickness = this.areaData.standard.plywoodThickness;

                        this.areaData.standard.fireproofType = this.fireproof;
                        this.areaData.gt.fireproofType = this.fireproof;
                        this.areaData.gt.getData(this.dtx, this.areaData);

                        this.areaData.items.push({
                            id: "990090",
                            id_csv: "00004160",
                            title: "外壁／タイル面積１階(1F Outer Wall Tile)",
                            value: this.areaData.gt.gtSummary.withoutBalcony1F,
                            remarks: "Manual",
                            unit: "㎡"
                        });

                        this.areaData.items.push({
                            id: "990100",
                            id_csv: "00004170",
                            title: "外壁／タイル面積２階(2F Outer Wall Tile)",
                            value: this.areaData.gt.gtSummary.withoutBalcony2F,
                            remarks: "Manual",
                            unit: "㎡"
                        });

                        this.areaData.items.push({
                            id: "100011",
                            id_csv: "01000011",
                            title: "外壁面積/ﾀｲﾙ/1F(1F Outer Wall Tile)",
                            value: this.areaData.gt.gtSummary.sum1F[0].data,
                            remarks: "Manual",
                            unit: "㎡"
                        });

                        this.areaData.items.push({
                            id: "100012",
                            id_csv: "01000012",
                            title: "外壁面積/ﾀｲﾙ/2F(2F Outer Wall Tile)",
                            value: this.areaData.gt.gtSummary.sum1F[0].data,
                            remarks: "Manual",
                            unit: "㎡"
                        });
                        // this.sekisancsv.getCommonArea(controlNum).then((res) => {
                        //   console.log(res)
                        //   res.data
                        //     .map((rec) => {
                        //       return {
                        //         id: rec[0],
                        //         id_csv: rec[4],
                        //         title: rec[1],
                        //         value: rec[2],
                        //         remarks: "Auto",
                        //         unit: rec[3],
                        //       };
                        //     })
                        //     .forEach((item) => {
                        //       this.areaData.items.push(item);
                        //     });

                        const changeTitle = (id, value) => {
                            this.areaData.items.find(item => {
                                if (item.id == id) {
                                    item.title = value;
                                }
                            });
                        };

                        this.hrdInfo
                            .cadPlanDetails(this.controlNumber, this.revNum)
                            .then(res => {
                                let result = res.data
                                    .filter(items => {
                                        if (items.Floor !== "PH") return items;
                                    })
                                    .map((items, index) => {
                                        const id = [
                                            "70830",
                                            "70840",
                                            "70850",
                                            "70810",
                                            "70815",
                                            "70820",
                                            "70820"
                                        ];
                                        const idCSV = [
                                            "00001210",
                                            "00001220",
                                            "00001230",
                                            "00001190",
                                            "00001195",
                                            "00001200",
                                            "00001200"
                                        ];
                                        let unit = /\(([^)]*)\)/.exec(
                                            items.Unit
                                        )[1];
                                        return {
                                            id: id[index],
                                            id_csv: idCSV[index],
                                            title: `${
                                                items.Floor ? items.Floor : ""
                                            } ${items.JName}/${
                                                items.Floor ? items.Floor : ""
                                            } ${items.Name}`,
                                            value: 2,
                                            remarks: "Auto",
                                            unit: unit
                                        };
                                    });
                                result.forEach((item, index) => {
                                    if (index == result.length - 1) {
                                        this.areaData.items.push(item);
                                        let newTitle = item.title.split("/");
                                        newTitle.splice(1, 0, "/図面");
                                        this.areaData.items.push({
                                            id: "70816",
                                            id_csv: item.id_csv,
                                            title: newTitle.join(""),
                                            value: item.value,
                                            remarks: "Auto",
                                            unit: item.unit
                                        });
                                    } else {
                                        this.areaData.items.push(item);
                                    }
                                });
                                // "00001190" "70810"
                                // "00001195" "70815"
                                // "00001200" "70816"
                                // "00001200" "70820"
                                // "00001210" "70830"
                                // "00001220" "70840"
                                // "00001230" "70850"
                            });
                        //MR
                        // Total Floor Area
                        // Total Floor Area
                        // 1F Floor Area
                        // 2F Floor Area
                        // 3F Floor Area
                        this.solartable.getKwValue(controlNum).then(res => {
                            if (res) {
                                this.areaData.solar.total = res;
                                this.areaData.items.push({
                                    id: "990174",
                                    id_csv: "00006500",
                                    title:
                                        "オリジナル太陽光総出力(Solar Panel KW)",
                                    value: this.areaData.solar.total,
                                    remarks: "Auto",
                                    unit: "㎡"
                                });
                            } else {
                                this.areaData.items.push({
                                    id: "990174",
                                    id_csv: "00006500",
                                    title:
                                        "オリジナル太陽光総出力(Solar Panel KW)",
                                    value: 0,
                                    remarks: "Auto",
                                    unit: "㎡"
                                });
                            }
                            this.loading = false;
                        });
                        changeTitle(
                            "70500",
                            `1階外周部長さ (1F Outside Perimeter)`
                        );
                        changeTitle("70810", `建築 面積 (Building Area)`);
                        changeTitle("70815", `施工面積(Construction Area)`);
                        changeTitle(
                            "70816",
                            `延床 面積/図面(Total Floor Area)`
                        );
                        //SP
                        changeTitle("70820", `延床 面積(Total Floor Area)`);
                        changeTitle("70830", `1F 床面積(1F Floor Area)`);
                        changeTitle("70840", `2F 床面積(2F Floor Area)`);
                        changeTitle("70850", `3F 床面積(3F Floor Area)`);
                        // });
                    });

                this.areaData.roof.hafu = this.dtx.yane.items.reduce(
                    (total, item) =>
                        total +
                        item.horizontalHafuLength +
                        item.kerabaHafuLength,
                    0
                );
                this.areaData.mizukiri.total = this.dtx.computed.dodaiMizukiri.totalPerimeter;

                this.areaData.balcony.area.total = this.dtx.balcony.items.reduce(
                    (total, item) => total + item.areaInMeterSquared,
                    0
                );

                this.areaData.balcony.handrail.total = this.dtx.computed.balconies.reduce(
                    (total, item) => total + item.handrailLength,
                    0
                );

                this.areaData.balcony.walllength.total = this.dtx.computed.balconies.reduce(
                    (total, item) => total + item.wallsurface,
                    0
                );

                // this.areaData.bankin.area.balcony = this.dtx.balcony.items.reduce(
                //   (total, item) => total + item.areaInMeterSquared,
                //   0
                // );

                // this.areaData.bankin.balcony.fw = this.dtx.computed.balconies.reduce(
                //   (total, item) => total + item.handrailLength,
                //   0
                // );
                // this.areaData.bankin.balcony.ow = this.dtx.computed.balconies.reduce(
                //   (total, item) => total + item.wallsurface,
                //   0
                // );

                //tempo

                this.areaData.bankin.extractData(this.dtx, this.areaData);
                this.areaData.bankin.youjonet.extractData(
                    this.dtx,
                    this.areaData
                );
                this.areaData.hafu.extractData(this.dtx, this.areaData);
                this.areaData.yane.extractData(this.dtx, this.areaData);
                this.areaData.sumimune.extractData(this.dtx, this.areaData);
                this.areaData.honmune.extractData(this.dtx, this.areaData);

                // this.areaData.bankin.area.computeAll()
                // this.areaData.yane.computeTotalRoof(this.areaData.yane.mainroof.area)

                this.areaData.items.push({
                    id: "70460",
                    id_csv: "00080010",
                    title: "バルコニー面積(Balcony Area) ",
                    value: this.areaData.balcony.area.total,
                    remarks: "Auto",
                    unit: "㎡"
                });

                this.areaData.items.push({
                    id: "70461",
                    id_csv: "00080011",
                    title: "パラペット面積(Parapet Area)",
                    value: 0,
                    remarks: "Manual",
                    unit: "㎡"
                });

                this.areaData.items.push({
                    id: "70462",
                    id_csv: "00080012",
                    title: "ルーフガーデン面積(Roof Garden Area) ",
                    value: 0,
                    remarks: "Manual",
                    unit: "㎡"
                });

                this.areaData.items.push({
                    id: "70470",
                    id_csv: "00080020",
                    title: "バルコニー外壁部に接する長さ(Balcony FW)",
                    value: this.areaData.balcony.walllength.total,
                    remarks: "Auto",
                    unit: "m"
                });

                this.areaData.items.push({
                    id: "70471",
                    id_csv: "00080021",
                    title: "パラペット外壁部に接する長さ(Parapet FW)",
                    value: 0,
                    remarks: "Manual",
                    unit: "m"
                });

                this.areaData.items.push({
                    id: "70472",
                    id_csv: "00080022",
                    title: "ルーフガーデン外壁部接する長さ(Roof Garden FW)",
                    value: 0,
                    remarks: "Manual",
                    unit: "m"
                });

                this.areaData.items.push({
                    id: "70480",
                    id_csv: "00080030",
                    title: "バルコニー立ち上げ長さ(Balcony OW)",
                    value: this.areaData.balcony.handrail.total,
                    remarks: "Auto",
                    unit: "m"
                });

                this.areaData.items.push({
                    id: "70481",
                    id_csv: "00080031",
                    title: "パラペット立ち上げ長さ(Parapet OW)",
                    value: 0,
                    remarks: "Manual",
                    unit: "m"
                });

                this.areaData.items.push({
                    id: "70482",
                    id_csv: "00080032",
                    title: "ルーフガーデン立ち上げ長さ(Roof Garden OW)",
                    value: 0,
                    remarks: "Manual",
                    unit: "m"
                });

                this.areaData.items.push({
                    id: "70500",
                    id_csv: "00080210",
                    title: "１階外周部長さ(1F Outside Perimeter)",
                    value: this.areaData.mizukiri.total,
                    remarks: "Auto",
                    unit: "m"
                });

                this.areaData.items.push({
                    id: "70620",
                    id_csv: "00080060",
                    title: "雨押さえ長さ(Amaosae Length)",
                    value: 0,
                    remarks: "Manual",
                    unit: "㎡"
                });

                this.areaData.items.push({
                    id: "70625",
                    id_csv: "00080065",
                    title: "下屋外壁接する長さ（雨押さえ除 (Amaosae Geya)",
                    value: 0,
                    remarks: "Manual",
                    unit: "㎡"
                });
                //Temporary
                // this.areaData.items.push({
                //   id: '70630',
                //   id_csv: '00080065',
                //   title: '下屋外壁接する長さ（雨押さえ除 (Amaosae Slant)',
                //   value: 0,
                //   remarks: 'Manual',
                //   unit: '㎡'
                // })

                this.areaData.items.push({
                    id: "70730",
                    id_csv: "00080180",
                    title: "養生ネットの面積(Youjonet)",
                    value: 0,
                    remarks: "Manual",
                    unit: "㎡"
                });

                this.areaData.items.push({
                    id: "90660",
                    id_csv: "00080110",
                    title: "本棟の長さ(Honmune)",
                    value: this.areaData.honmune.total,
                    remarks: "Auto",
                    unit: "㎡"
                });

                this.areaData.items.push({
                    id: "90670",
                    id_csv: "00080120",
                    title: "隅棟長さ(Sumimune)",
                    value: this.areaData.sumimune.total,
                    remarks: "Auto",
                    unit: "㎡"
                });

                this.areaData.items.push({
                    id: "100250",
                    id_csv: "00001111",
                    title: "破風+鼻隠し/総長さ (Hana & Hafu Length)",
                    value: this.areaData.hafu.allTotal,
                    remarks: "Auto",
                    unit: "㎡"
                });
                this.areaData.items.push({
                    id: "990201",
                    id_csv: "00008046",
                    title: "屋根/塔屋[ﾍﾟﾝﾄﾊｳｽ]屋根面積 (Penthouse Roof Area)",
                    value: this.areaData.nokiten.totalSummary,
                    remarks: "Manual",
                    unit: "㎡"
                });

                this.areaData.items.push({
                    id: "990214",
                    id_csv: "00008046",
                    title: "軒天／面積／サイディング部 (Roof Eaves Ceiling)",
                    value: this.areaData.nokiten.totalSummary,
                    remarks: "Manual",
                    unit: "㎡"
                });

                this.areaData.items.push({
                    id: "990150",
                    id_csv: "00005050",
                    title: "屋根①／面積１階(1F Roof Area)",
                    value: this.areaData.yane.mr.area.sum1F,
                    remarks: "Auto",
                    unit: "m"
                });

                this.areaData.items.push({
                    id: "990160",
                    id_csv: "00005060",
                    title: "屋根①／面積２階(2F Roof Area)",
                    value: this.areaData.yane.mr.area.sum2F,
                    remarks: "Auto",
                    unit: "m"
                });

                this.areaData.items.push({
                    id: "990170",
                    id_csv: "00005070",
                    title: "屋根①／面積３階(3F Roof Area)",
                    value: this.areaData.yane.mr.area.sum3F,
                    remarks: "Auto",
                    unit: "m"
                });

                this.areaData.items.push({
                    id: "990171",
                    id_csv: "00005071",
                    title:
                        "屋根/フラットルーフ面積　合計(Total Flat Roof Area)",
                    value: this.areaData.yane.total.flatRoof,
                    remarks: "Auto",
                    unit: "m"
                });

                this.areaData.items.push({
                    id: "990172",
                    id_csv: "00005072",
                    title: "屋根/勾配屋根面積　合計(Total Slope Roof Area)",
                    value: 2,
                    remarks: "Auto",
                    unit: "m"
                });

                this.areaData.items.push({
                    id: "990175",
                    id_csv: "00005400",
                    title: "屋根①／ｵﾘｼﾞﾅﾙ太陽光ﾊﾟﾈﾙ1階(1F Solar Panel Area)",
                    value: this.areaData.yane.sp.area.sum1F,
                    remarks: "Auto",
                    unit: "m"
                });

                this.areaData.items.push({
                    id: "990176",
                    id_csv: "00005410",
                    title: "屋根①／ｵﾘｼﾞﾅﾙ太陽光ﾊﾟﾈﾙ2階(2F Solar Panel Area) ",
                    value: this.areaData.yane.sp.area.sum2F,
                    remarks: "Auto",
                    unit: "m"
                });
                this.areaData.items.push({
                    id: "990177",
                    id_csv: "00005420",
                    title: "屋根①／ｵﾘｼﾞﾅﾙ太陽光ﾊﾟﾈﾙ3階(3F Solar Panel Area) ",
                    value: this.areaData.yane.sp.area.sum3F,
                    remarks: "Auto",
                    unit: "m"
                });
                this.areaData.items.push({
                    id: "990178",
                    id_csv: "00005430",
                    title:
                        "屋根①／ｵﾘｼﾞﾅﾙ太陽光ﾊﾟﾈﾙ合計(Total Solar Panel Area) ",
                    value: this.areaData.yane.sp.area.total,
                    remarks: "Auto",
                    unit: "m"
                });

                this.areaData.nokiten.extractData(this.dtx, this.areaData);
                this.areaData.nokitenD.extractData(this.dtx, this.areaData);

                // this.areaData.bankin.balcony.insertProperties()
                // this.areaData.bankin.parapet.insertProperties()
                // this.areaData.bankin.roofgarden.insertProperties()
                // this.areaData.bankin.area.addItems()
                if (this.dtx.message) {
                    alert(
                        `${this.dtx.message}. Please check in shiyousho.hrd-s.com`
                    );
                }
                // console.log(this.areaData.yane.solarpanel)
                // console.log(this.areaData.items)
            });
        },

        addDataToExport(category, mainID, subID, name, value, unit) {
            this.exportInfo.push({
                お客様コード: this.controlNumber,
                仕様区分: category,
                表示順: mainID,
                共通仕様コード: subID,
                共通仕様名: name,
                採用数値: value,
                単位: unit
            });
        },

        exportData() {
            if (this.dtx.computed.dodaiMizukiri.totalPerimeter) {
                let dataExport = {
                    filename: `//haikansvr/Hedsvr/documents2/共通数値入力CSV/${this.dtx.planInfo.memo1}-${this.dtx.planInfo.memo2}.csv`
                };
                this.forExport();

                this.areaCalcData.exportTo(dataExport.filename).then(res => {
                    if (res.status == 200) {
                        // AreaCalculationCSV.download(
                        //   dataExport.filename,
                        //   dataExport.foldername
                        // );
                        if (res.status == 200) {
                            this.swal.fire({
                                icon: "success",
                                title: "CSV exported to haikansvr!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    }
                });
            } else {
                alert("Please enter control number!");
            }
        },

        sum(total, num) {
            return total + num.handrailLength;
        }
    }
};
</script>
