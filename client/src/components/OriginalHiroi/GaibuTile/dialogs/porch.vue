<template>
    <v-dialog v-model="porch" width="400" persistent>
        <v-card>
            <v-card-title class="font-weight-thin">
                Porch Size & Quantity
                <v-spacer></v-spacer>
                <v-switch
                    v-model="addEdit.irregular"
                    @change="computePorch()"
                    label="Irregular"
                ></v-switch>
            </v-card-title>
            <v-card-text class="pt-2" max-height="20">
                <v-row no-gutters style="margin-top: -20px">
                    <v-col class="mr-2" cols="8">
                        <v-select
                            hide-details
                            dense
                            outlined
                            :items="porchList"
                            label="Location"
                            v-model="addEdit.location"
                            @change="computePorch()"
                        ></v-select>
                    </v-col>
                    <v-col>
                        <v-select
                            hide-details
                            dense
                            outlined
                            :items="balconyMaterialChoices"
                            v-model="addEdit.material"
                            label="Material"
                        ></v-select>
                    </v-col>
                </v-row>

                <v-row no-gutters class="mt-2">
                    <v-col>
                        <v-text-field
                            v-if="addEdit.irregular"
                            outlined
                            dense
                            label="Size"
                            @change="computePorch()"
                            v-model="addEdit.size"
                        ></v-text-field>
                        <v-select
                            v-else
                            dense
                            hide-details
                            outlined
                            :items="setColumns"
                            label="Size"
                            @change="computePorch()"
                            v-model="addEdit.size"
                        ></v-select>
                    </v-col>
                    <v-col class="mx-2">
                        <v-text-field
                            dense
                            outlined
                            label="Quantity"
                            @change="computePorch()"
                            v-model="addEdit.quantity"
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-select
                            dense
                            hide-details
                            outlined
                            :items="balconyJobschedTypes"
                            v-model="addEdit.jobsched"
                            label="Jobsched"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-row no-gutters style="margin-top: -20px">
                <h4 class="ml-5 font-weight-thin">
                    Height: {{ addEdit.height }} -- Area: {{ addEdit.area }}
                </h4>
                <v-spacer></v-spacer>
                <v-btn
                    text
                    class="font-weight-bold"
                    @click="cancelDialog('Porch')"
                    >Cancel</v-btn
                >
                <v-btn
                    text
                    class="font-weight-bold"
                    @click="saveData('porchData', 'Porch')"
                    >Save</v-btn
                >
            </v-row>
        </v-card>
    </v-dialog>
</template>

<script>
import { BpuMix } from "@/components/OriginalHiroi/GaibuTile/mixins/bpu";
import { Column } from "@/assets/BPU/Tables";
export default {
    mixins: [BpuMix, Column],
    props: ["porch", "value", "index", "bool"],
    computed: {
        porchList() {
            let arr = ["1F-1L", "1F-2L", "2F-1L", "2F-2L", "3F-1L", "3F-2L"];
            let getBalcony = !this.bool
                ? this.areaData.gt.balconyData.map((o) =>
                      o.floorLevel.concat(o.balconyName).concat(o.type)
                  )
                : this.areaDataDB.gt.balconyData.map((o) =>
                      o.floorLevel.concat(o.balconyName).concat(o.type)
                  );
            getBalcony.forEach((o) => arr.push(o));

            return arr;
        },

        setColumns() {
            let arr = [];
            for (let val of Object.entries(Column.COL)) {
                arr.push(val[1].size);
            }

            return arr;
        }
    },

    methods: {
        computePorch() {
            if (this.addEdit.location.length > 0) {
                !this.bool
                    ? this.areaData.gt.porchHeight(this.addEdit)
                    : this.areaDataDB.gt.porchHeight(this.addEdit);
            } else {
                !this.bool
                    ? this.areaData.gt.porchCompute(this.addEdit)
                    : this.areaDataDB.gt.porchCompute(this.addEdit);
            }
        }
    },

    watch: {
        porch(val) {
            if (val == true) {
                this.loadFromParent();
            }
        }
    }
};
</script>