<template>
    <v-card flat class="mt-2">
        <v-card-title class="display-1 font-weight-thin"
            >Deduction</v-card-title
        >
        <v-simple-table dense>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th
                            v-for="(th, th_i) in deductionHeader"
                            :key="th_i"
                            :width="th.width"
                            class="text-center"
                        >
                            {{ th.value }}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(item, index) in gt.deductionData" :key="index">
                        <td class="pa-0">
                            <input
                                type="checkbox"
                                @change="getDelete('deductionData')"
                                v-model="item.forDelete"
                            />
                        </td>
                        <td>
                            <input
                                class="text-center font-weight-bold"
                                type="text"
                                @dblclick="editDialog(item, index, 'deduction')"
                                readonly
                                v-model="item.area"
                            />
                        </td>
                        <td>
                            <input
                                class="text-center"
                                type="text"
                                @dblclick="editDialog(item, index, 'deduction')"
                                readonly
                                v-model="item.material"
                            />
                        </td>
                        <td>
                            <input
                                class="text-center"
                                type="text"
                                @dblclick="editDialog(item, index, 'deduction')"
                                readonly
                                v-model="item.shape"
                            />
                        </td>
                        <td>
                            <input
                                class="text-center"
                                type="text"
                                @dblclick="editDialog(item, index, 'deduction')"
                                readonly
                                v-model="item.fl"
                            />
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>

        <v-row justify="center" v-if="gt.deductionData.length == 0">
            <h3 class="font-weight-thin">No Balcony Deduction Data!</h3>
        </v-row>

        <balconyDeduct
            :bool="value"
            :deduction="dialogdeduction"
            :value="addEdit"
            :index="editIndex"
            @closeDialog="closeDialog"
        ></balconyDeduct>

        <v-row no-gutters class="mt-1">
            <v-btn @click="newDialog('deduction')" small>New Deduction</v-btn>
            <v-btn
                @click="itemDelete('deductionData')"
                v-if="selected.length > 0"
                small
                class="ml-2"
                >Remove Deduction</v-btn
            >
        </v-row>
    </v-card>
</template>

<script>
import { balconyDeduct } from "@/components/OriginalHiroi/GaibuTile/dialogs/dialogs";
import { BpuMix } from "@/components/OriginalHiroi/GaibuTile/mixins/bpu";
export default {
    props: {
        index: Number,
        selectedRow: Object,
        value: Boolean,
        standard: Object,
        gt: Object
    },
    components: { balconyDeduct },
    mixins: [BpuMix],
    data() {
        return {
            deductionHeader: [
                { value: "", width: "10" },
                { value: "Area", width: "200" },
                { value: "Material", width: "75" },
                { value: "Shape", width: "150" },
                { value: "FL", width: "350" }
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
    width: 20px;
    height: 22px;
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