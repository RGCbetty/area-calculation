<template>
    <v-card flat>
        <v-card-title class="display-1 font-weight-thin"
            >Below Balcony</v-card-title
        >
        <v-simple-table dense>
            <template v-slot:default>
                <thead>
                    <tr v-for="(tr, tr_i) in bbWallHead" :key="tr_i">
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
                    <tr v-for="(item, index) in gt.bbData" :key="index">
                        <td>
                            <input
                                readonly
                                class="text-center"
                                type="text"
                                v-model="item.bbBalcony"
                            />
                        </td>
                        <td>
                            <input
                                readonly
                                class="text-center"
                                type="text"
                                v-model="item.bbFloorLevel"
                            />
                        </td>
                        <td>
                            <input
                                class="text-center"
                                @input="compute(item)"
                                type="text"
                                v-model="item.bbGrid"
                            />
                        </td>
                        <td>
                            <input
                                class="text-center"
                                @input="compute(item)"
                                type="text"
                                v-model="item.bbMeter"
                            />
                        </td>
                        <td>
                            <input
                                readonly
                                class="text-center"
                                type="text"
                                v-model="item.bbHeight"
                            />
                        </td>
                        <td>
                            <input
                                readonly
                                class="text-center font-weight-bold"
                                type="text"
                                v-model="item.bbArea"
                            />
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>

        <v-row justify="center" v-if="gt.bbData.length == 0">
            <h3 class="font-weight-thin">No Balcony Data!</h3>
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
            bbWallHead: [
                [
                    { value: "Balcony", rowspan: "2", width: "200" },
                    { value: "Floor", rowspan: "2", width: "40" },
                    { value: "Width", colspan: "2", width: "80" },
                    { value: "Height", rowspan: "2", width: "40" },
                    { value: "Area", rowspan: "2", width: "70" }
                ],
                [
                    { value: "Grid", width: "40" },
                    { value: "Meter", width: "40" }
                ]
            ]
        };
    },

    methods: {
        compute(item) {
            this.gt.computeArea(item);
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