<template>
    <v-container fluid class="pa-0">
        <v-card-title>Computation:</v-card-title>
        <v-simple-table dense>
            <template v-slot:default>
                <tbody>
                    <tr>
                        <td class="text-center">
                            E:{{ youjonet.coordinates[0] }}*0.91*3+0*3
                        </td>
                        <td class="text-center">
                            {{
                                Number(
                                    Math.round(
                                        youjonet.areaP[0] +
                                            youjonet.areaR[0] +
                                            "e" +
                                            3
                                    ) +
                                        "e-" +
                                        3
                                )
                            }}
                        </td>
                        <td class="text-center">70730</td>
                    </tr>
                    <tr>
                        <td class="text-center">
                            W:{{ youjonet.coordinates[1] }}*0.91*3+0*3
                        </td>
                        <td class="text-center">
                            {{
                                Number(
                                    Math.round(
                                        youjonet.areaP[1] +
                                            youjonet.areaR[1] +
                                            "e" +
                                            3
                                    ) +
                                        "e-" +
                                        3
                                )
                            }}
                        </td>
                        <td
                            class="text-center"
                            style="border: solid 1px; border-color: gray"
                            rowspan="3"
                        >
                            {{
                                Number(
                                    Math.round(youjonet.total + "e" + 3) +
                                        "e-" +
                                        3
                                )
                            }}
                        </td>
                    </tr>
                    <tr>
                        <td class="text-center">
                            S:{{ youjonet.coordinates[2] }}*0.91*3+0*3
                        </td>
                        <td class="text-center">
                            {{
                                Number(
                                    Math.round(
                                        youjonet.areaP[2] +
                                            youjonet.areaR[2] +
                                            "e" +
                                            3
                                    ) +
                                        "e-" +
                                        3
                                )
                            }}
                        </td>
                    </tr>
                    <tr>
                        <td class="text-center">
                            N:{{
                                Number(
                                    Math.round(
                                        youjonet.coordinates[3] + "e" + 3
                                    ) +
                                        "e-" +
                                        3
                                )
                            }}*0.91*3+0*3
                        </td>
                        <td class="text-center">
                            {{
                                Number(
                                    Math.round(
                                        youjonet.areaP[3] +
                                            youjonet.areaR[3] +
                                            "e" +
                                            3
                                    ) +
                                        "e-" +
                                        3
                                )
                            }}
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-container>
</template>
<script>
// import AreaData from '../assets/class/areadata/'
import { myMixin } from "../../../../assets/class/areadata/bankin/mixins";
export default {
    mixins: [myMixin],
    components: {},
    props: {
        index: Number,
        youjonet: Object,
        selectedRow: Object,
        value: Boolean
    },
    created() {
        // this.youjonet.loadRows()
    },
    data: () => ({
        // temp: new AreaData
    }),
    computed: {},
    methods: {}
};
</script>
<style scoped>
table {
    border: solid 1px #e8e4c9;
    border-collapse: collapse;
    border-spacing: 0;
    font: normal 13px Arial, sans-serif;
    /* table-layout:fixed; */
    width: 50%;
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
/* table td {
  position: relative;
} */
/* table td input {
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
} */
tbody tr:hover {
    background-color: transparent !important;
}
.v-select > .dropdown-menu {
    text-align: center;
}
</style>
