<template>
  <v-dialog scrollable v-model="dialog" fullscreen hide-overlay>
    <v-card>
      <v-card-title class="headline font-weight-thin">{{
        selected.plan_code
      }}</v-card-title>
      <v-card-text>
        <specification :plan_info="selected" />
        <plan-data
          :items="computed_items"
          :bool="value"
          :docID="doc_id"
          :selectedIndex="selectedIndex"
          @getItems="getItems()"
        />
        <!-- <component
                    :is="selectedComputation.template"
                    :index="index"
                    :selectedRow="selected"
                />-->
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
import AreaCalculationDB from "../../assets/class/db/areacalculation";
export default {
  components: {
    Specification: () => import("./SpecificationChecker"),
    PlanData: () => import("./PlanData"),
  },
  props: {
    value: Boolean,
    selected: Object,
    doc_id: Array,
    selectedIndex: Number,
  },
  data() {
    return {
      dialog: false,
      computed_items: [],
    };
  },
  created() {},
  computed: {
    // async selectedIndex() {
    //     console.log(this.doc_id);
    //     if (this.doc_id.length > 0) {
    //         let res = await AreaCalculationDB.getComputedItems(
    //             this.doc_id[this.selectedIndex]
    //         );
    //         console.log(res.data);
    //         this.computed_items = res.data[0];
    //         return this.selectedIndex;
    //     }
    // }
  },
  methods: {
    close() {
      // this.$emit("close");
      this.dialog = false;
    },
    async getItems() {
      let res = await AreaCalculationDB.getComputedItems(
        this.doc_id[this.selectedIndex]
      );
      this.computed_items = res.data;
    },
  },
  watch: {
    dialog(val) {
      if (!val) {
        // this.close()
        this.$emit("close");
      }
    },
    // async selectedIndex(newVal, oldVal) {
    //     console.log(oldVal);
    //     if (newVal !== -1 || newVal == oldVal) {
    //         this.computed_items = [];
    //         let res = await AreaCalculationDB.getComputedItems(
    //             this.doc_id[newVal]
    //         );
    //         console.log(res.data);
    //         this.computed_items = res.data[0];
    //     }
    // },
    // async doc_id(newVal, oldVal) {
    //     if (newVal.length > 0 && this.editedIndex.) {
    //         console.log(this.editedIndex);
    //         // console.log(this.doc_id[this.selectedIndex]);
    //         let res = await AreaCalculationDB.getComputedItems(
    //             this.doc_id[this.editedIndex]
    //         );
    //         // console.log(res.data);
    //         this.computed_items = res.data;
    //         console.log(this.computed_items);
    //     }
    // },
    async value(val) {
      this.dialog = val;
      if (val) {
        this.getItems();
        // console.log(this.selectedIndex);
        //     if (this.selected.id in this.componentList) {
        //         this.selectedComputation = this.componentList[
        //             this.selected.id
        //         ];
        //     } else {
        //         // this.close()
        // this.$emit("close");
        //     }
      }
    },
  },
};
</script>
