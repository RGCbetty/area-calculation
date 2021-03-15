<template>
    <v-dialog v-model="deduct" width="550" persistent>
        <v-card>
            <v-card-title class="font-weight-thin">
                Deduction
                <v-spacer></v-spacer>
                <v-select
                    dense
                    outlined
                    hide-details
                    :items="typeList"
                    label="Type"
                    @change="clearDeduct()"
                    v-model="addEdit.type"
                ></v-select>
            </v-card-title>

            <v-card-text>
                <!-- For Garage Shutter -->
                <v-row v-if="addType == 'tter'" no-gutters justify="center">
                    <v-col cols="2">
                        <v-text-field
                            dense
                            outlined
                            label="Grid"
                            @change="comAdd()"
                            v-model="addEdit.base"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="2" class="mx-3">
                        <v-select
                            dense
                            outlined
                            hide-details
                            label="Floor"
                            @change="comAdd()"
                            :items="floorList"
                            v-model="addEdit.floor"
                        ></v-select>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field
                            dense
                            outlined
                            label="Height"
                            @change="comAdd()"
                            v-model="addEdit.height"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <!-- For Wall Opening -->
                <v-row v-if="addType == 'ning'" justify="center">
                    <v-col cols="3">
                        <v-text-field
                            dense
                            outlined
                            label="Length"
                            @change="comAdd()"
                            v-model="addEdit.meter"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3" class="mx-3">
                        <v-text-field
                            dense
                            outlined
                            label="Width"
                            @change="comAdd()"
                            v-model="addEdit.meter2"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-select
                            dense
                            outlined
                            hide-details
                            label="Floor"
                            @change="comAdd()"
                            :items="floorList"
                            v-model="addEdit.floor"
                        ></v-select>
                    </v-col>
                </v-row>

                <!-- For Fukisage Triangle -->
                <v-row v-if="addType == ' Tri'" justify="center">
                    <v-col cols="3">
                        <v-text-field
                            dense
                            outlined
                            label="Triangle"
                            @change="comAdd()"
                            v-model="addEdit.base"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-select
                            dense
                            outlined
                            hide-details
                            label="Floor"
                            @change="getPitch(addEdit.floor)"
                            :items="floorList"
                            v-model="addEdit.floor"
                        ></v-select>
                    </v-col>
                    <v-col cols="3">
                        <v-select
                            dense
                            outlined
                            hide-details
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

                <!-- For Fukisage Rectangle -->
                <template v-if="addType == ' Rec'">
                    <v-row justify="center">
                        <v-col cols="3">
                            <v-text-field
                                dense
                                outlined
                                label="Length"
                                @change="comAdd()"
                                v-model="addEdit.base"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field
                                dense
                                outlined
                                label="Width"
                                @change="comAdd()"
                                v-model="addEdit.width"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-select
                                dense
                                outlined
                                hide-details
                                label="Floor"
                                @change="getPitch(addEdit.floor)"
                                :items="floorList"
                                v-model="addEdit.floor"
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row justify="center" style="margin-top: -35px">
                        <v-col cols="3">
                            <v-select
                                dense
                                outlined
                                hide-details
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
                </template>
            </v-card-text>

            <v-card-actions>
                <v-row no-gutters style="margin-top: -30px">
                    <h4 class="ml-5 font-weight-thin">
                        Area: {{ addEdit.area }}
                    </h4>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="font-weight-bold mr-2"
                        text
                        @click="cancelDialog('GtDeduct')"
                        >Cancel</v-btn
                    >
                    <v-btn
                        class="font-weight-bold"
                        text
                        @click="saveData('GTdeductionData', 'GtDeduct')"
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
    mixins: [BpuMix],
    props: ["deduct", "value", "index", "bool"],
    data() {
        return {
            typeList: [
                "Shutter",
                "Wall Opening",
                "Fukisage Tri",
                "Fukisage Rec"
            ]
        };
    },

    watch: {
        deduct(val) {
            if (val == true) {
                this.loadFromParent();
            }
        }
    }
};
</script>