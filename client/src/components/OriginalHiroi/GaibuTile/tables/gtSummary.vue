<template>
    <v-card flat>
        <v-card-title class="display-1 font-weight-thin">
            Wall Summary
        </v-card-title>

        <v-simple-table dense>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-center">Floor Level</th>
                        <th class="text-center">Area</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, index) in gt.gtSummary.sum1F"
                        :key="index + '1'"
                    >
                        <th class="text-center">{{ item.floor }}</th>
                        <td class="text-center font-weight-bold">
                            {{ item.data }}
                        </td>
                    </tr>

                    <tr
                        v-for="(item, index) in gt.gtSummary.sum2F"
                        :key="index + '2'"
                    >
                        <th class="text-center">{{ item.floor }}</th>
                        <td class="text-center font-weight-bold">
                            {{ item.data }}
                        </td>
                    </tr>

                    <tr
                        v-for="(item, index) in gt.gtSummary.sum3F"
                        :key="index + '3'"
                    >
                        <th class="text-center">{{ item.floor }}</th>
                        <td class="text-center font-weight-bold">
                            {{ item.data }}
                        </td>
                    </tr>

                    <tr
                        v-for="(item, index) in gt.gtSummary.sumTotal"
                        :key="index + 'T'"
                    >
                        <th class="text-center">{{ item.floor }}</th>
                        <td class="text-center font-weight-bold">
                            {{ item.data }}
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>

        <v-simple-table dense class="mt-2">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-center">Inside Wall</th>
                        <th class="text-center">Area</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                        v-for="(item, index) in gt.gtSummary.sumGar"
                        :key="index + 'Gar'"
                    >
                        <th class="text-center">{{ item.floor }}</th>
                        <td class="text-center font-weight-bold">
                            {{ item.data }}
                        </td>
                    </tr>

                    <tr
                        v-for="(item, index) in gt.gtSummary.sumFuj"
                        :key="index + 'Fuj'"
                    >
                        <th class="text-center">{{ item.floor }}</th>
                        <td class="text-center font-weight-bold">
                            {{ item.data }}
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
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
        return {};
    }
};
</script>

<style scoped>
* {
    text-transform: none !important;
}

table {
    border: solid 1px #e8e4c9;
    border-collapse: collapse;
    border-spacing: 0;
    font: normal 13px Arial, sans-serif;
    /* table-layout:fixed; */
    width: 100%;
}

thead th {
    background-color: #4caf50;
    border: solid 1px;
    border-color: #424242;
    color: white !important;
    height: 1vh !important;
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