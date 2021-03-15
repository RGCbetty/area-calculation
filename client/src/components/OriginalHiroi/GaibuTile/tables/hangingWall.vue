<template>
    <v-card flat>
        <v-card-title class="display-1 font-weight-thin">
            <v-row no-gutters>
                <v-col cols="4">Hanging Wall</v-col>
                <v-col>
                    <v-select
                        dense
                        label="Quantity"
                        v-model="hwQuantity"
                        @change="updateHW()"
                        :items="quantityList"
                        outlined
                    ></v-select>
                </v-col>
                <v-col cols="6"></v-col>
            </v-row>
        </v-card-title>
        <v-simple-table dense style="margin-top: -25px">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th
                            v-for="(item, index) in hWallHead"
                            :key="index"
                            class="text-center"
                            :width="item.width"
                            :colspan="item.colspan"
                        >
                            {{ item.value }}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <template v-for="(item, index) in gt.hangingWallData">
                        <tr :key="index + 'a'">
                            <td rowspan="2">
                                <input
                                    readonly
                                    class="text-center font-weight-bold"
                                    type="text"
                                    v-model="item.hwall"
                                />
                            </td>
                            <td class="pa-0">
                                <v-select
                                    dense
                                    hide-details
                                    @change="getDeduct(item)"
                                    :items="hwLine"
                                    outlined
                                    v-model="item.locationLine"
                                ></v-select>
                            </td>
                            <td>
                                <label class="text-center font-weight-bold"
                                    >Grid:</label
                                >
                            </td>
                            <td>
                                <input
                                    class="text-center"
                                    type="text"
                                    @input="computeArea(item)"
                                    v-model="item.outsideGrid"
                                />
                            </td>
                            <td>
                                <input
                                    class="text-center"
                                    type="text"
                                    @input="computeArea(item)"
                                    v-model="item.openingGrid"
                                />
                            </td>
                            <td>
                                <input
                                    readonly
                                    class="text-center"
                                    type="text"
                                    v-model="item.openingDeduct"
                                />
                            </td>
                            <td>
                                <input
                                    class="text-center"
                                    type="text"
                                    @input="computeArea(item)"
                                    v-model="item.tarekabeGrid"
                                />
                            </td>
                            <td>
                                <input
                                    readonly
                                    class="text-center"
                                    type="text"
                                    v-model="item.tarekabeDeduct"
                                />
                            </td>
                            <td>
                                <input
                                    class="text-center"
                                    type="text"
                                    @input="computeArea(item)"
                                    v-model="item.insideGrid"
                                />
                            </td>
                        </tr>
                        <tr :key="index + 'b'">
                            <td class="pa-0">
                                <v-select
                                    dense
                                    hide-details
                                    @change="getDeduct(item)"
                                    :items="hwType"
                                    outlined
                                    v-model="item.locationType"
                                ></v-select>
                            </td>
                            <td>
                                <label class="text-center font-weight-bold"
                                    >Area:</label
                                >
                            </td>
                            <td>
                                <input
                                    readonly
                                    class="text-center font-weight-bold"
                                    type="text"
                                    v-model="item.outsideArea"
                                />
                            </td>
                            <td colspan="2">
                                <input
                                    readonly
                                    class="text-center font-weight-bold"
                                    type="text"
                                    v-model="item.openingArea"
                                />
                            </td>
                            <td colspan="2">
                                <input
                                    readonly
                                    class="text-center font-weight-bold"
                                    type="text"
                                    v-model="item.tarekabeArea"
                                />
                            </td>
                            <td>
                                <input
                                    readonly
                                    class="text-center font-weight-bold"
                                    type="text"
                                    v-model="item.insideArea"
                                />
                            </td>
                        </tr>
                    </template>
                </tbody>
            </template>
        </v-simple-table>

        <v-row justify="center" v-if="gt.hangingWallData.length == 0">
            <h3 class="font-weight-thin">No Hanging Wall Data!</h3>
        </v-row>
    </v-card>
</template>

<script>
export default {
    props: {
        index: Number,
        selectedRow: Object,
        value: Boolean,
        standard: Object,
        gt: Object
    },
    data() {
        return {
            hwQuantity: "",
            hWallHead: [
                { value: "HWall", width: "100" },
                { value: "Type", colspan: "1", width: "100" },
                { value: "Part", colspan: "1", width: "75" },
                { value: "Outside", rowspan: "1" },
                { value: "Opening", colspan: "2", width: "100" },
                { value: "タレ壁", colspan: "2", width: "100" },
                { value: "Inside" }
            ],
            quantityList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            hwType: ["Box", "L"],
            hwLine: ["1F-1L", "1F-2L", "2F-1L", "2F-2L", "3F-1L", "3F-2L"]
        };
    },

    methods: {
        updateHW() {
            this.gt.checkHW(this.hwQuantity);
            this.gt.wallSummary();
            // this.gt.passTotal(this.areaData.items);
        },

        getDeduct(item) {
            this.gt.hwType(item);
            this.gt.wallSummary();
            // this.gt.passTotal(this.areaData.items);
        },

        computeArea(item) {
            this.gt.computeHW(item);
            this.gt.wallSummary();
            // this.gt.passTotal(this.areaData.items);
        }
    }
};
</script>

<style scoped>
* {
    text-transform: none !important;
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