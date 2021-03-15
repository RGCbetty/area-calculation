<template>
    <v-dialog v-model="roof" width="700" persistent>
        <v-card>
            <v-card-title class="display-1 font-weight-thin">
                Deduction
                <v-col cols="3">
                    <v-select
                        dense
                        outlined
                        hide-details
                        :items="floorList"
                        v-model="addEdit.floor"
                        label="Floor"
                        @change="updatePitchList(addEdit.floor)"
                    ></v-select>
                </v-col>
                <v-col cols="3">
                    <v-select
                        dense
                        outlined
                        hide-details
                        :items="pitchList"
                        v-model="addEdit.pitch"
                        label="Pitch"
                    ></v-select>
                </v-col>
                <v-col cols="3">
                    <v-select
                        dense
                        outlined
                        hide-details
                        :items="quantityList"
                        :disabled="!addEdit.pitch"
                        v-model="addEdit.quantity"
                        @change="quantity(addEdit, 'Roof')"
                        label="Quantity"
                    ></v-select>
                </v-col>
            </v-card-title>

            <v-card-text>
                <v-simple-table dense>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th
                                    v-for="(item, index) in deductHeader"
                                    :key="index"
                                    :width="item.width"
                                >
                                    {{ item.value }}
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr
                                v-for="(item, index) in addEdit.data"
                                :key="index"
                            >
                                <td class="pa-0">
                                    <v-select
                                        dense
                                        outlined
                                        hide-details
                                        @change="compute(item)"
                                        :items="shapeChoices"
                                        v-model="item.shape"
                                    ></v-select>
                                </td>
                                <td>
                                    <input
                                        class="text-center"
                                        type="text"
                                        @change="compute(item)"
                                        v-model="item.base"
                                    />
                                </td>
                                <td>
                                    <input
                                        class="text-center"
                                        type="text"
                                        @change="compute(item)"
                                        v-model="item.height"
                                    />
                                </td>
                                <td>
                                    <input
                                        class="text-center"
                                        type="text"
                                        readonly
                                        v-model="item.area"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>

            <v-card-actions>
                <v-row no-gutters style="margin-top: -20px">
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        class="font-weight-bold"
                        @click="cancelDialog('Roof')"
                        >Cancel</v-btn
                    >
                    <v-btn text class="font-weight-bold" @click="save()"
                        >Save</v-btn
                    >
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { BpuMix } from "@/components/OriginalHiroi/GaibuTile/mixins/bpu";
export default {
    mixins: [BpuMix],
    props: ["roof", "value", "index", "bool"],
    data() {
        return {
            deductHeader: [
                { value: "Shape", width: "75" },
                { value: "Base", width: "75" },
                { value: "Height", width: "75" },
                { value: "Area", width: "150" }
            ],
            shapeChoices: ["T", "R", "T+", "R+"]
        };
    },

    methods: {
        compute(item) {
            !this.bool
                ? this.areaData.gt.computeRoofDeduct(item)
                : this.areaDataDB.gt.computeRoofDeduct(item);
        },

        save() {
            !this.bool
                ? this.areaData.gt.getTotal(this.addEdit)
                : this.areaDataDB.gt.getTotal(this.addEdit);
            this.saveData("roofDeductionData", "Roof");
        }
    },

    watch: {
        roof(val) {
            if (val == true) {
                this.loadFromParent();
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