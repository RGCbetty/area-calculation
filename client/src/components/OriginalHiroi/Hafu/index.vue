<template>
  <v-container fluid class="pa-0">
    <v-card flat>
      <v-row>
        <template v-if="!value">
          <v-col cols="8" class="pa-0">
            <hafu-table
              :headers="HafuHeaders"
              title="Hafu"
              :list="descriptionList"
              :rows="areaData.hafu.items"
              :header="HafuHeader"
              :index="index"
              :selectedRow="selectedRow"
            ></hafu-table>
          </v-col>
          <v-col cols="4" class="pr-1 pt-0">
            <pitch-table
              title="Pitch Table"
              :headers="standardHeaders"
              :rows="areaData.standard.allpitch"
            ></pitch-table>
            <summary-hafu class="pt-4" :hafu="areaData.hafu"></summary-hafu>
            <summary-hana class="pt-4" :hafu="areaData.hafu"></summary-hana>
          </v-col>
          <v-col cols="12" class="pa-0">
            <sub-total
              :headers="subTotalHeader"
              :rows="areaData.hafu.subTotal"
            ></sub-total>
          </v-col>
        </template>
        <template v-else>
          <v-col cols="8" class="pa-0">
            <hafu-table
              :headers="HafuHeaders"
              title="Hafu"
              :list="descriptionList"
              :rows="areaDataDB.hafu.items"
              :bool="value"
              :header="HafuHeader"
              :index="index"
              :selectedRow="selectedRow"
            ></hafu-table>
          </v-col>
          <v-col cols="4" class="pr-1 pt-0">
            <pitch-table
              title="Pitch Table"
              :headers="standardHeaders"
              :rows="areaDataDB.standard.allpitch"
            ></pitch-table>
            <summary-hafu class="pt-4" :hafu="areaDataDB.hafu"></summary-hafu>
            <summary-hana class="pt-4" :hafu="areaDataDB.hafu"></summary-hana>
          </v-col>
          <v-col cols="12" class="pa-0">
            <sub-total
              :headers="subTotalHeader"
              :rows="areaDataDB.hafu.subTotal"
            ></sub-total>
          </v-col>
        </template>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import { myMixin } from './mixins'
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
      this.areaDataDB.hafu = _merge(
        _cloneDeep(this.areaDataDB.hafu),
        newVal.hafu,
      )
      this.areaDataDB.standard = _merge(
        _cloneDeep(this.areaDataDB.standard),
        newVal.standard,
      )
    },
  },

  components: {
    HafuTable: () => import('../Hafu/tables/HafuTable'),
    PitchTable: () => import('../PitchTable'),
    SummaryHana: () => import('./tables/SummaryHanaTable'),
    SummaryHafu: () => import('./tables/SummaryHafuTable'),
    SubTotal: () => import('./tables/SubTotalTable'),
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
