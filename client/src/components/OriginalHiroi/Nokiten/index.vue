<template>
  <v-container fluid class="pa-0">
    <v-card flat>
      <v-tabs fixed-tabs dark v-model="tab" class="font-weight-thin">
        <v-tab class="font-weight-thin" v-for="item in items" :key="item.tab">
          {{ item.tab }}
        </v-tab>
        <v-tabs-slider color="green"></v-tabs-slider>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item :transition="false" :reverse-transition="false">
          <v-card flat>
            <v-card-text>
              <template v-if="!value">
                <nokiten-table
                  keep-alive
                  :index="index"
                  :nokiten="areaData.nokiten"
                  :value="value"
                  :standard="areaData.standard"
                >
                </nokiten-table>
              </template>
              <template v-else>
                <nokiten-table
                  keep-alive
                  :index="index"
                  :nokiten="areaDataDB.nokiten"
                  :value="value"
                  :standard="areaDataDB.standard"
                >
                </nokiten-table>
              </template>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item :transition="false" :reverse-transition="false">
          <v-card flat>
            <v-card-text>
              <template v-if="!value">
                <dehairy-table
                  keep-alive
                  :index="index"
                  :nokiten="areaData.nokitenD"
                  :value="value"
                  :standard="areaData.standard"
                ></dehairy-table>
              </template>
              <template v-else>
                <dehairy-table
                  keep-alive
                  :index="index"
                  :nokiten="areaDataDB.nokitenD"
                  :value="value"
                  :standard="areaDataDB.standard"
                ></dehairy-table>
              </template>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import _cloneDeep from "lodash.clonedeep";
import _merge from "lodash.merge";
export default {
  props: {
    index: Number,
    selectedRow: Object,
    desc: Object,
    value: Boolean,
  },
  watch: {
    desc(newVal) {
      this.areaDataDB.nokiten = _merge(
        _cloneDeep(this.areaDataDB.nokiten),
        newVal.nokiten
      );
      this.areaDataDB.nokitenD = _merge(
        _cloneDeep(this.areaDataDB.nokitenD),
        newVal.nokitenD
      );
      this.areaDataDB.standard = _merge(
        _cloneDeep(this.areaDataDB.standard),
        newVal.standard
      );
    },
  },
  components: {
    nokitenTable: () => import("./table/Nokiten"),
    dehairyTable: () => import("./table/Dehairy"),
  },
  data() {
    return {
      tab: null,
      items: [
        { tab: "Nokiten", component: "./Nokiten" },
        { tab: "Nokiten Dehairy", component: "./Nokiten" },
      ],
    };
  },

  created() {},

  methods: {},
};
</script>

<style scoped>
* {
  text-transform: none !important;
}
</style>
