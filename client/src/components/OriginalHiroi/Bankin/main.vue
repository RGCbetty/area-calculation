<template>
  <!-- <v-card flat> -->
  <v-row>
    <template v-if="!value">
      <v-col cols="6" lg="6" md="6" sm="6" class="pa-0">
        <area-table
          :headers="AreaHeader"
          :items="areaData.bankin.area.items"
          :index="index"
          :selectedRow="selectedRow"
        ></area-table>
        <total-table :headers="totalAreaHeaders" />
        <total-table-length
          :items="areaData.bankin.length"
          :headers="totalAmtHeaders"
        />
      </v-col>
      <v-col cols="6" lg="6" md="6" sm="6" class="pr-0 pt-0">
        <pitch-table
          title="Pitch Table"
          :headers="standardHeaders"
          :rows="areaData.standard.allpitch"
        ></pitch-table>

        <v-row>
          <v-col cols="10" lg="6" md="6" sm="6" class="pa-0">
            <BPRG
              title="Balcony"
              :count="areaData.bankin.balcony.count"
              :index="index"
              :selectedRow="selectedRow"
              :items="areaData.bankin.balcony.items"
            />

            <BPRG
              title="Parapet"
              :count="areaData.bankin.parapet.count"
              :index="index"
              :selectedRow="selectedRow"
              :items="areaData.bankin.parapet.items"
            />
            <BPRG
              title="Roof Garden"
              :count="areaData.bankin.roofgarden.count"
              :items="areaData.bankin.roofgarden.items"
              :index="index"
              :selectedRow="selectedRow"
            />
          </v-col>
          <v-col cols="10" lg="6" md="6" sm="6" class="pa-0">
            <BPRG
              :index="index"
              :selectedRow="selectedRow"
              :items="areaData.bankin.balcony.items1"
            />
            <BPRG
              :index="index"
              :selectedRow="selectedRow"
              :items="areaData.bankin.parapet.items1"
            />

            <BPRG
              :items="areaData.bankin.roofgarden.items1"
              :index="index"
              :selectedRow="selectedRow"
            />
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col class="pa-0">
            <total-table-length
              :items="areaData.bankin.length"
              :headers="totalAmtHeaders"
            />
          </v-col>
        </v-row> -->
      </v-col>
    </template>

    <template v-else>
      <v-col cols="6" lg="6" md="6" sm="6" class="pa-0">
        <area-table
          :headers="AreaHeader"
          :items="areaDataDB.bankin.area.items"
          :index="index"
          :selectedRow="selectedRow"
          :bool="value"
        ></area-table>
        <total-table :headers="totalAreaHeaders" :bool="value" />
        <total-table-length
          :items="areaDataDB.bankin.length"
          :headers="totalAmtHeaders"
        />
      </v-col>
      <v-col cols="6" lg="6" md="6" sm="6" class="pr-0 pt-0">
        <pitch-table
          title="Pitch Table"
          :headers="standardHeaders"
          :rows="areaDataDB.standard.allpitch"
        ></pitch-table>

        <v-row>
          <v-col cols="10" lg="6" md="6" sm="6" class="pa-0">
            <BPRG
              title="Balcony"
              :count="areaDataDB.bankin.balcony.count"
              :index="index"
              :selectedRow="selectedRow"
              :items="areaDataDB.bankin.balcony.items"
              :bool="value"
            />
            <BPRG
              title="Parapet"
              :count="areaDataDB.bankin.parapet.count"
              :index="index"
              :selectedRow="selectedRow"
              :items="areaDataDB.bankin.parapet.items"
              :bool="value"
            />
            <BPRG
              title="Roof Garden"
              :count="areaDataDB.bankin.roofgarden.count"
              :items="areaDataDB.bankin.roofgarden.items"
              :index="index"
              :selectedRow="selectedRow"
              :bool="value"
            />
          </v-col>
          <v-col cols="10" lg="6" md="6" sm="6" class="pa-0">
            <BPRG
              :index="index"
              :selectedRow="selectedRow"
              :items="areaDataDB.bankin.balcony.items1"
              :bool="value"
            />
            <BPRG
              :index="index"
              :selectedRow="selectedRow"
              :items="areaDataDB.bankin.parapet.items1"
              :bool="value"
            />

            <BPRG
              :items="areaDataDB.bankin.roofgarden.items1"
              :index="index"
              :selectedRow="selectedRow"
              :bool="value"
            />
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col class="pa-0">
            <total-table-length
              :items="areaData.bankin.length"
              :headers="totalAmtHeaders"
            />
          </v-col>
        </v-row> -->
      </v-col>
    </template>
  </v-row>
  <!-- </v-card> -->
</template>

<script>
import { myMixin } from '../Bankin/mixins/'
import _cloneDeep from 'lodash.clonedeep'
import _merge from 'lodash.merge'
import DTXClient from '../../../assets/dtx-client/dtx-client'
import AreaData from '../../../assets/class/areadata/index'
export default {
  mixins: [myMixin],
  props: {
    index: Number,
    selectedRow: Object,
    value: Boolean,
    desc: Object,
    standard: Object,
  },
  computed: {
    // areaItems(){
    //   return
    // }
  },
  components: {
    AreaTable: () => import('./tables/AreaTable'),
    PitchTable: () => import('../PitchTable'),
    BPRG: () => import('./tables/BalconyTable'),
    BalconyTable: () => import('./tables/BalconyTable'),
    ParapetTable: () => import('./tables/ParapetTable'),
    RoofGardenTable: () => import('./tables/RoofGardenTable'),
    // RoofGarden1Vue: () => import('./RoofGarden1'),
    TotalTable: () => import('./tables/TotalTableArea'),
    TotalTableLength: () => import('./tables/TotalTableLength'),
  },
  created() {},
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
  methods: {},
}
</script>

<style scoped>
* {
  text-transform: none !important;
}
</style>
