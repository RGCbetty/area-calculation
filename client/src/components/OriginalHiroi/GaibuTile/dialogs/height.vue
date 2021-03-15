<template>
    <v-dialog v-model="height" width="250">
        <v-card>
            <v-card-text class="pt-2" max-height="20">
                <v-text-field dense v-model="newHeight"></v-text-field>
            </v-card-text>

            <v-row no-gutters justify="end" style="margin-top: -20px">
                <v-btn text class="font-weight-thin" @click="saveNewHeight()"
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
    props: ["height", "value", "index", "part", "bool"],
    data() {
        return {
            newHeight: 0,
            editHeightPart: "",
            heightIndex: -1
        };
    },

    created() {},

    methods: {
        saveNewHeight() {
            if (this.editHeightPart == "eaves") {
                if (!this.bool) {
                    this.areaData.gt.belowEavesData[
                        this.heightIndex
                    ].height = this.newHeight;
                } else {
                    this.areaDataDB.gt.belowEavesData[
                        this.heightIndex
                    ].height = this.newHeight;
                }
                this.$emit("recompute-eaves", this.heightIndex);
            } else {
                if (!this.bool) {
                    this.areaData.gt.balconyData[this.heightIndex][
                        this.editHeightPart
                    ] = this.newHeight;
                } else {
                    this.areaDataDB.gt.balconyData[this.heightIndex][
                        this.editHeightPart
                    ] = this.newHeight;
                }

                this.$emit("recompute-balcony", this.heightIndex);
            }
            // this.heightDialog = false
            this.$emit("closeDialog", false, "Height");
            this.newHeight = 0;
        }
    },

    watch: {
        value(val) {
            this.newHeight = val;
        },

        index(val) {
            this.heightIndex = val;
        },

        part(val) {
            this.editHeightPart = val;
        }
    }
};
</script>