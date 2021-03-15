<template>
    <v-container fluid class="pa-0">
        <v-card flat width="auto">
            <v-card-title>{{ postTitle }}</v-card-title>
            <v-simple-table dense>
                <template v-slot:default>
                    <thead>
                        <tr v-for="(tr, tr_i) in headers" :key="tr_i">
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
                            v-for="(item, index) in items"
                            :key="index"
                            style="
                                font-size: 10px;
                                line-height: 0px;
                                height: 1px;
                            "
                        >
                            <td style="width: 5px">
                                <input
                                    class="text-center"
                                    readonly
                                    type="text"
                                    v-model="item.l_no"
                                />
                                {{ item.num }}
                            </td>
                            <td style="width: 120px">
                                <input
                                    class="text-center"
                                    type="text"
                                    v-model="item.l_grid"
                                    @input="emitChanges(item, index)"
                                />
                            </td>
                            <td style="width: 120px">
                                <input
                                    class="text-center"
                                    type="text"
                                    v-model="item.l_eaves"
                                    @input="emitChanges(item, index)"
                                />
                            </td>
                            <td style="width: 120px">
                                <input
                                    class="text-center"
                                    type="text"
                                    v-model="item.l_eaves1"
                                    @input="emitChanges(item, index)"
                                />
                            </td>
                            <td style="width: 120px">
                                <input
                                    class="text-center"
                                    type="text"
                                    v-model="item.w_grid"
                                    @input="emitChanges(item, index)"
                                />
                            </td>
                            <td style="width: 120px">
                                <input
                                    class="text-center"
                                    type="text"
                                    v-model="item.w_eaves"
                                    @input="emitChanges(item, index)"
                                />
                            </td>
                            <td style="width: 120px">
                                <input
                                    class="text-center"
                                    type="text"
                                    v-model="item.w_eaves1"
                                    @input="emitChanges(item, index)"
                                />
                            </td>
                            <td class="pa-0" style="width: 220px">
                                <v-select
                                    v-model="item.description"
                                    style="width: 220px"
                                    single-line
                                    solo
                                    @input="emitChanges(item, index)"
                                    hide-details
                                    :items="list"
                                ></v-select>
                            </td>
                            <td class="text-center" style="width: 220px">
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
        <!-- <v-col class="pa-0 pt-3" cols="4">
            <pitch-table title="MR Table" :headers="mrHeaders" :rows="areaData.standard.MRrows"></pitch-table>
            <pitch-table title="SP Table" :headers="spHeaders" :rows="areaData.standard.SProws"></pitch-table>
            <underlay-check v-if="postTitle == 'Nokiten'"></underlay-check>
            <n-siding v-if="postTitle == 'Nokiten'"></n-siding>
            <n-siding-dehairy v-else></n-siding-dehairy>
            <summary-table v-if="postTitle == 'Nokiten'"></summary-table>
            <summary-table-dehairy v-else></summary-table-dehairy>
        </v-col>-->
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
    </v-container>
</template>
<script>
// import AreaData from '../../../../assets/class/areadata/'
// import {Description} from '../mixins/description'
export default {
    props: {
        value: Boolean,
        items: Array,
        index: Number,
        headers: Array,
        list: Array,
        selectedRow: Object,
        postTitle: String
    },

    components: {
        // 'NSiding' : () => import('./Nsiding'),
        // 'NSidingDehairy' : () => import('./NsidingD'),
        // 'UnderlayCheck' : () => import('./UnderlayerCheck'),
        // 'SummaryTable': () => import('./Summary'),
        // 'SummaryTableDehairy': () => import('./SummaryD'),
        //  PitchTable: () => import('../../PitchTable/index')
    },
    created() {},
    data: () => ({
        // temp : new AreaData,
    }),
    methods: {
        addRow() {
            this.areaData.nokiten.addItem();
            this.areaData.nokitenD.addItem();
        },
        emitChanges(item, index) {
            if (!this.value) {
                this.areaData.yane.getIDnumber(item, index);
                this.areaData.yane.computeRow(item, this.areaData.standard);
                this.areaData.yane.computeAll(item, this.areaData.standard);
            } else {
                this.areaDataDB.yane.getIDnumber(item, index);
                this.areaDataDB.yane.computeRow(item, this.areaDataDB.standard);
                this.areaDataDB.yane.computeAll(item, this.areaDataDB.standard);
            }

            // console.log(this.areaData.yane.standard.mr)

            // let sum = Object.keys(floor1).map(key => floor1[key].value).reduce((previous, current) => previous + current);
            // console.log(sum)
            // return Number(sum).toFixed

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
