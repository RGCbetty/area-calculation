<template>
  <transition name="fade">
    <v-layout wrap>
      <v-flex xs12>
        <v-tabs fixed-tabs background-color="primary" dark v-model="tabs">
          <v-tab
            v-for="(tab, tab_i) in tabsHeader"
            :key="tab_i"
            v-text="tab.name"
          />
        </v-tabs>

        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <gravity-table
              :items="bwList[value][0]"
              :download="items.gravity.url"
              :label="items.gravity.label"
            />
          </v-tab-item>
          <v-tab-item>
            <rigidity-output
              :selected="value"
              :download="items.rigidity.url"
              :label="items.rigidity.label"
            />
          </v-tab-item>
          <v-tab-item>
            <eccentricity-table :items="bwList[value][3]" />
          </v-tab-item>

          <v-tab-item>
            <bearing-wall
              :items="bearingItems"
              v-model="dtx.bearingWall.bearingwall.floors"
            >
            </bearing-wall>

            <v-btn @click="download()">Download</v-btn>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
    </v-layout>
  </transition>
</template>

<script>
import axios from "axios";
import fileSaver from "file-saver";

export default {
  props: {
    value: Number,
    bearingItems: Array,
    items: {
      type: Object,
      default: () => {
        return {
          gravity: { url: "", label: "" },
          rigidity: { url: "", label: "" },
        };
      },
    },
  },

  components: {
    GravityTable: () => import("./GravityTable"),
    EccentricityTable: () => import("./EccentricityTable"),
    RigidityOutput: () => import("./RigidityOutput"),
    BearingWall: () => import("./PlanApplication/BearingWall"),
  },

  data: () => ({
    tabs: 0,
    tabsHeader: [
      { name: "GRAVITY COMPUTATION" },
      { name: "RIGIDITY COMPUTATION" },
      { name: "ECCENTRICITY RATIO" },
      { name: "BEARING WALL" },
    ],
  }),

  methods: {
    download() {
      let value = {
        values: this.bearingItems,
        filename: `${this.dtx.planInfo.memo1}-${this.dtx.planInfo.memo2}_BearingWall`,
        folderName: this.dtx.planInfo.memo1,
      };

      axios.post("http://hrdapps68/dtx/api/csvapi/saveFile", value).then(() => {
        fileSaver.saveAs(
          `http://hrdapps68/dtx/api/download/${value.folderName}/${value.filename}.csv`,
          `${value.filename}.csv`
        );
      });
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>