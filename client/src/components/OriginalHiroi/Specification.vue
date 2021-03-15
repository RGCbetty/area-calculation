<template>
  <v-col cols="12" :class="paddingSettings">
    <v-row no-gutters dense>
      <v-col cols="2">
        <v-text-field
          class="py-1 pt-3"
          color="success"
          hide-details
          dense
          outlined
          v-model="dtx.planInfo.memo1"
          label="Plan Code"
          :readonly="!paddingSettings"
        ></v-text-field>
      </v-col>

      <v-col cols="2">
        <v-text-field
          class="py-1 pt-3"
          color="success"
          v-model="kanabakari"
          dense
          outlined
          label="Kanabakari"
          :readonly="!paddingSettings"
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
          v-model="DataUser"
          label="Data User"
          :readonly="!paddingSettings"
        ></v-text-field>
      </v-col>

      <v-col cols="2">
        <v-text-field
          class="py-1 pt-3"
          color="success"
          v-model="houseType"
          dense
          outlined
          label="House Type"
          :readonly="!paddingSettings"
          hide-details
        ></v-text-field>
      </v-col>

      <v-col cols="2">
        <v-text-field
          class="py-1 pt-3"
          color="success"
          v-model="userName"
          dense
          outlined
          label="Estimator"
          :readonly="!paddingSettings"
          hide-details
        ></v-text-field>
      </v-col>

      <v-col cols="2">
        <v-text-field
          class="py-1 pt-3"
          color="success"
          v-model="dateToday"
          dense
          outlined
          label="DATE CHECKED"
          :readonly="!paddingSettings"
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
          v-model="dtx.planInfo.memo2"
          label="Plan No."
          :readonly="!paddingSettings"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          class="py-1 pt-3"
          color="success"
          v-model="dtx.houseStructure.gridModule"
          dense
          outlined
          label="Module No."
          :readonly="!paddingSettings"
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
          v-model="TileType"
          label="Tile Type"
          :readonly="!paddingSettings"
        ></v-text-field>
      </v-col>

      <v-col cols="2">
        <v-text-field
          class="py-1 pt-3"
          color="success"
          v-model="fireproof"
          dense
          outlined
          label="Fireproof Type"
          :readonly="!paddingSettings"
          hide-details
        ></v-text-field>
      </v-col>

      <v-col cols="2">
        <v-text-field
          class="py-1 pt-3"
          color="success"
          v-model="userName"
          dense
          outlined
          label="F-Checker"
          :readonly="!paddingSettings"
          hide-details
        ></v-text-field>
      </v-col>

      <v-col cols="2" v-if="!paddingSettings">
        <v-text-field
          class="py-1 pt-3"
          color="success"
          v-model="roofmaterial"
          dense
          outlined
          label="Roof Material"
          readonly
          hide-details
        ></v-text-field>
      </v-col>
      <slot name="roof"></slot>
    </v-row>
  </v-col>
</template>

<script>
import Moment from 'moment'
export default {
  props: ['kanabakari', 'houseType', 'fireproof', 'roofmaterial', 'paddingSettings'],
  data() {
    return {
      DataUser: 'Hacchu',
      TileType: 'TC',
    }
  },
 
  watch: {
    planInfo(newVal) {
      this.areaData.planInfo = newVal
    },
  },
  computed: {
    userName() {
      return this.$store.state.users.user.name.toLowerCase()
    },
    dateToday() {
      return Moment().format('YYYY/MM/DD')
    },
    planCode(){
      return this.dtx.planInfo.memo1 ? this.dtx.planInfo.memo1 : this.planCode
    },
    planNum(){
      return this.dtx.planInfo.memo2 ? this.dtx.planInfo.memo2 : this.planNo
    },
    moduleNo(){
      return this.dtx.houseStructure.gridModule ? this.dtx.houseStructure.gridModule : this.moduleNo
    },
    planInfo() {
      return {
        plan_code: this.dtx.planInfo.memo1,
        plan_no: this.dtx.planInfo.memo2,
        kanabakari: this.kanabakari,
        data_user: this.DataUser,
        houseType: this.houseType,
        employee_name: this.userName,
        employee_code: this.$store.state.users.user.employeeCode,
        date: this.dateToday,
        module_no: this.dtx.houseStructure.gridModule,
        tile_type: this.TileType,
        fireproof: this.fireproof,
        roof_material: this.roofmaterial,
        created_date: Moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_date: Moment().format('YYYY-MM-DD HH:mm:ss'),
        deleted_date: null,
        checked_date: null,
      }
    },
  },
}
</script>
