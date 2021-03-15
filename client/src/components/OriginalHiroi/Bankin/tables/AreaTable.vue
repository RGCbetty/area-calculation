<template>
  <v-container fluid class="pa-0 pr-0">
    <v-card-title style="color: black"
      >AREA(BALCONY, PARAPET, ROOF GARDEN, INSIDE GARDEN)</v-card-title
    >
    <v-layout class="pa-0">
      <template v-if="!bool">
        <v-chip class="ma-2" small color="green" dark dense
          >BALCONY : {{ areaData.bankin.area.balconycount }}</v-chip
        >
        <v-spacer></v-spacer>
        <v-chip class="ma-2" small color="green" dark dense
          >PARAPET : {{ areaData.bankin.area.parapetcount }}</v-chip
        >
        <v-spacer></v-spacer>
        <v-chip class="ma-2" small color="green" dark dense
          >ROOF GARDEN : {{ areaData.bankin.area.roofgardencount }}</v-chip
        >
        <v-spacer></v-spacer>
        <v-chip class="ma-2" small color="green" dark dense
          >INSIDE GARDEN : {{ areaData.bankin.area.insidegardencount }}</v-chip
        >
      </template>
      <template v-else>
        <v-chip class="ma-2" small color="green" dark dense
          >BALCONY : {{ areaDataDB.bankin.area.balconycount }}</v-chip
        >
        <v-spacer></v-spacer>
        <v-chip class="ma-2" small color="green" dark dense
          >PARAPET : {{ areaDataDB.bankin.area.parapetcount }}</v-chip
        >
        <v-spacer></v-spacer>
        <v-chip class="ma-2" small color="green" dark dense
          >ROOF GARDEN : {{ areaDataDB.bankin.area.roofgardencount }}</v-chip
        >
        <v-spacer></v-spacer>
        <v-chip class="ma-2" small color="green" dark dense
          >INSIDE GARDEN :
          {{ areaDataDB.bankin.area.insidegardencount }}</v-chip
        >
      </template>
    </v-layout>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr v-for="(tr, tr_i) in headers" :key="tr_i">
            <th
              v-for="(th, th_i) in tr"
              :key="th_i"
              :rowspan="th.rowspan"
              :colspan="th.colspan"
              class="text-center"
              v-html="th.value"
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in items"
            :key="index"
            style="font-size: 10px; line-height: 0px; height: 1px"
          >
            <td style="width: 5px">
              <input
                class="text-center"
                readonly
                type="text"
                v-model="item.l_no"
              />
              {{ item.num }}
            </td>
            <td>
              <input
                class="text-center"
                type="text"
                v-model="item.l_grid"
                @input="emitChanges(item, index)"
              />
            </td>
            <td>
              <input
                class="text-center"
                type="text"
                v-model="item.l_meter"
                @input="emitChanges(item, index)"
              />
            </td>
            <td>
              <input
                class="text-center"
                type="text"
                v-model="item.w_grid"
                @input="emitChanges(item, index)"
              />
            </td>
            <td>
              <input
                class="text-center"
                type="text"
                v-model="item.w_meter"
                @input="emitChanges(item, index)"
              />
            </td>
            <td class="pa-0" style="width: 120px">
              <v-select
                v-model="item.description"
                max-height="700"
                style="width: 180px"
                single-line
                solo
                @input="emitChanges(item, index)"
                hide-details
                :items="itemList"
              ></v-select>
            </td>
            <td class="text-center">
              <input
                class="text-center"
                readonly
                type="text"
                v-model="item.area"
              />
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>
<script>
// import AreaData from '../../../assets/class/areadata'
import { myMixin } from '../mixins/index'
// import {Dehairy} from '../../../assets/BPU/Tables'
export default {
  mixins: [myMixin],
  props: {
    index: Number,
    headers: Array,
    items: Array,
    bool: Boolean,
  },
  components: {
    // 'NSiding' : () => import('./N.Siding'),
    // 'SummaryTable': () => import('./Summary')
  },
  created() {},

  data: () => ({
    // temp : new AreaData,
    balcony: 0,
    parapet: 0,
    roofGarden: 0,
    insideGarden: 0,
  }),
  methods: {
    emitChanges(item, index) {
      if (!this.bool) {
        this.areaData.bankin.area.computeRow(item, index)
      } else {
        this.areaDataDB.bankin.area.computeRow(item, index)
      }
      // console.log(this.$store.state.areaDataDB)
      // if(item.l_grid!='' && item.l_eaves!='' && item.l_eaves1!='' && item.w_grid!='' && item.w_eaves!='' && item.description!=''){
      //   item.num= Number(index)+1
      //   item.area =Number(Math.round((parseFloat(item.l_grid) * 0.910 ) * (parseFloat(item.w_grid) * 0.910) +'e3')+'e-3')
      // this.clearAndReadCount()
      // }
    },
    clearAndReadCount() {
      this.balcony = 0
      this.parapet = 0
      this.roofGarden = 0
      this.insideGarden = 0

      this.items.filter((data) => {
        if (
          data.description == 'balcony' &&
          (data.area !== '-' || data.area !== '')
        )
          this.balcony += 1
        else if (
          data.description == 'parapet' &&
          (data.area !== '-' || data.area !== '')
        )
          this.parapet += 1
        else if (
          data.description == 'roofgarden' &&
          (data.area !== '-' || data.area !== '')
        )
          this.roofGarden += 1
        else if (
          data.description.split(' ')[0] +
            ' ' +
            data.description.split(' ')[1] ==
            'inside garden' &&
          (data.area !== '-' || data.area !== '')
        )
          this.insideGarden += 1
      })
      // this.areaData.bankin.total.balcony = this.balcony
      // this.areaData.bankin.total.parapet = this.parapet
      // this.areaData.bankin.total.roofgarden = this.roofGarden
      // this.areaData.bankin.total.insidegarden = this.insideGarden

      //  Object.assign( this.areaData.nokiten.items[index],item)
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
