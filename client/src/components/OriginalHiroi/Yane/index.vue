<template>
    <v-container fluid class="pa-0">
        <v-card flat>
            <v-row>
                <template v-if="!value">
                    <v-col cols="8" class="pa-0">
                        <main-table
                            postTitle="Yane"
                            :headers="YaneHeader"
                            :value="value"
                            :list="descriptionList"
                            :items="areaData.yane.items"
                            :index="index"
                            :selectedRow="selectedRow"
                        ></main-table>
                    </v-col>
                    <v-col cols="4" class="pr-1 pt-0">
                        <pitch-table
                            title="Main Roof"
                            :headers="mrHeaders"
                            :rows="areaData.standard.mr"
                        ></pitch-table>
                        <pitch-table
                            title="Solar Panel"
                            :headers="spHeaders"
                            :rows="areaData.standard.sp"
                        ></pitch-table>
                        <main-roof
                            class="pt-6"
                            :yane="areaData.yane"
                        ></main-roof>
                        <kyp-table
                            class="pt-0"
                            :yane="areaData.yane"
                        ></kyp-table>
                        <perimeter-table
                            class="pt-5"
                            :yane="areaData.yane"
                        ></perimeter-table>
                        <penthouse-table
                            class="pt-5"
                            :standard="areaData.standard"
                            :yane="areaData.yane"
                        ></penthouse-table>
                        <solar-panel
                            class="pt-5"
                            :yane="areaData.yane"
                        ></solar-panel>
                        <roof-total class="pt-5" :yane="areaData.yane" />
                    </v-col>
                </template>
                <template v-else>
                    <v-col cols="8" class="pa-0">
                        <main-table
                            :headers="YaneHeader"
                            :value="value"
                            :list="descriptionList"
                            :items="areaDataDB.yane.items"
                            :index="index"
                            :selectedRow="selectedRow"
                        ></main-table>
                    </v-col>
                    <v-col cols="4" class="pr-1 pt-0">
                        <pitch-table
                            title="Main Roof"
                            :headers="mrHeaders"
                            :rows="areaDataDB.standard.mr"
                        ></pitch-table>
                        <pitch-table
                            title="Solar Panel"
                            :headers="spHeaders"
                            :rows="areaDataDB.standard.sp"
                        ></pitch-table>
                        <main-roof
                            class="pt-6"
                            :yane="areaDataDB.yane"
                        ></main-roof>
                        <kyp-table
                            class="pt-0"
                            :yane="areaDataDB.yane"
                        ></kyp-table>
                        <perimeter-table
                            class="pt-5"
                            :yane="areaDataDB.yane"
                        ></perimeter-table>
                        <penthouse-table
                            class="pt-5"
                            :standard="areaDataDB.standard"
                            :yane="areaDataDB.yane"
                        ></penthouse-table>
                        <solar-panel
                            class="pt-5"
                            :yane="areaDataDB.yane"
                        ></solar-panel>
                        <roof-total class="pt-5" :yane="areaDataDB.yane" />
                    </v-col>
                </template>
            </v-row>
        </v-card>
    </v-container>
</template>
<script>
import { Description } from "./mixins";
import { myMixin } from "../PitchTable/mixins";
import _cloneDeep from "lodash.clonedeep";
import _merge from "lodash.merge";

export default {
    mixins: [Description, myMixin],
    props: {
        index: Number,
        selectedRow: Object,
        desc: Object,
        value: Boolean,
        standard: Object
    },

    components: {
        MainTable: () => import("./tables/MainTable"),
        PitchTable: () => import("../PitchTable/index"),
        MainRoof: () => import("./tables/MainRoofTable"),
        KypTable: () => import("./tables/KYPtable"),
        // PorchYane: () => import('./tables/PorchYaneTable'),
        // NihonkiriyokeTable: () => import('./tables/NihonkiroyokeTable'),
        PerimeterTable: () => import("./tables/PerimeterTable"),
        PenthouseTable: () => import("./tables/PenthouseTable"),
        // BrillartTable: () => import('./tables/BrillartkiroyokeTable'),
        SolarPanel: () => import("./tables/SolarPanelTable"),
        RoofTotal: () => import("./tables/RoofTotal") // For Flat roof and Slope ROof
    },
    created() {},
    data() {
        return {};
    },
    watch: {
        desc(newVal) {
            this.areaDataDB.yane = _merge(
                _cloneDeep(this.areaDataDB.yane),
                newVal.yane
            );
            this.areaDataDB.standard = _merge(
                _cloneDeep(this.areaDataDB.standard),
                newVal.standard
            );
        }
    },
    methods: {}
};
</script>

<style scoped>
* {
    text-transform: none !important;
}
</style>
