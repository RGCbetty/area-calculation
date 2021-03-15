<template>
  <v-container fluid class="pa-0">
    <v-card flat>
      <v-row>
        <template v-if="!value">
          <v-col cols="7" class="pa-0 mx-auto">
            <pitch-table
              title="Pitch Table"
              :headers="standardHeaders"
              :items="areaData.bankin.youjonet"
              :rows="areaData.standard.allpitch"
            ></pitch-table>
          </v-col>
          <v-col cols="6">
            <youjonet-table
              :index="index"
              :selectedRow="selectedRow"
              :items="areaData.bankin.youjonet.items"
            ></youjonet-table>
          </v-col>
          <v-col cols="6">
            <kataganare-parapet
              :index="index"
              :items="areaData.bankin.youjonet.kataganareP"
              :selectedRow="selectedRow"
              :value="value"
            ></kataganare-parapet>
          </v-col>
          <v-col cols="6">
            <computation-table
              :index="index"
              :youjonet="areaData.bankin.youjonet"
              :selectedRow="selectedRow"
              :value="value"
            ></computation-table>
          </v-col>
          <v-col cols="6">
            <kataganare-with-roof
              :index="index"
              :items="areaData.bankin.youjonet.kataganareR"
              :selectedRow="selectedRow"
              :value="value"
            ></kataganare-with-roof>
          </v-col>
        </template>
        <template v-else>
          <v-col cols="7" class="pa-0 mx-auto">
            <pitch-table
              title="Pitch Table"
              :headers="standardHeaders"
              :rows="areaDataDB.standard.allpitch"
            ></pitch-table>
          </v-col>
          <v-col cols="6">
            <youjonet-table
              :index="index"
              :items="areaDataDB.bankin.youjonet.items"
              :selectedRow="selectedRow"
              :value="value"
            ></youjonet-table>
          </v-col>
          <v-col cols="6">
            <kataganare-parapet
              :index="index"
              :items="areaDataDB.bankin.youjonet.kataganareP"
              :selectedRow="selectedRow"
              :value="value"
            ></kataganare-parapet>
          </v-col>
          <v-col cols="6">
            <computation-table
              :index="index"
              :youjonet="areaDataDB.bankin.youjonet"
              :selectedRow="selectedRow"
              :value="value"
            ></computation-table>
          </v-col>
          <v-col cols="6">
            <kataganare-with-roof
              :index="index"
              :items="areaDataDB.bankin.youjonet.kataganareR"
              :selectedRow="selectedRow"
              :value="value"
            ></kataganare-with-roof>
          </v-col>
        </template>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { myMixin } from '../Bankin/mixins/index'
import AreaData from '../../../assets/class/areadata/index'
import _cloneDeep from 'lodash.clonedeep'
import _merge from 'lodash.merge'
export default {
  mixins: [myMixin],
  props: {
    index: Number,
    selectedRow: Object,
    value: Boolean,
    desc: Object,
    standard: Object,
  },
  watch: {
    desc(newVal) {
      this.RESET_AREA_CALCULATION_DB({
        area: new AreaData(),
      })
      this.areaDataDB.bankin = _merge(
        _cloneDeep(this.areaDataDB.bankin),
        newVal.bankin,
      )
      this.areaDataDB.balcony = _merge(
        _cloneDeep(this.areaDataDB.balcony),
        newVal.balcony,
      )
      this.areaDataDB.standard = _merge(
        _cloneDeep(this.areaDataDB.standard),
        newVal.standard,
      )
    },
  },

  components: {
    YoujonetTable: () => import('./tables/YoujonetTable'),
    KataganareParapet: () => import('./tables/KataganareTableP'),
    KataganareWithRoof: () => import('./tables/KataganareTableR'),
    ComputationTable: () => import('./tables/ComputationTable'),
    PitchTable: () => import('../PitchTable/index'),
  },
  created() {},

  methods: {},
}
</script>

<style scoped>
* {
  text-transform: none !important;
}
</style>
