<template>
    <v-col cols="12">
        <v-row no-gutters dense>
            <v-col cols="2">
                <v-text-field
                    class="py-1 pt-3"
                    color="success"
                    hide-details
                    dense
                    outlined
                    v-model="plan_info.plan_code"
                    label="Plan Code"
                    readonly
                ></v-text-field>
            </v-col>

            <v-col cols="2">
                <v-text-field
                    class="py-1 pt-3"
                    color="success"
                    v-model="plan_info.kanabakari"
                    dense
                    outlined
                    label="Kanabakari"
                    readonly
                    hide-details
                ></v-text-field>
            </v-col>

            <v-col cols="2">
                <v-text-field
                    class="py-1 pt-3"
                    color="success"
                    hide-details
                    dense
                    outlined
                    v-model="plan_info.data_user"
                    label="Data User"
                    readonly
                ></v-text-field>
            </v-col>

            <v-col cols="2">
                <v-text-field
                    class="py-1 pt-3"
                    color="success"
                    v-model="plan_info.houseType"
                    dense
                    outlined
                    label="House Type"
                    readonly
                    hide-details
                ></v-text-field>
            </v-col>

            <v-col cols="2">
                <v-text-field
                    class="py-1 pt-3"
                    color="success"
                    v-model="plan_info.employee_name"
                    dense
                    outlined
                    label="Estimator"
                    readonly
                    hide-details
                ></v-text-field>
            </v-col>

            <v-col cols="2">
                <v-text-field
                    class="py-1 pt-3"
                    color="success"
                    v-model="Date_today"
                    dense
                    outlined
                    label="DATE CHECKED"
                    readonly
                    hide-details
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row no-gutters dense>
            <v-col cols="2">
                <v-text-field
                    class="py-1 pt-3"
                    color="success"
                    hide-details
                    dense
                    outlined
                    v-model="plan_info.plan_no"
                    label="Plan No."
                    readonly
                ></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-text-field
                    class="py-1 pt-3"
                    color="success"
                    v-model="plan_info.module_no"
                    dense
                    outlined
                    label="Module No."
                    readonly
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-text-field
                    class="py-1 pt-3"
                    color="success"
                    hide-details
                    dense
                    outlined
                    v-model="plan_info.tile_type"
                    label="Tile Type"
                    readonly
                ></v-text-field>
            </v-col>

            <v-col cols="2">
                <v-text-field
                    class="py-1 pt-3"
                    color="success"
                    v-model="plan_info.fireproof"
                    dense
                    outlined
                    label="Fireproof Type"
                    readonly
                    hide-details
                ></v-text-field>
            </v-col>

            <v-col cols="2">
                <v-text-field
                    class="py-1 pt-3"
                    color="success"
                    v-model="plan_info.employee_name"
                    dense
                    outlined
                    label="F-Checker"
                    readonly
                    hide-details
                ></v-text-field>
            </v-col>

            <v-col cols="2">
                <v-text-field
                    class="py-1 pt-3"
                    color="success"
                    v-model="plan_info.roof_material"
                    dense
                    outlined
                    label="Roof Material"
                    readonly
                    hide-details
                ></v-text-field>
            </v-col>
        </v-row>
    </v-col>
</template>
<script>
import moment from "moment";
export default {
    props: {
        plan_info: Object
    },
    computed: {
        Date_today() {
            return moment().format("YYYY/MM/DD");
        }
    }
};
</script>