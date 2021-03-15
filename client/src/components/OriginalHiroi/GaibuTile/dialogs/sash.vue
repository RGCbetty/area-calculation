<template>
    <v-dialog v-model="sash" width="550" persistent>
        <v-card>
            <v-card-title class="display-1 font-weight-thin">
                Sash Opening
                <v-col cols="3">
                    <v-select
                        outlined
                        dense
                        hide-details
                        :items="sashFloors"
                        v-model="addEdit.floor"
                        label="Floor"
                    ></v-select>
                </v-col>
                <v-col cols="3">
                    <v-select
                        outlined
                        dense
                        hide-details
                        :items="quantityList"
                        v-model="addEdit.quantity"
                        @change="quantity(addEdit, 'Sash')"
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
                                    v-for="(item, index) in itemHead"
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
                                    <v-combobox
                                        :items="getWidth"
                                        dense
                                        outlined
                                        hide-details
                                        @change="compute(item)"
                                        v-model="item.width"
                                    ></v-combobox>
                                </td>
                                <td class="pa-0">
                                    <v-combobox
                                        :items="getHeight"
                                        dense
                                        outlined
                                        hide-details
                                        @change="compute(item)"
                                        v-model="item.height"
                                    ></v-combobox>
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
                        @click="cancelDialog('Sash')"
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
import { C_TABLE_OPENING } from "@/assets/BPU/dtxtategutables";
export default {
    props: ["sash", "value", "index", "bool"],
    mixins: [BpuMix],
    data() {
        return {
            sashFloors: ["1F", "2F", "3F", "PH", "Gar", "Fuj"],
            itemHead: [
                { value: "Width", width: "50" },
                { value: "Height", width: "50" },
                { value: "Area", width: "100" }
            ]
        };
    },

    computed: {
        getWidth() {
            return Object.keys(C_TABLE_OPENING.width);
        },

        getHeight() {
            return Object.keys(C_TABLE_OPENING.height);
        }
    },

    methods: {
        compute(item) {
            !this.bool
                ? this.areaData.gt.computeSash(item)
                : this.areaDataDB.gt.computeSash(item);
        },

        save() {
            !this.bool
                ? this.areaData.gt.getTotal(this.addEdit)
                : this.areaDataDB.gt.getTotal(this.addEdit);
            this.saveData("sashData", "Sash");
        }
    },

    watch: {
        sash(val) {
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