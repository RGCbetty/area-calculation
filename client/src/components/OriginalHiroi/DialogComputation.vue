<template>
  <v-dialog
    scrollable
    v-model="dialog"
    fullscreen
    :max-width="selectedComputation.width"
    hide-overlay
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
// import Area from './Bankin/Area'
import Hafu from "./Hafu";
import Yane from "./Yane";

export default {
  props: ["value", "selected", "index"],

  watch: {
    dialog(val) {
      if (!val) {
        // this.close()
        this.$emit("close");
      }
    },

    value(val) {
      this.dialog = val;
      if (val) {
        if (this.selected.id in this.componentList) {
          this.selectedComputation = this.componentList[this.selected.id];
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
          title: "Gaibu Tile",
          template: GaibuTile,
          width: "100%",
        },

        ["990100"]: {
          title: "Gaibu Tile",
          template: GaibuTile,
          width: "100%",
        },

        ["100011"]: {
          title: "Gaibu Tile",
          template: GaibuTile,
          width: "100%",
        },

        ["100012"]: {
          title: "Gaibu Tile",
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
          title: "Youjonet",
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
    close() {
      switch (this.componentList[this.selected.id].title) {
        case "Yane":
          this.areaData.yane.passTotal(this.areaData.items);
          break;
        case "Gaibu Tile":
          this.areaData.gt.passTotal(this.areaData.items);
          break;
        case "Nokiten":
          this.areaData.nokiten.passTotal(this.areaData.items);
          break;
        case "Hafu":
          this.areaData.hafu.passTotal(this.areaData.items);
          break;
        case "Youjonet":
          this.areaData.bankin.youjonet.passTotal(this.areaData.items);
          break;
        case "Bankin":
          this.areaData.bankin.passTotal(this.areaData.items);
          break;
        case "Honmune":
          this.areaData.honmune.passTotal(this.areaData.items);
          break;
        case "Sumimune":
          this.areaData.sumimune.passTotal(this.areaData.items);
          break;
        default:
          console.log('! found') 
        break;
      }
      // if (this.componentList[this.selected.id].title == "Yane") {
      //   this.areaData.yane.passTotal(this.areaData.items);
      // } else if (this.componentList[this.selected.id].title == "Gaibu Tile") {
      //   this.areaData.gt.passTotal(this.areaData.items);
      // } else if (this.componentList[this.selected.id].title == "Nokiten") {
      //   this.areaData.nokiten.passTotal(this.areaData.items);
      // } else if (this.componentList[this.selected.id].title == "Hafu") {
      //   this.areaData.hafu.passTotal(this.areaData.items);
      // } else if (this.componentList[this.selected.id].title == "Youjonet") {
      //   this.areaData.bankin.youjonet.passTotal(this.areaData.items);
      // } else if (this.componentList[this.selected.id].title == "Bankin") {
      //   this.areaData.bankin.passTotal(this.areaData.items);
      // }
      this.$emit("close");
    },

    change() {},
  },
};
</script>