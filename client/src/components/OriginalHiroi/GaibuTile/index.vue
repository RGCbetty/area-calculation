<template>
    <v-container fluid>
        <v-tabs fixed-tabs dark>
            <template v-if="!value">
                <v-tab class="font-weight-thin"> Balcony Porch Unit </v-tab>
                <v-tabs-slider color="green"></v-tabs-slider>
                <v-tab-item :transition="false" :reverse-transition="false">
                    <v-row>
                        <v-col cols="8">
                            <balconyTable
                                :index="index"
                                :selectedRow="selectedRow"
                                :value="value"
                                :standard="standard"
                                :gt="areaData.gt"
                                @compute="getSummary"
                            ></balconyTable>
                        </v-col>

                        <v-col cols="4">
                            <deducTable
                                :index="index"
                                :selectedRow="selectedRow"
                                :value="value"
                                :standard="standard"
                                :gt="areaData.gt"
                            ></deducTable>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="8">
                            <porchTable
                                :index="index"
                                :selectedRow="selectedRow"
                                :value="value"
                                :standard="standard"
                                :gt="areaData.gt"
                            ></porchTable>
                        </v-col>

                        <v-col>
                            <summaryTable
                                :index="index"
                                :selectedRow="selectedRow"
                                :value="value"
                                :standard="standard"
                                :gt="areaData.gt"
                            ></summaryTable>
                        </v-col>
                    </v-row>
                </v-tab-item>

                <v-tab class="font-weight-thin"> Gaiheki Tile Wall </v-tab>
                <v-tab-item :transition="false" :reverse-transition="false">
                    <v-row>
                        <v-col cols="4">
                            <bbTable
                                :index="index"
                                :selectedRow="selectedRow"
                                :value="value"
                                :standard="standard"
                                :gt="areaData.gt"
                            ></bbTable>
                        </v-col>

                        <v-col cols="5">
                            <bEaves
                                :index="index"
                                :selectedRow="selectedRow"
                                :value="value"
                                :standard="standard"
                                :gt="areaData.gt"
                            ></bEaves>
                        </v-col>

                        <v-col cols="3" style="margin-left: -15px">
                            <sash
                                :index="index"
                                :selectedRow="selectedRow"
                                :value="value"
                                :standard="standard"
                                :gt="areaData.gt"
                            ></sash>
                        </v-col>
                    </v-row>

                    <v-row style="margin-top: -20px">
                        <v-col cols="7">
                            <bhwall
                                :index="index"
                                :selectedRow="selectedRow"
                                :value="value"
                                :standard="standard"
                                :gt="areaData.gt"
                            ></bhwall>
                        </v-col>
                        <v-col>
                            <rDed
                                :index="index"
                                :selectedRow="selectedRow"
                                :value="value"
                                :standard="standard"
                                :gt="areaData.gt"
                            ></rDed>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <gtAdd
                                :index="index"
                                :selectedRow="selectedRow"
                                :value="value"
                                :standard="standard"
                                :gt="areaData.gt"
                            ></gtAdd>
                        </v-col>
                        <v-col>
                            <gtDed
                                :index="index"
                                :selectedRow="selectedRow"
                                :value="value"
                                :standard="standard"
                                :gt="areaData.gt"
                            ></gtDed>
                        </v-col>
                        <v-col>
                            <wallSummary
                                :index="index"
                                :selectedRow="selectedRow"
                                :value="value"
                                :standard="standard"
                                :gt="areaData.gt"
                            ></wallSummary>
                        </v-col>
                    </v-row>
                </v-tab-item>
            </template>
            <template v-else>
                <v-tab class="font-weight-thin"> Balcony Porch Unit </v-tab>
                <v-tabs-slider color="green"></v-tabs-slider>
                <v-tab-item :transition="false" :reverse-transition="false">
                    <v-row>
                        <v-col cols="8">
                            <balconyTable
                                :index="index"
                                :selectedRow="selectedRow"
                                :value="value"
                                :standard="standard"
                                :gt="areaDataDB.gt"
                                @compute="getSummary"
                            ></balconyTable>
                        </v-col>

                        <v-col cols="4">
                            <deducTable
                                :index="index"
                                :selectedRow="selectedRow"
                                :value="value"
                                :standard="standard"
                                :gt="areaDataDB.gt"
                            ></deducTable>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="8">
                            <porchTable
                                :index="index"
                                :selectedRow="selectedRow"
                                :value="value"
                                :standard="standard"
                                :gt="areaDataDB.gt"
                                @compute="getSummary"
                            ></porchTable>
                        </v-col>

                        <v-col>
                            <summaryTable
                                :index="index"
                                :selectedRow="selectedRow"
                                :value="value"
                                :standard="standard"
                                :gt="areaDataDB.gt"
                                @compute="getSummary"
                            ></summaryTable>
                        </v-col>
                    </v-row>
                </v-tab-item>

                <v-tab class="font-weight-thin"> Gaiheki Tile Wall </v-tab>
                <v-tab-item :transition="false" :reverse-transition="false">
                    <v-row>
                        <v-col cols="4">
                            <bbTable
                                :index="index"
                                :selectedRow="selectedRow"
                                :value="value"
                                :standard="standard"
                                :gt="areaDataDB.gt"
                                @compute="getSummary"
                            ></bbTable>
                        </v-col>

                        <v-col cols="5">
                            <bEaves
                                :index="index"
                                :selectedRow="selectedRow"
                                :value="value"
                                :standard="standard"
                                :gt="areaDataDB.gt"
                                @compute="getSummary"
                            ></bEaves>
                        </v-col>

                        <v-col cols="3" style="margin-left: -15px">
                            <sash
                                :index="index"
                                :selectedRow="selectedRow"
                                :value="value"
                                :standard="standard"
                                :gt="areaDataDB.gt"
                                @compute="getSummary"
                            ></sash>
                        </v-col>
                    </v-row>
                    <div></div>
                    <v-row style="margin-top: -20px">
                        <v-col cols="7">
                            <bhwall
                                :index="index"
                                :selectedRow="selectedRow"
                                :value="value"
                                :standard="standard"
                                :gt="areaDataDB.gt"
                                @compute="getSummary"
                            ></bhwall>
                        </v-col>
                        <v-col>
                            <rDed
                                :index="index"
                                :selectedRow="selectedRow"
                                :value="value"
                                :standard="standard"
                                :gt="areaDataDB.gt"
                                @compute="getSummary"
                            ></rDed>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <gtAdd
                                :index="index"
                                :selectedRow="selectedRow"
                                :value="value"
                                :standard="standard"
                                :gt="areaDataDB.gt"
                                @compute="getSummary"
                            ></gtAdd>
                        </v-col>
                        <v-col>
                            <gtDed
                                :index="index"
                                :selectedRow="selectedRow"
                                :value="value"
                                :standard="standard"
                                :gt="areaDataDB.gt"
                                @compute="getSummary"
                            ></gtDed>
                        </v-col>
                        <v-col>
                            <wallSummary
                                :index="index"
                                :selectedRow="selectedRow"
                                :value="value"
                                :standard="standard"
                                :gt="areaDataDB.gt"
                                @compute="getSummary"
                            ></wallSummary>
                        </v-col>
                    </v-row>
                </v-tab-item>
            </template>
        </v-tabs>
    </v-container>
</template>

<script>
import _cloneDeep from "lodash.clonedeep";
import _merge from "lodash.merge";
import AreaData from "../../../assets/class/areadata/index";
import {
    bhwall,
    bEaves,
    bbTable,
    gtAdd,
    gtDed,
    rDed,
    sash,
    wallSummary
} from "@/components/OriginalHiroi/GaibuTile/tables/gtTables";
import {
    balconyTable,
    deducTable,
    porchTable,
    summaryTable
} from "@/components/OriginalHiroi/GaibuTile/tables/bpuTables";
import { BpuMix } from "@/components/OriginalHiroi/GaibuTile/mixins/bpu";
export default {
    props: {
        index: Number,
        selectedRow: Object,
        value: Boolean,
        desc: Object,
        standard: Object
    },
    watch: {
        desc(newVal) {
            this.RESET_AREA_CALCULATION_DB({
                area: new AreaData()
            });
            this.areaDataDB.gt = _merge(
                _cloneDeep(this.areaDataDB.gt),
                newVal.gt
            );
            console.log(this.areaDataDB.gt);
            console.log(newVal.gt);
            this.areaDataDB.balcony = _merge(
                _cloneDeep(this.areaDataDB.balcony),
                newVal.balcony
            );
            this.areaDataDB.standard = _merge(
                _cloneDeep(this.areaDataDB.standard),
                newVal.standard
            );
        }
    },
    components: {
        balconyTable,
        deducTable,
        porchTable,
        summaryTable,
        bbTable,
        bEaves,
        bhwall,
        gtAdd,
        gtDed,
        rDed,
        sash,
        wallSummary
    },
    mixins: [BpuMix]
};
</script>

<style scoped>
* {
    text-transform: none !important;
}

.v-slide-group__wrapper > .v-tabs-bar__content > .v-tab--active {
    background-color: #396f39;
}
</style>
