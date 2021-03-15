<template>
  <v-container fluid class="pa-0">
    <v-card-title>YOUJONET</v-card-title>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr v-for="(tr, tr_i) in headerRow" :key="tr_i">
            <th
              v-for="(th, th_i) in tr"
              :key="th_i"
              :rowspan="th.rowspan"
              :scope="th.scope"
              :colspan="th.colspan"
              class="text-center font-weight-light"
            >
              {{ th.value }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(trow, index) in items"
            :class="trow.alignment"
            :scope="trow.scope"
            :key="index + 'a'"
          >
            <th class="text-center">{{ trow.header }}</th>
            <td>
              <input
                class="text-center"
                type="text"
                v-model="trow.grids1F"
                @input="emitChanges(trow, index)"
              />
            </td>
            <td>
              <input
                class="text-center"
                type="text"
                v-model="trow.constant1F"
                @input="emitChanges(trow, index)"
              />
            </td>
            <td>
              <input
                class="text-center"
                type="text"
                v-model="trow.irregular1F"
                @input="emitChanges(trow, index)"
              />
            </td>
            <td>
              <input
                class="text-center"
                type="text"
                v-model="trow.grids2F"
                @input="emitChanges(trow, index)"
              />
            </td>
            <td>
              <input
                class="text-center"
                type="text"
                v-model="trow.constant2F"
                @input="emitChanges(trow, index)"
              />
            </td>
            <td>
              <input
                class="text-center"
                type="text"
                v-model="trow.irregular2F"
                @input="emitChanges(trow, index)"
              />
            </td>
            <td>
              <input
                class="text-center"
                type="text"
                v-model="trow.grids3F"
                @input="emitChanges(trow, index)"
              />
            </td>
            <td>
              <input
                class="text-center"
                type="text"
                v-model="trow.constant3F"
                @input="emitChanges(trow, index)"
              />
            </td>
            <td>
              <input
                class="text-center"
                type="text"
                v-model="trow.irregular3F"
                @input="emitChanges(trow, index)"
              />
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>
<script>
// import AreaData from '../assets/class/areadata/'
import { myMixin } from '../../../../assets/class/areadata/bankin/mixins'
export default {
  mixins: [myMixin],
  props: {
    index: Number,
    items: Array,
    selectedRow: Object,
    value: Boolean,
  },
  components: {},
  created() {},
  data: () => ({}),
  methods: {
    emitChanges(item, index) {
      // this.areaData.bankin.youjonet.compute(item, index ,'Youjonet', this.index)
      if (!this.value) {
        this.areaData.bankin.youjonet.computeRow(
          item,
          index,
          this.areaData.standard,
        )
      } else {
        this.areaDataDB.bankin.youjonet.computeRow(
          item,
          index,
          this.areaDataDB.standard,
        )
      }
    },
  },
}
</script>
<style scoped>
table {
  border: solid 1px #e8e4c9;
  border-collapse: collapse;
  border-spacing: 0;
  font: normal 13px Arial, sans-serif;
  /* table-layout:fixed; */
  width: 50%;
}

thead th {
  background-color: #4caf50;
  border: solid 1px;
  border-color: #424242;
  color: white !important;
  height: 1vh !important;
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
