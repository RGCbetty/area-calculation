<template>
  <v-container fluid class="pa-0 pr-0">
    <v-card-title style="color: black" v-if="title">
      {{ title }}
      <v-chip class="ml-3" color="green" dark
        >{{ areaData.bankin.roofgarden.count }}
      </v-chip>
    </v-card-title>
    <v-card-title v-else>
      <v-chip class="ml-3" color="transparent"></v-chip>
    </v-card-title>
    <v-simple-table style="width: 101%" dense>
      <template v-slot:default>
        <thead>
          <tr v-for="(tr, tr_i) in BPheader" :key="tr_i">
            <th
              v-for="(th, th_i) in tr"
              :key="th_i"
              :rowspan="th.rowspan"
              :scope="th.scope"
              :colspan="th.colspan"
              class="text-center font-weight-light pa-0"
            >
              {{ th.value }}
            </th>
          </tr>
        </thead>

        <tbody v-for="(item, i) in items" :key="i + '1'">
          <tr>
            <th
              :rowspan="item.properties.length + 1"
              class="text-center caption pa-0"
              style="width: 70px"
            >
              {{ item.description }}
            </th>
          </tr>
          <tr v-for="(prop, index) in item.properties" :key="index + '1'">
            <td class="text-center" style="width: 50px">{{ prop.part }}</td>
            <td>
              <input
                class="text-center"
                type="text"
                v-model="prop.grid"
                @input="emitChanges(prop, index)"
              />
            </td>
            <td>
              <input
                class="text-center"
                type="text"
                v-model="prop.meter"
                @input="emitChanges(prop, index)"
              />
            </td>
            <td>
              <input
                class="text-center"
                type="text"
                v-model="prop.total"
                @input="emitChanges(prop, index)"
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
import { myMixin } from '../mixins/index'
export default {
  mixins: [myMixin],
  props: {
    index: Number,
    items: Array,
    title: String,
    count: Number,
  },
  components: {},
  created() {},
  data: () => ({
    roofgarden: 0,
    draftList: [
      {
        descriptionList: 'BU-1',
        items: [
          { part: 'FW', grid: '0', meter: '0', total: '0' },
          { part: 'OW', grid: '0', meter: '0', total: '0' },
        ],
      },
      {
        descriptionList: 'BU-2',
        items: [
          { part: 'FW', grid: '0', meter: '0', total: '0' },
          { part: 'OW', grid: '0', meter: '0', total: '0' },
        ],
      },
      {
        descriptionList: 'BU-3',
        items: [
          { part: 'FW', grid: '0', meter: '0', total: '0' },
          { part: 'OW', grid: '0', meter: '0', total: '0' },
        ],
      },
    ],

    // temp: new AreaData
  }),
  methods: {
    emitChanges(item, index) {
      this.areaData.bankin.roofgarden.computeRow(item, index)
      this.areaData.bankin.getLength()
      // console.log(this.title)
      // console.log(this.areaData.bankin.roofgarden)
      // console.log(item, index)
    },
  },
}
</script>
<style scoped>
.v-application .caption {
  font-size: 0.62rem !important;
  font-weight: 400;
  letter-spacing: 0.0333333333em !important;
  line-height: 1.25rem;
}
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
