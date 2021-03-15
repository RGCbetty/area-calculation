<template>
  <v-col cols="12">
    <v-row no-gutters dense>
      <v-col cols="12">
        <v-card class="my-2" outlined>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">ID</th>
                  <th class="text-center">Title</th>
                  <th class="text-center">Value</th>
                  <th class="text-center">Unit</th>
                  <th class="text-center">Remarks</th>
                  <th class="text-center">Command</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in sortedItems" :key="item.name">
                  <template v-if="item.value >= 0">
                    <td class="text-center">
                      {{ item.id }}
                    </td>
                    <td class="text-center">
                      {{ item.title }}
                    </td>
                    <td class="text-center" v-roundTo="[item.value, 5]" />
                    <td class="text-center">
                      {{ item.unit }}
                    </td>
                    <td style="width: 300px" class="text-center">
                      {{ item.remarks }}
                    </td>
                    <td class="text-center" v-if="!bool">
                      <v-btn fab small outlined @click="showModal(item, index)"
                        >Edit</v-btn
                      >
                    </td>
                    <td class="text-center" v-else>
                      <v-btn fab small outlined @click="viewModal(item, index)"
                        >Edit</v-btn
                      >
                    </td>
                  </template>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
    <template v-if="!bool">
      <dialog-computation
        v-model="dialog"
        :selected="selected"
        :index="index"
        @close="close"
      ></dialog-computation>
    </template>
    <template v-else>
      <dialog-computed
        v-model="dialog"
        :value="bool"
        :selected="selected"
        :items="items"
        :index="index"
        :docID="docID"
        :selectedIndex="selectedIndex"
        @close="close"
        @getItems="getItems()"
      ></dialog-computed>
    </template>
  </v-col>
</template>
<script>
// import DialogComputation from "./DialogComputation";

import roundTo from "../../plugins/roundto";

export default {
  // props: ['items', 'bool'],
  props: {
    items: Array,
    bool: Boolean,
    docID: Array,
    selectedIndex: Number,
  },
  created() {},
  computed: {
    sortedItems() {
      return this.items.slice(0).sort((a, b) => Number(a.id) - Number(b.id));
    },
  },
  components: {
    DialogComputation: () => import("./DialogComputation"),
    DialogComputed: () => import("./DialogComputed"),
  },

  data() {
    return {
      index: 0,
      dialog: false,
      selected: {},
    };
  },

  mixins: [roundTo],

  methods: {
    showModal(item, index) {
      this.dialog = true;
      this.selected = item;
      this.index = index;
      // console.log(this.reloadPitch)
    },
    viewModal(item, index) {
      this.dialog = true;
      this.selected = item;
      this.index = index;
    },
    getItems() {
      this.$emit("getItems");
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
table {
  border: solid 1px #e8e4c9;
  border-collapse: collapse;
  border-spacing: 0;
  font: normal 13px Arial, sans-serif;
  table-layout: fixed;
  width: 100%;
}

thead th {
  background-color: #4caf50;
  border: solid 1px;
  border-color: #424242;
  color: white !important;
  padding: 10px;
  text-align: left;
  /* text-shadow: 1px 1px 1px #fff; */
}
tbody td {
  border: solid 1px gray;
  color: #333;
  text-shadow: 1px 1px 1px #fff;
  height: 1vh;
}
tbody th {
  border: solid 1px gray;
  background-color: #424242;
  color: white;
  /* text-shadow: 1px 1px 1px #fff; */
  height: 1vh;
}
table td {
  position: relative;
}
table td input {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  border: none;
  padding: 10px;
  box-sizing: border-box;
}
.v-select > .dropdown-menu {
  text-align: center;
}
</style>
