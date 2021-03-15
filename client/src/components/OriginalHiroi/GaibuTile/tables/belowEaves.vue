<template>
    <v-card flat>
        <v-card-title class="display-1 font-weight-thin"
            >Below Eaves</v-card-title
        >
        <v-simple-table dense>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-center" width="80">FL</th>
                        <th class="text-center" width="80">S</th>
                        <th class="text-center" width="80">E</th>
                        <th class="text-center" width="80">N</th>
                        <th class="text-center" width="80">W</th>
                        <th class="text-center" width="80">All</th>
                        <th class="text-center" width="80">Irr</th>
                        <th class="text-center" width="90">H</th>
                        <th class="text-center" width="100">Area</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="(item, index) in gt.belowEavesData"
                        :key="index + '1'"
                    >
                        <td>
                            <input
                                readonly
                                class="text-center font-weight-bold"
                                type="text"
                                v-model="item.floor"
                            />
                        </td>
                        <td>
                            <input
                                class="text-center"
                                type="text"
                                @input="compute(item)"
                                v-model="item.south"
                            />
                        </td>
                        <td>
                            <input
                                class="text-center"
                                type="text"
                                @input="compute(item)"
                                v-model="item.east"
                            />
                        </td>
                        <td>
                            <input
                                class="text-center"
                                type="text"
                                @input="compute(item)"
                                v-model="item.north"
                            />
                        </td>
                        <td>
                            <input
                                class="text-center"
                                type="text"
                                @input="compute(item)"
                                v-model="item.west"
                            />
                        </td>
                        <td>
                            <input
                                readonly
                                class="text-center"
                                type="text"
                                v-model="item.all"
                            />
                        </td>
                        <td>
                            <input
                                class="text-center"
                                type="text"
                                @input="compute(item)"
                                v-model="item.irreg"
                            />
                        </td>
                        <td>
                            <input
                                readonly
                                class="text-center"
                                type="text"
                                @dblclick="editHeight(item, index, 'eaves')"
                                v-model="item.height"
                            />
                        </td>
                        <td>
                            <input
                                readonly
                                class="text-center font-weight-bold"
                                type="text"
                                v-model="item.area"
                            />
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>

        <heightDialog
            :bool="value"
            :height="dialogHeight"
            :value="changeHeight"
            :index="editIndex"
            :part="editHeightPart"
            @recompute-eaves="recalculateEaves"
            @closeDialog="closeDialog"
        ></heightDialog>
    </v-card>
</template>

<script>
import { heightDialog } from "@/components/OriginalHiroi/GaibuTile/dialogs/dialogs";
import { BpuMix } from "@/components/OriginalHiroi/GaibuTile/mixins/bpu";
export default {
    components: { heightDialog },
    mixins: [BpuMix],
    props: {
        index: Number,
        selectedRow: Object,
        value: Boolean,
        standard: Object,
        gt: Object
    },
    data() {
        return {
            dialogHeight: false,
            changeHeight: 0,
            editHeightPart: ""
        };
    },

    methods: {
        compute(item) {
            this.gt.addAndCompute(item);
            this.getSummary();
            // this.gt.passTotal(this.areaData.items);
        },

        recalculateEaves(index) {
            this.compute(this.gt.belowEavesData[index]);
        },

        editHeight(item, index, text) {
            if (item.floor == "PH") {
                this.editIndex = index;
                this.changeHeight = item.height;
                this.editHeightPart = text;
                this.dialogHeight = this.dialogHeight == false ? true : false;
            }
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