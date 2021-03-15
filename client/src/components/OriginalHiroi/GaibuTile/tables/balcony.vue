<template>
    <v-card flat width="900">
        <v-card-title class="display-1 font-weight-thin">
            Balcony
            <v-spacer></v-spacer>
        </v-card-title>
        <v-simple-table dense show-select>
            <template v-slot:default>
                <thead>
                    <tr v-for="(tr, tr_i) in balconyHeader" :key="tr_i">
                        <th
                            v-for="(th, th_i) in tr"
                            :key="th_i"
                            :rowspan="th.rowspan"
                            :colspan="th.colspan"
                            :width="th.width"
                            class="text-center"
                        >
                            {{ th.value }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item, index) in gt.balconyData">
                        <tr :key="index + 'a'">
                            <td rowspan="2" class="pa-0">
                                <input
                                    type="checkbox"
                                    @change="getDelete('balconyData')"
                                    v-model="item.forDelete"
                                />
                            </td>
                            <!-- <td rowspan="2" class="pa-0"><v-checkbox color="green" style="margin-right: -8px" @change="getDelete('balconyData')" v-model="item.forDelete"></v-checkbox></td> -->
                            <td rowspan="2" class="pa-0">
                                <v-select
                                    height="83"
                                    hide-details
                                    dense
                                    :items="balconyFloors"
                                    @input="getTile(item)"
                                    outlined
                                    v-model="item.floorLevel"
                                ></v-select>
                            </td>
                            <td rowspan="2">
                                <input
                                    class="text-center"
                                    type="text"
                                    @input="getTile(item)"
                                    v-model="item.balconyName"
                                />
                            </td>
                            <td rowspan="2" class="pa-0">
                                <v-select
                                    height="83"
                                    dense
                                    hide-details
                                    :items="balconyTypeChoices"
                                    outlined
                                    v-model="item.type"
                                    @input="getTile(item)"
                                ></v-select>
                            </td>
                            <td rowspan="2" class="pa-0">
                                <v-select
                                    height="83"
                                    dense
                                    hide-details
                                    :items="balconyMaterialChoices"
                                    outlined
                                    v-model="item.wallUnderBalcony1"
                                ></v-select>
                            </td>
                            <td rowspan="2" class="pa-0">
                                <v-select
                                    height="83"
                                    dense
                                    hide-details
                                    :items="balconyMaterialChoices"
                                    outlined
                                    v-model="item.wallUnderBalcony2"
                                ></v-select>
                            </td>
                            <td>
                                <label>Outside</label>
                            </td>
                            <td class="pa-0">
                                <v-select
                                    dense
                                    hide-details
                                    @input="getTile(item)"
                                    :items="balconyMaterialChoices"
                                    outlined
                                    v-model="item.outsideMaterial"
                                ></v-select>
                            </td>
                            <td>
                                <input
                                    class="text-center"
                                    type="text"
                                    @input="compute(item, index)"
                                    v-model="item.outsideGrid"
                                />
                            </td>
                            <td>
                                <input
                                    class="text-center"
                                    type="text"
                                    @input="compute(item, index)"
                                    v-model="item.outsideMeter"
                                />
                            </td>
                            <td>
                                <input
                                    class="text-center"
                                    type="text"
                                    @dblclick="
                                        editHeight(item, index, 'outside')
                                    "
                                    v-model="item.outsideHeight"
                                    readonly
                                />
                            </td>
                            <td>
                                <input
                                    class="text-center font-weight-bold"
                                    type="text"
                                    v-model="item.outsideArea"
                                    readonly
                                />
                            </td>
                            <!-- <td rowspan="2" class="pa-0"> <v-select height="83" dense hide-details :items="balconyJobschedTypes" outlined v-model="item.jobsched"></v-select> </td> -->
                        </tr>
                        <tr :key="index + 'b'">
                            <td>
                                <label>Inside</label>
                            </td>
                            <td class="pa-0">
                                <v-select
                                    dense
                                    hide-details
                                    @input="getTile(item)"
                                    :items="balconyMaterialChoices"
                                    outlined
                                    v-model="item.insideMaterial"
                                ></v-select>
                            </td>
                            <td>
                                <input
                                    class="text-center"
                                    type="text"
                                    @input="compute(item, index)"
                                    v-model="item.insideGrid"
                                />
                            </td>
                            <td>
                                <input
                                    class="text-center"
                                    type="text"
                                    @input="compute(item, index)"
                                    v-model="item.insideMeter"
                                />
                            </td>
                            <td>
                                <input
                                    class="text-center"
                                    type="text"
                                    @dblclick="
                                        editHeight(item, index, 'inside')
                                    "
                                    v-model="item.insideHeight"
                                    readonly
                                />
                            </td>
                            <td>
                                <input
                                    class="text-center font-weight-bold"
                                    type="text"
                                    v-model="item.insideArea"
                                    readonly
                                />
                            </td>
                        </tr>
                    </template>
                </tbody>
            </template>
        </v-simple-table>

        <v-row justify="center" v-if="gt.balconyData.length == 0">
            <h3 class="font-weight-thin">No Balcony Data!</h3>
        </v-row>

        <v-row no-gutters class="mt-1">
            <v-btn @click="addBalcony()" small>Add Balcony</v-btn>
            <v-btn
                @click="lessBalcony()"
                v-if="selected.length > 0"
                small
                class="ml-2"
                >Remove Balcony</v-btn
            >
        </v-row>

        <heightDialog
            :bool="value"
            :height="dialogHeight"
            :value="changeHeight"
            :index="editIndex"
            :part="editHeightPart"
            @recompute-balcony="recalculateBal"
            @closeDialog="closeDialog"
        ></heightDialog>
    </v-card>
</template>

<script>
import Balcony from "@/assets/class/areadata/bpu/balcony";
import { heightDialog } from "@/components/OriginalHiroi/GaibuTile/dialogs/dialogs";
import { BpuMix } from "@/components/OriginalHiroi/GaibuTile/mixins/bpu";
import { BalconyWall } from "@/assets/BPU/Tables";
export default {
    props: {
        index: Number,
        selectedRow: Object,
        value: Boolean,
        standard: Object,
        gt: Object
    },
    components: { heightDialog },
    mixins: [BpuMix, BalconyWall],
    data() {
        return {
            dialogHeight: false,
            changeHeight: 0,
            editHeightPart: "",
            balconyTypeChoices: ["JY", "KI", "KS", "K"],
            balconyHeader: [
                [
                    { value: "", rowspan: "2", width: "2" },
                    { value: "Floor Level", rowspan: "2", width: "75" },
                    { value: "Balcony Name", rowspan: "2", width: "250" },
                    { value: "Type", rowspan: "2", width: "90" },
                    { value: "Under Balcony", colspan: "2" },
                    { value: "Part", rowspan: "2", width: "50" },
                    { value: "Material", rowspan: "2", width: "80" },
                    { value: "Length", colspan: "2" },
                    { value: "Height", rowspan: "2", width: "100" },
                    { value: "Area", rowspan: "2", width: "100" }
                    // {value: 'Jobsched', rowspan: '2', width: '200'}
                ],
                [
                    { value: "壁 1", width: "100" },
                    { value: "壁 2", width: "100" },
                    { value: "Grid", width: "50" },
                    { value: "Meter", width: "100" }
                ]
            ]
        };
    },

    computed: {
        balconyFloors() {
            if (this.gt.houseLevel == "3F") {
                return ["2階", "3階", "PH"];
            } else if (this.gt.houseLevel == "2F") {
                return ["2階", "PH"];
            } else if (this.gt.houseLevel == "1F") {
                return ["1階"];
            } else {
                return ["2階", "3階", "PH"];
            }
        }
    },

    methods: {
        addBalcony() {
            let newItem = new Balcony();
            this.gt.balconyData.push(newItem);
        },

        lessBalcony() {
            let arr = [];
            for (let i = 0; i < this.selected.length; i++) {
                let index = this.gt.balconyData.indexOf(this.selected[i]);
                arr.push(index);
            }

            this.gt.checkRemove(arr);
            this.itemDelete("balconyData");
        },

        editHeight(item, index, text) {
            this.editIndex = index;
            this.changeHeight =
                text == "inside" ? item.insideHeight : item.outsideHeight;
            this.editHeightPart =
                text == "inside" ? "insideHeight" : "outsideHeight";
            this.dialogHeight = this.dialogHeight == false ? true : false;
        },

        getTile(item) {
            this.gt.balconyTile(item);
            this.gt.reloadBBdata(item);
            this.$emit("compute");

            // this.gt.passTotal(this.areaData.items);
        },

        recalculateBal(i) {
            this.compute(this.gt.balconyData[i]);
        },

        compute(item, index) {
            this.gt.computeBalcony(item);
            this.gt.balconyData.splice(index, 1, item);
            // this.gt.passTotal(this.areaData.items);
            this.$emit("compute");
            // if(this.selectedRow.id == '100011'){
            // this.areaData.items[this.index].value = this.gt.gtSummary.sum1F[0].data
            // this.areaData.items[this.index].remarks = 'Manually changed'
            // } else {
            // this.areaData.items[this.index].value = this.gt.gtSummary.sum2F[0].data
            // this.areaData.items[this.index].remarks = 'Manually changed'
            // }
        }
    }
};
</script>

<style scoped>
* {
    text-transform: none !important;
}

.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: #68b96b;
}

input[type="checkbox"] {
    width: 20px;
    height: 20px;
    background-color: #fff;
    border: 1px solid green;
    color: green;
    cursor: pointer;
    margin-top: 30px;
    font-size: 16px;
}

input[type="checkbox"]:after {
    background-color: #fff;
    display: inline-block;
    color: green;
    width: 20px;
    height: 20px;
    visibility: visible;
    border: 1px solid green;
    padding-left: 3px;
    border-radius: 3px;
}

input[type="checkbox"]:checked:after {
    content: "\2714";
}

th,
td {
    border: 1px solid gray;
    border-collapse: collapse;
}
table {
    border: solid 1px #e8e4c9;
    border-collapse: collapse;
    border-spacing: 0;
    font: normal 13px Arial, sans-serif;
}

thead th {
    background-color: #4caf50;
    border: solid 1px;
    border-color: #424242;
    color: white !important;
    padding: 10px;
    text-align: left;
}

tbody td {
    border: solid 1px gray;
    color: #333;
    padding: 10px;
    text-shadow: 1px 1px 1px #fff;
}
table td {
    position: relative;
}

table td input {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    border: none;
    padding: 10px;
    box-sizing: border-box;
}
td select {
    width: 100%;
}
</style>