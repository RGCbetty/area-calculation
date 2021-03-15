<template>
    <v-dialog v-model="add" width="600" persistent>
        <v-card>
            <v-card-title class="display-1 font-weight-thin">
                Additional
                <v-spacer></v-spacer>
                <v-col cols="8">
                    <v-select
                        dense
                        outlined
                        hide-details
                        :items="addList"
                        @change="clearDeduct()"
                        label="Select Type"
                        v-model="addEdit.type"
                    ></v-select>
                </v-col>
            </v-card-title>

            <v-card-text>
                <!-- For Open Roof -->
                <template v-if="this.addType == 'Roof'">
                    <v-row no-gutters justify="center">
                        <v-col cols="2">
                            <v-text-field
                                dense
                                outlined
                                label="Triangle"
                                @change="comAdd()"
                                v-model="addEdit.base"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3" class="mx-2">
                            <v-select
                                dense
                                outlined
                                label="Floor"
                                @change="getPitch(addEdit.floor)"
                                :items="floorList"
                                v-model="addEdit.floor"
                            ></v-select>
                        </v-col>
                        <v-col cols="2">
                            <v-select
                                dense
                                outlined
                                label="Pitch"
                                @change="comAdd()"
                                :items="pitchList"
                                v-model="addEdit.pitch"
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row
                        no-gutters
                        justify="center"
                        style="margin-top: -15px"
                    >
                        <v-col cols="3" class="mx-2">
                            <v-select
                                dense
                                outlined
                                label="Quantity"
                                @change="comAdd()"
                                :items="quantityList"
                                v-model="addEdit.quantity"
                            ></v-select>
                        </v-col>
                        <v-col cols="3" style="margin-top: -20px">
                            <v-switch
                                label="With Deduction"
                                @change="comAdd()"
                                v-model="addEdit.withDeduct"
                            ></v-switch>
                        </v-col>
                    </v-row>
                </template>

                <v-row
                    no-gutters
                    style="margin-top: -15px"
                    justify="center"
                    v-if="addEdit.withDeduct"
                >
                    <v-col cols="2" class="mr-2 ml-3">
                        <v-text-field
                            dense
                            outlined
                            label="Triangle"
                            @change="comAdd()"
                            v-model="addEdit.baseDeduct"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-select
                            dense
                            outlined
                            label="Quantity"
                            @change="comAdd()"
                            :items="quantityList"
                            v-model="addEdit.quantityDeduct"
                        ></v-select>
                    </v-col>
                </v-row>

                <!-- For Fukiage -->
                <v-row
                    no-gutters
                    style="margin-top: -15px"
                    justify="center"
                    v-if="this.addType == 'ngle'"
                >
                    <v-col cols="2">
                        <v-text-field
                            dense
                            outlined
                            label="Length"
                            @change="comAdd()"
                            v-model="addEdit.base"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="2" class="mx-2">
                        <v-text-field
                            dense
                            outlined
                            label="Width"
                            @change="comAdd()"
                            v-model="addEdit.width"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-select
                            dense
                            outlined
                            label="Floor"
                            @change="getPitch(addEdit.floor)"
                            :items="floorList"
                            v-model="addEdit.floor"
                        ></v-select>
                    </v-col>
                    <v-col cols="2" class="mx-2">
                        <v-select
                            dense
                            outlined
                            label="Pitch"
                            @change="comAdd()"
                            :items="pitchList"
                            v-model="addEdit.pitch"
                        ></v-select>
                    </v-col>
                    <v-col cols="3">
                        <v-select
                            dense
                            outlined
                            label="Quantity"
                            @change="comAdd()"
                            :items="quantityList"
                            v-model="addEdit.quantity"
                        ></v-select>
                    </v-col>
                </v-row>

                <!-- For Parapet, Sodekabe, and Roof Garden -->
                <v-row
                    no-gutters
                    justify="center"
                    v-if="
                        this.addType == 'apet' ||
                        this.addType == 'kabe' ||
                        this.addType == 'rden'
                    "
                >
                    <v-col cols="2">
                        <v-text-field
                            dense
                            outlined
                            label="Grids"
                            @change="comAdd()"
                            v-model="addEdit.base"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3" class="mx-2">
                        <v-select
                            dense
                            outlined
                            label="Height"
                            @change="comAdd()"
                            :items="heightList"
                            v-model="addEdit.height"
                        ></v-select>
                    </v-col>
                    <v-col cols="2">
                        <v-select
                            dense
                            outlined
                            label="Floor"
                            @change="comAdd()"
                            :items="floorList"
                            v-model="addEdit.floor"
                        ></v-select>
                    </v-col>
                </v-row>

                <!-- For H-Wall -->
                <v-row
                    no-gutters
                    justify="center"
                    v-if="this.addType == 'Wall'"
                >
                    <v-col cols="2" class="mr-2">
                        <v-text-field
                            dense
                            outlined
                            label="Grids"
                            @change="comAdd()"
                            v-model="addEdit.base"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-select
                            dense
                            outlined
                            label="Floor"
                            @change="comAdd()"
                            :items="floorList"
                            v-model="addEdit.floor"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-row no-gutters style="margin-top: -30px">
                    <h4 class="ml-5 font-weight-thin">
                        Area: {{ addEdit.area }}
                    </h4>
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        class="font-weight-bold mr-2"
                        @click="cancelDialog('GtAdd')"
                        >Cancel</v-btn
                    >
                    <v-btn
                        text
                        class="font-weight-bold"
                        @click="saveData('GTadditionalData', 'GtAdd')"
                        >Save</v-btn
                    >
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { BpuMix } from "@/components/OriginalHiroi/GaibuTile/mixins/bpu";
export default {
    props: ["add", "value", "index", "bool"],
    mixins: [BpuMix],
    data() {
        return {
            addList: [
                "Open Roof",
                "Fukiage Rectangle",
                "Parapet",
                "Sodekabe",
                "Roof Garden",
                "Roof Garden H-Wall",
                "Garage H-Wall"
            ]
        };
    },

    computed: {
        heightList() {
            if (this.addEdit.type == "Parapet") {
                return [0.247, 0.262, 0.274, 0.279, 0.46, 0.41, 0.605];
            } else if (this.addEdit.type == "Sodekabe") {
                return [1.7, 1.9, 2.0];
            } else {
                return [2.4];
            }
        }
    },

    watch: {
        add(val) {
            if (val == true) {
                this.loadFromParent();
            }
        }
    }
};
</script>

<style scoped>
* {
    text-transform: none !important;
}
</style>