<template>
  <v-container fluid class="pa-0">
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th colspan="5" class="text-center">Solar Panel</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" class="text-center" style="width: 240px">
              1F Area
            </th>
            <td colspan="2" class="text-center">
              {{
                yane.solarpanel.area.sum1F
                  ? yane.solarpanel.area.sum1F
                  : yane.sp.area.sum1F
              }}
            </td>
          </tr>
          <tr>
            <th scope="row" class="text-center" style="width: 240px">
              2F Area
            </th>
            <td colspan="2" class="text-center">
              {{
                yane.solarpanel.area.sum2F
                  ? yane.solarpanel.area.sum2F
                  : yane.sp.area.sum2F
              }}
            </td>
          </tr>
          <tr>
            <th scope="row" class="text-center" style="width: 240px">
              3F Area
            </th>
            <td colspan="2" class="text-center">
              {{
                yane.solarpanel.area.sum3F
                  ? yane.solarpanel.area.sum3F
                  : yane.sp.area.sum3F
              }}
            </td>
          </tr>
          <tr>
            <th class="text-center">Total</th>
            <td class="text-center">
              {{
                yane.solarpanel.area.total
                  ? yane.solarpanel.area.total
                  : yane.sp.area.total
              }}
            </td>
          </tr>
        </tbody>
        <!-- <template v-if="trans.bool">
                <tbody>
                  <tr v-for="(pitches, floor, index) in yane.sp.area" :key="index+'a'">
                    <th style="width:130px"  v-if="floor.includes('F')" class="text-center">{{floor}} Area</th>
                        <td style="width:130px" v-if="floor.includes('F')" class="text-center">{{getSum(pitches, 4)}}</td>
                  </tr> 
                </tbody>
                <tbody>
                  <tr>
                    <th class="text-center">Total</th>
                    <td class="text-center">{{yane.sp.area.total}}</td>  
                  </tr>
                </tbody>
                </template>
                 <template v-else>
                <tbody>
                  <tr v-for="(pitches, floor, index) in yane.solarpanel.area" :key="index+'a'">
                    <th style="width:130px"  v-if="floor.includes('F')" class="text-center">{{floor}} Area</th>
                        <td style="width:130px" v-if="floor.includes('F')" class="text-center">{{getSum(pitches, 4)}}</td>
                  </tr> 
                </tbody>
                <tbody>
                  <tr>
                    <th class="text-center">Total</th>
                    <td class="text-center">{{yane.solarpanel.area.total}}</td>  
                  </tr>
                </tbody>
                </template> -->
      </template>
    </v-simple-table>
  </v-container>
</template>
<script>
// import AreaData from '../assets/class/areadata/'
export default {
  props: {
    yane: Object,
  },
  components: {
    // getTotalAllFloors(){
    //   return this.yane.solarpanel.area.summaryTotal()
    // }
  },
  computed: {},
  created() {},
  data: () => ({
    widthSize: "200px",
    allTotal: 0,
    // temp: new AreaData
  }),
  methods: {
    getSum(val, decimals) {
      let sum = Object.keys(val ? val : null)
        .map((key) => val[key].value)
        .reduce((previous, current) => previous + current);
      // return Number(sum).toFixed
      return Number(Math.round(sum + "e" + decimals) + "e-" + decimals);
    },
    // getTotal(val, decimals){

    //    let total = Object.keys(val).map(key => val[key].value).reduce((previous, current) => previous + current);
    //    console.log(total)
    //   return Number(Math.round(total+'e'+decimals)+'e-'+decimals);
    // }
  },
};
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
