<template>
    <v-container fluid class="pa-0">
        <v-row class="pa-0">
            <v-col class="pl-3" cols="8">
                <v-card flat width="auto">
                    <v-simple-table dense>
                        <template v-slot:default>
                            <thead>
                                <tr v-for="(tr, tr_i) in headerRow" :key="tr_i">
                                    <th
                                        v-for="(th, th_i) in tr"
                                        :key="th_i"
                                        :rowspan="th.rowspan"
                                        :colspan="th.colspan"
                                        class="text-center"
                                    >
                                        {{ th.value }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(item, index) in nokiten.items"
                                    :key="index"
                                    style="font-size: 10px;line-height: 0px;height:1px"
                                >
                                    <td style="width:5px">
                                        <input
                                            class="text-center"
                                            readonly
                                            type="text"
                                            v-model="item.l_no"
                                        />
                                        {{ item.num }}
                                    </td>
                                    <td>
                                        <input
                                            class="text-center"
                                            type="text"
                                            v-model="item.l_grid"
                                            @input="emitChanges(item, index)"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            class="text-center"
                                            type="text"
                                            v-model="item.l_eaves"
                                            @input="emitChanges(item, index)"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            class="text-center"
                                            type="text"
                                            v-model="item.l_eaves1"
                                            @input="emitChanges(item, index)"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            class="text-center"
                                            type="text"
                                            v-model="item.w_grid"
                                            @input="emitChanges(item, index)"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            class="text-center"
                                            type="text"
                                            v-model="item.w_eaves"
                                            @input="emitChanges(item, index)"
                                        />
                                    </td>
                                    <td class="pa-0" style="width:120px">
                                        <v-select
                                            v-model="item.description"
                                            style="width:180px"
                                            single-line
                                            solo
                                            @input="emitChanges(item, index)"
                                            hide-details
                                            :items="descriptionList"
                                        ></v-select>
                                    </td>
                                    <td class="text-center">
                                        <input
                                            class="text-center"
                                            readonly
                                            type="text"
                                            v-model="item.total"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card>
            </v-col>
            <v-col class="pa-0 pt-3" cols="4">
                <pitch-table
                    title="Main Roof"
                    :headers="mrHeaders"
                    :rows="standard.mr"
                ></pitch-table>
                <pitch-table
                    title="Solar Panel"
                    :headers="spHeaders"
                    :rows="standard.sp"
                ></pitch-table>
                <underlay-check
                    v-if="postTitle == 'Nokiten'"
                    :nokiten="nokiten"
                ></underlay-check>
                <n-siding
                    v-if="postTitle == 'Nokiten'"
                    :nokiten="nokiten"
                ></n-siding>
                <n-siding-dehairy v-else :nokiten="nokiten"></n-siding-dehairy>
                <summary-table
                    v-if="postTitle == 'Nokiten'"
                    :nokiten="nokiten"
                ></summary-table>
                <summary-table-dehairy
                    v-else
                    :nokiten="nokiten"
                ></summary-table-dehairy>
            </v-col>
            <v-btn
                v-if="postTitle == 'Nokiten'"
                @click="addRow()"
                class="ml-5"
                color="#4CAF50"
                fixed
                bottom
                left
                fab
                dark
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-row>
    </v-container>
</template>
<script>
import AreaData from "../../../../assets/class/areadata/";
import { myMixin } from "../../PitchTable/mixins/index";
import { Description } from "../mixins/description";
export default {
    mixins: [Description, myMixin],

    props: {
        postTitle: String,
        nokiten: Object,
        index: Number,
        standard: Object,
        value: Boolean
    },
    components: {
        NSiding: () => import("./NsidingTable"),
        NSidingDehairy: () => import("./NsidingTable"),
        UnderlayCheck: () => import("./UnderlayerCheck"),
        SummaryTable: () => import("./SummaryTable"),
        SummaryTableDehairy: () => import("./SummaryTable"),
        PitchTable: () => import("../../PitchTable/index")
    },
    created() {},
    data: () => ({
        temp: new AreaData()
    }),
    methods: {
        addRow() {
            this.areaData.nokiten.addItem();
            this.areaData.nokitenD.addItem();
        },
        emitChanges(item, index) {
            if (!this.value) {
                this.areaData.nokiten.getIDnumber(item, index);
                this.areaData.nokiten.computeRow(item, this.areaData.standard);
                this.areaData.nokiten.computeAll(item);
                this.areaData.nokitenD.getIDnumber(item, index);
                this.areaData.nokitenD.computeRow(item, this.areaData.standard);
                this.areaData.nokitenD.checkDehairi(
                    item,
                    index,
                    this.areaData.standard
                );
                this.areaData.nokitenD.computeAll(item);
            } else {
                this.areaDataDB.nokiten.getIDnumber(item, index);
                this.areaDataDB.nokiten.computeRow(
                    item,
                    this.areaDataDB.standard
                );
                this.areaDataDB.nokiten.computeAll(item);
                this.areaDataDB.nokitenD.getIDnumber(item, index);
                this.areaDataDB.nokitenD.computeRow(
                    item,
                    this.areaDataDB.standard
                );
                this.areaDataDB.nokitenD.checkDehairi(
                    item,
                    index,
                    this.areaDataDB.standard
                );
                this.areaDataDB.nokitenD.computeAll(item);
            }
            // this.areaData.items[this.index].value = this.areaData.nokiten.totalSummary
            // this.areaData.items[this.index].remarks = 'Manually changed'
        }
    }
};
</script>
<style scoped>
table {
    border: solid 1px #e8e4c9;
    border-collapse: collapse;
    border-spacing: 0;
    font: normal 13px Arial, sans-serif;
    table-layout: fixed;
    width: 100%;
}

thead th {
    background-color: #4caf50;
    border: solid 1px;
    border-color: #424242;
    color: white !important;
    padding: 10px;
    text-align: left;
    /* text-shadow: 1px 1px 1px #fff; */
}
tbody td {
    border: solid 1px gray;
    color: #333;
    text-shadow: 1px 1px 1px #fff;
    height: 1vh;
}
tbody th {
    border: solid 1px gray;
    background-color: #424242;
    color: white;
    /* text-shadow: 1px 1px 1px #fff; */
    height: 1vh;
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
</style>
