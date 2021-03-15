<template>
    <v-card flat>
        <v-card-title class="display-1 font-weight-thin">Porch</v-card-title>
        <v-simple-table dense>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th
                            v-for="(item, index) in porchHeader"
                            :key="index"
                            class="text-center"
                            :width="item.width"
                        >
                            {{ item.value }}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(item, index) in gt.porchData" :key="index">
                        <td class="pa-0">
                            <input
                                type="checkbox"
                                @change="getDelete('porchData')"
                                v-model="item.forDelete"
                            />
                        </td>
                        <td>
                            <input
                                class="text-center"
                                type="text"
                                @dblclick="editDialog(item, index, 'Porch')"
                                readonly
                                v-model="item.location"
                            />
                        </td>
                        <td>
                            <input
                                class="text-center"
                                type="text"
                                @dblclick="editDialog(item, index, 'Porch')"
                                readonly
                                v-model="item.size"
                            />
                        </td>
                        <td>
                            <input
                                class="text-center"
                                type="text"
                                @dblclick="editDialog(item, index, 'Porch')"
                                readonly
                                v-model="item.quantity"
                            />
                        </td>
                        <td>
                            <input
                                class="text-center"
                                type="text"
                                @dblclick="editDialog(item, index, 'Porch')"
                                readonly
                                v-model="item.material"
                            />
                        </td>
                        <td>
                            <input
                                class="text-center"
                                type="text"
                                @dblclick="editDialog(item, index, 'Porch')"
                                readonly
                                v-model="item.jobsched"
                            />
                        </td>
                        <td>
                            <input
                                class="text-center"
                                type="text"
                                @dblclick="editDialog(item, index, 'Porch')"
                                readonly
                                v-model="item.height"
                            />
                        </td>
                        <td>
                            <input
                                class="text-center font-weight-bold"
                                type="text"
                                @dblclick="editDialog(item, index, 'Porch')"
                                readonly
                                v-model="item.area"
                            />
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>

        <v-row justify="center" v-if="gt.porchData.length == 0">
            <h3 class="font-weight-thin">No Porch Data!</h3>
        </v-row>

        <porchPart
            :bool="value"
            :porch="dialogPorch"
            :value="addEdit"
            :index="editIndex"
            @closeDialog="closeDialog"
        ></porchPart>

        <v-row no-gutters class="mt-1">
            <v-btn @click="newDialog('Porch')" small class="mr-2"
                >Add Porch</v-btn
            >
            <v-btn
                @click="itemDelete('porchData')"
                v-if="selected.length > 0"
                small
                >Remove Porch</v-btn
            >
        </v-row>
    </v-card>
</template>

<script>
import { BpuMix } from "@/components/OriginalHiroi/GaibuTile/mixins/bpu";
import { porchPart } from "@/components/OriginalHiroi/GaibuTile/dialogs/dialogs";
export default {
    props: {
        index: Number,
        selectedRow: Object,
        value: Boolean,
        standard: Object,
        gt: Object
    },
    components: { porchPart },
    mixins: [BpuMix],
    data() {
        return {
            porchHeader: [
                { value: "", width: "10" },
                { value: "Location", width: "150" },
                { value: "Size", width: "75" },
                { value: "Quantity", width: "50" },
                { value: "Material", width: "50" },
                { value: "Jobsched", width: "100" },
                { value: "Height", width: "100" },
                { value: "Area", width: "100" }
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
    margin-left: 1px;
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