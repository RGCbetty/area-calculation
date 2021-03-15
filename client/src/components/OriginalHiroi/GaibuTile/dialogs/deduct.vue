<template>
    <v-dialog v-model="deduction" width="700" persistent>
        <v-card>
            <v-card-title class="font-weight-thin">
                <v-row no-gutters>
                    New Deduction
                    <v-spacer></v-spacer>
                    <v-col cols="4" class="mx-2">
                        <v-select
                            outlined
                            dense
                            label="Shape"
                            @change="computeShape()"
                            :items="shapes"
                            v-model="addEdit.shape"
                        ></v-select>
                    </v-col>
                    <v-col cols="4">
                        <v-select
                            outlined
                            dense
                            label="Balcony"
                            :items="deductList"
                            @change="updatePitch(addEdit.fl)"
                            v-model="addEdit.fl"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-card-title>

            <v-card-text>
                <v-row
                    no-gutters
                    v-if="addEdit.shape == 'Triangle'"
                    style="margin-top: -25px"
                    class="mx-2"
                >
                    <h1 class="mr-2 mt-2">(</h1>
                    <v-col cols="4">
                        <v-text-field
                            outlined
                            dense
                            @change="computeShape()"
                            label="Height"
                            v-model="addEdit.h1"
                        ></v-text-field>
                    </v-col>
                    <h1 class="mx-2 mt-2">*</h1>
                    <v-col cols="4">
                        <v-text-field
                            outlined
                            dense
                            @change="computeShape()"
                            label="Base"
                            v-model="addEdit.base"
                        ></v-text-field>
                    </v-col>
                    <h1 class="mx-2 mt-2">)</h1>
                    <h1 class="mr-2 mt-2">*</h1>
                    <v-col>
                        <v-select
                            dense
                            outlined
                            @change="computeShape()"
                            :items="pitchList"
                            v-model="addEdit.pitch"
                            label="Pitch"
                        ></v-select>
                    </v-col>
                </v-row>

                <v-row
                    no-gutters
                    v-if="addEdit.shape == 'Rectangle'"
                    style="margin-top: -25px"
                    class="mx-2"
                >
                    <h1 class="mr-2 mt-2">(</h1>
                    <v-col cols="4">
                        <v-text-field
                            outlined
                            dense
                            @change="computeShape()"
                            label="Length"
                            v-model="addEdit.h1"
                        ></v-text-field>
                    </v-col>
                    <h1 class="mx-2 mt-2">*</h1>
                    <v-col cols="4">
                        <v-text-field
                            outlined
                            dense
                            @change="computeShape()"
                            label="Width"
                            v-model="addEdit.base"
                        ></v-text-field>
                    </v-col>
                    <h1 class="mx-2 mt-2">)</h1>
                    <h1 class="mr-2 mt-2">*</h1>
                    <v-col>
                        <v-select
                            dense
                            outlined
                            @change="computeShape()"
                            :items="pitchList"
                            v-model="addEdit.pitch"
                            label="Pitch"
                        ></v-select>
                    </v-col>
                </v-row>

                <v-row
                    no-gutters
                    v-if="addEdit.shape == 'Trapezoid'"
                    style="margin-top: -25px"
                    class="mx-2"
                >
                    <h1 class="mt-2">[</h1>
                    <h1 class="mx-1 mt-2">(</h1>
                    <v-col cols="3">
                        <v-text-field
                            outlined
                            @change="computeShape()"
                            dense
                            label="Height 1"
                            v-model="addEdit.h1"
                        ></v-text-field>
                    </v-col>
                    <h1 class="mx-1 mt-2">*</h1>
                    <v-col cols="3">
                        <v-text-field
                            outlined
                            @change="computeShape()"
                            dense
                            label="Height 2"
                            v-model="addEdit.h2"
                        ></v-text-field>
                    </v-col>
                    <h1 class="mx-1 mt-2">)</h1>
                    <h1 class="mr-1 mt-2">*</h1>
                    <v-col>
                        <v-text-field
                            outlined
                            @change="computeShape()"
                            dense
                            label="Base"
                            v-model="addEdit.base"
                        ></v-text-field>
                    </v-col>
                    <h1 class="ml-1 mt-2">]</h1>
                    <h1 class="mx-1 mt-2">*</h1>
                    <v-col>
                        <v-select
                            dense
                            outlined
                            @change="computeShape()"
                            :items="pitchList"
                            v-model="addEdit.pitch"
                            label="Pitch"
                        ></v-select>
                    </v-col>
                </v-row>

                <v-row
                    no-gutters
                    justify="center"
                    v-if="addEdit.shape"
                    style="margin-top: -20px"
                >
                    <v-col cols="3" class="mx-3">
                        <v-select
                            dense
                            hide-details
                            outlined
                            :items="balconyMaterialChoices"
                            v-model="addEdit.material"
                        ></v-select>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field
                            dense
                            outlined
                            label="Area"
                            v-model="addEdit.area"
                            readonly
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-row no-gutters justify="end" style="margin-top: -20px">
                <v-btn
                    text
                    class="font-weight-bold mr-2"
                    @click="cancelDialog('deduction')"
                    >Cancel</v-btn
                >
                <v-btn text class="font-weight-bold" @click="saveDeduction()"
                    >Save</v-btn
                >
            </v-row>
        </v-card>
    </v-dialog>
</template>

<script>
import { BpuMix } from "@/components/OriginalHiroi/GaibuTile/mixins/bpu";
export default {
    mixins: [BpuMix],
    props: ["deduction", "value", "index", "bool"],
    data() {
        return {
            shapes: ["Triangle", "Rectangle", "Trapezoid"]
        };
    },

    computed: {
        deductList() {
            if (!this.bool) {
                return this.areaData.gt.balconyData.map(
                    (o) => `${o.floorLevel}/${o.balconyName}/OUTSIDE`
                );
            } else {
                return this.areaDataDB.gt.balconyData.map(
                    (o) => `${o.floorLevel}/${o.balconyName}/OUTSIDE`
                );
            }
        }
    },

    methods: {
        computeShape() {
            if (!this.bool) {
                this.areaData.gt.computeDeduction(this.addEdit);
            } else {
                this.areaDataDB.gt.computeDeduction(this.addEdit);
            }
        },

        updatePitch(item) {
            this.updatePitchList(item);
            let mat = !this.bool
                ? this.areaData.gt.summary.balconyOutSum.filter(
                      (o) => o.specs == item
                  )
                : this.areaDataDB.gt.summary.balconyOutSum.filter(
                      (o) => o.specs == item
                  );
            this.addEdit.material = mat[0].material;
            this.computeShape();
        },

        saveDeduction() {
            this.saveData("deductionData", "deduction");
            this.pitchList = [];
        }
    },

    watch: {
        deduction(val) {
            if (val == true) {
                this.loadFromParent();

                if (this.editIndex != -1) {
                    this.updatePitch(this.value.fl);
                }
            }
        }
    }
};
</script>