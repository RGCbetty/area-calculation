<template>
  <v-dialog
    scrollable
    v-model="dialog"
    fullscreen
    :max-width="selectedComputation.width"
    hide-overlay
    transition="scale-transition"
  >
    <v-card min-width="100%">
      <v-card-title
        class="headline font-weight-thin"
        v-text="selectedComputation.title"
      />
      <v-card-text class="px-7">
        <component
          :is="selectedComputation.template"
          :index="index"
          :selectedRow="selected"
          :desc="desc"
          :value="value"
        />
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn color="green darken-1" dark @click="close()" v-text="'Ok'" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Sumimune from "./Sumimune";
import Honmune from "./Honmune";
import Nokiten from "./Nokiten";
import GaibuTile from "./GaibuTile";
import Bankin from "./Bankin";
import Youjonet from "./Youjonet";
import BPRG from "./Bankin/main";
import Hafu from "./Hafu";
import Yane from "./Yane";
import AreaCalculationDB from "../../assets/class/db/areacalculation";
// import Area from './Bankin/Area'

export default {
  // props: ["value", "selected", "index"],
  components: {
    // Sumimune: () => import('./Sumimune'),
    // Honmune: () => import('./Honmune'),
    // Nokiten: () => import('./Nokiten'),
    // GaibuTile: () => import('./GaibuTile'),
    // Bankin: () => import('./Bankin'),
    // Youjonet: () => import('./Youjonet'),
    // BPRG: () => import('./Bankin/main'),
    // Hafu: () => import('./Hafu'),
    // Yane: () => import('./Yane'),
  },
  props: {
    items: Array,
    value: Boolean,
    selected: Object,
    index: Number,
    docID: Array,
    selectedIndex: Number,
  },
  watch: {
    dialog(val) {
      if (!val) {
        // this.close()
        this.$emit("close");
      }
    },
    // selectedComputation(newVal, oldVal) {
    //   console.log(newVal)
    //   console.log(oldVal)
    // },

    async value(val) {
      this.dialog = val;
      // console.error(this.areaDataDB.bankin.area.computeRow())
      if (val) {
        if (this.selected.id in this.componentList) {
          this.selectedComputation = this.componentList[this.selected.id];
          let title = this.selectedComputation.title.toLowerCase();
          let res = await AreaCalculationDB.getItems(
            this.docID[this.selectedIndex],
            title
          );
          this.desc = res.data;
        } else {
          // this.close()
          this.$emit("close");
        }
      }
    },
  },

  created() {},

  data() {
    return {
      desc: {},
      standard: {},
      dialog: false,
      selectedComputation: {
        title: "",
        template: {},
        width: 0,
      },

      componentList: {
        ["90660"]: {
          title: "Honmune",
          template: Honmune,
          width: "100%",
        },

        ["90670"]: {
          title: "Sumimune",
          template: Sumimune,
          width: "100%",
        },

        ["990090"]: {
          title: "GT",
          template: GaibuTile,
          width: "100%",
        },

        ["990100"]: {
          title: "GT",
          template: GaibuTile,
          width: "100%",
        },

        ["100011"]: {
          title: "GT",
          template: GaibuTile,
          width: "100%",
        },

        ["100012"]: {
          title: "GT",
          template: GaibuTile,
          width: "100%",
        },

        ["990214"]: {
          title: "Nokiten",
          template: Nokiten,
          width: "100%",
        },

        ["70620"]: {
          title: "Bankin",
          template: Bankin,
          width: "100%",
        },

        ["70625"]: {
          title: "Bankin",
          template: Bankin,
          width: "100%",
        },

        ["70730"]: {
          title: "Bankin",
          child_title: "Youjonet",
          template: Youjonet,
          width: "100%",
        },
        ["70480"]: {
          title: "Bankin",
          template: BPRG,
          width: "100%",
        },
        ["70481"]: {
          title: "Bankin",
          template: BPRG,
          width: "100%",
        },
        ["70482"]: {
          title: "Bankin",
          template: BPRG,
          width: "100%",
        },
        ["70470"]: {
          title: "Bankin",
          template: BPRG,
          width: "100%",
        },
        ["70471"]: {
          title: "Bankin",
          template: BPRG,
          width: "100%",
        },
        ["70472"]: {
          title: "Bankin",
          template: BPRG,
          width: "100%",
        },
        ["70460"]: {
          title: "Bankin",
          template: BPRG,
          width: "100%",
        },
        ["70461"]: {
          title: "Bankin",
          template: BPRG,
          width: "100%",
        },
        ["70462"]: {
          title: "Bankin",
          template: BPRG,
          width: "100%",
        },
        ["100250"]: {
          title: "Hafu",
          template: Hafu,
          width: "100%",
        },
        ["990150"]: {
          title: "Yane",
          template: Yane,
          width: "100%",
        },
        ["990160"]: {
          title: "Yane",
          template: Yane,
          width: "100%",
        },
        ["990170"]: {
          title: "Yane",
          template: Yane,
          width: "100%",
        },
        ["990171"]: {
          title: "Yane",
          template: Yane,
          width: "100%",
        },
        ["990172"]: {
          title: "Yane",
          template: Yane,
          width: "100%",
        },
        ["990175"]: {
          title: "Yane",
          template: Yane,
          width: "100%",
        },
        ["990176"]: {
          title: "Yane",
          template: Yane,
          width: "100%",
        },
        ["990177"]: {
          title: "Yane",
          template: Yane,
          width: "100%",
        },
        ["990178"]: {
          title: "Yane",
          template: Yane,
          width: "100%",
        },
        ["990201"]: {
          title: "Yane",
          template: Yane,
          width: "100%",
        },
      },
    };
  },

  methods: {
    async close() {
      if (this.componentList[this.selected.id].title == "Yane") {
        this.areaDataDB.yane.passTotal(this.items);
      } else if (this.componentList[this.selected.id].title == "GT") {
        this.areaDataDB.gt.passTotal(this.items);
        this.componentList[this.selected.id].title;
      } else if (this.componentList[this.selected.id].title == "Nokiten") {
        this.areaDataDB.nokiten.passTotal(this.items);
      } else if (this.componentList[this.selected.id].title == "Hafu") {
        this.areaDataDB.hafu.passTotal(this.items);
      } else if (this.componentList[this.selected.id].title == "Sumimune") {
        this.areaDataDB.sumimune.passTotal(this.items);
      } else if (this.componentList[this.selected.id].title == "Honmune") {
        this.areaDataDB.honmune.passTotal(this.items);
      }
      // else if (
      //   this.componentList[this.selected.id].child_title == 'Youjonet'
      // ) {
      //   console.log('test')
      //   this.areaDataDB.bankin.youjonet.passTotal(this.items)
      // }
      else if (this.componentList[this.selected.id].title == "Bankin") {
        if (this.componentList[this.selected.id].child_title == "Youjonet") {
          this.areaDataDB.bankin.youjonet.passTotal(this.items);
        } else {
          this.areaDataDB.bankin.passTotal(this.items);
        }
      }
      await AreaCalculationDB.save({
        [`${this.componentList[this.selected.id].title.toLowerCase()}`]: this
          .areaDataDB[
          `${this.componentList[this.selected.id].title.toLowerCase()}`
        ],
        title: this.componentList[this.selected.id].title.toLowerCase(),
        balcony: this.areaDataDB.balcony,
        dehairi: this.areaDataDB.dehairi,
        items: this.items,
        docID: this.docID[this.selectedIndex],
      });
      this.$emit("getItems");
      this.$emit("close");
    },

    change() {},
  },
};
</script>
