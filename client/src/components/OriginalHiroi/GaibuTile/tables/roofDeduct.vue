<template>
    <v-card flat>
        <v-card-title class="display-1 font-weight-thin">
            Roof Deduct
        </v-card-title>

        <v-card-text>
            <v-simple-table dense>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th v-for="(item, index) in rdHead" :key="index">
                                {{ item.value }}
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                            v-for="(item, index) in gt.roofDeductionData"
                            :key="index"
                        >
                            <td class="pa-0">
                                <input
                                    type="checkbox"
                                    @change="getDelete('roofDeductionData')"
                                    v-model="item.forDelete"
                                />
                            </td>
                            <td>
                                <input
                                    class="text-center"
                                    type="text"
                                    @dblclick="editDialog(item, index, 'Roof')"
                                    readonly
                                    v-model="item.floor"
                                />
                            </td>
                            <td>
                                <input
                                    class="text-center"
                                    type="text"
                                    @dblclick="editDialog(item, index, 'Roof')"
                                    readonly
                                    v-model="item.pitch"
                                />
                            </td>
                            <td>
                                <input
                                    class="text-center"
                                    type="text"
                                    @dblclick="editDialog(item, index, 'Roof')"
                                    readonly
                                    v-model="item.quantity"
                                />
                            </td>
                            <td>
                                <input
                                    class="text-center"
                                    type="text"
                                    @dblclick="editDialog(item, index, 'Roof')"
                                    readonly
                                    v-model="item.area"
                                />
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>

            <v-row justify="center" v-if="gt.roofDeductionData.length == 0">
                <h3 class="font-weight-thin">No Roof Deduction Data!</h3>
            </v-row>

            <roofDeductD
                :bool="value"
                :roof="dialogRoof"
                :value="addEdit"
                :index="editIndex"
                @closeDialog="closeDialog"
            ></roofDeductD>

            <v-row no-gutters class="mt-1">
                <v-btn @click="newDialog('Roof')" small class="mr-2"
                    >Add Roof</v-btn
                >
                <v-btn
                    @click="itemDelete('roofDeductionData')"
                    v-if="selected.length > 0"
                    small
                    >Remove Deduct</v-btn
                >
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import { roofDeductD } from "@/components/OriginalHiroi/GaibuTile/dialogs/dialogs";
import { BpuMix } from "@/components/OriginalHiroi/GaibuTile/mixins/bpu";
export default {
    props: {
        index: Number,
        selectedRow: Object,
        value: Boolean,
        standard: Object,
        gt: Object
    },
    components: { roofDeductD },
    mixins: [BpuMix],
    data() {
        return {
            rdHead: [
                { value: "" },
                { value: "Floor" },
                { value: "Pitch" },
                { value: "Quantity" },
                { value: "Area" }
            ]
        };
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

input[type="checkbox"]:after {
    background-color: #fff;
    display: inline-block;
    color: green;
    width: 22px;
    height: 22px;
    visibility: visible;
    border: 1px solid green;
    margin-left: 10px;
    padding-left: 5px;
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