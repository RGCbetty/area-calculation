<template>
  <v-container fluid class="pa-0">
    <v-card flat>
      <v-row>
        <template v-if="!value">
          <v-col cols="8" class="pa-0">
            <bankin-table
              :index="index"
              :selectedRow="selectedRow"
              :items="areaData.bankin.items"
            ></bankin-table>
          </v-col>
          <v-col cols="4" class="pr-1 pt-0">
            <pitch-table
              title="Pitch Table"
              :headers="standardHeaders"
              :rows="areaData.standard.allpitch"
            ></pitch-table>
          </v-col>
        </template>
        <template v-else>
          <v-col cols="8" class="pa-0">
            <bankin-table
              :index="index"
              :selectedRow="selectedRow"
              :items="areaDataDB.bankin.items"
              :bool="value"
            ></bankin-table>
          </v-col>
          <v-col cols="4" class="pr-1 pt-0">
            <pitch-table
              title="Pitch Table"
              :headers="standardHeaders"
              :rows="areaDataDB.standard.allpitch"
            ></pitch-table>
          </v-col>
        </template>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { myMixin } from '../Bankin/mixins/'
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

  components: {
    BankinTable: () => import('./tables/BankinTable'),
    PitchTable: () => import('../PitchTable'),
  },
  watch: {
    desc(newVal) {
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
  computed: {},
  created() {},

  methods: {},
}
</script>

<style scoped>
* {
  text-transform: none !important;
}
</style>
