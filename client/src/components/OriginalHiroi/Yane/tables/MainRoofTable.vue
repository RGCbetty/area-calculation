<template>
  <v-container fluid class="pa-0">
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th colspan="5" class="text-center">Main Roof</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th class="text-center" style="width: 50px" rowspan="3">1F Area</th>
            <td style="width: 50px">p1</td>
            <td class="text-center">
              {{
                yane.mainroof.area[`1F`][`p1`].value
                  ? Number(
                      Math.round(
                        yane.mainroof.area[`1F`][`p1`].value + 'e' + 3,
                      ) +
                        'e-' +
                        3,
                    )
                  : Number(
                      Math.round(yane.mr.area[`1F`][`p1`].value + 'e' + 3) +
                        'e-' +
                        3,
                    )
              }}
            </td>
            <td class="text-center" rowspan="3">
              {{
                yane.mainroof.area.sum1F
                  ? Number(
                      Math.round(yane.mainroof.area.sum1F + 'e' + 3) + 'e-' + 3,
                    )
                  : Number(Math.round(yane.mr.area.sum1F + 'e' + 3) + 'e-' + 3)
              }}
            </td>
          </tr>
          <tr>
            <td style="width: 50px">p2</td>
            <td class="text-center">
              {{
                yane.mainroof.area[`1F`][`p2`].value
                  ? Number(
                      Math.round(
                        yane.mainroof.area[`1F`][`p2`].value + 'e' + 3,
                      ) +
                        'e-' +
                        3,
                    )
                  : Number(
                      Math.round(yane.mr.area[`1F`][`p2`].value + 'e' + 3) +
                        'e-' +
                        3,
                    )
              }}
            </td>
          </tr>
          <tr>
            <td style="width: 50px">p3</td>
            <td class="text-center">
              {{
                yane.mainroof.area[`1F`][`p3`].value
                  ? Number(
                      Math.round(
                        yane.mainroof.area[`1F`][`p3`].value + 'e' + 3,
                      ) +
                        'e-' +
                        3,
                    )
                  : Number(
                      Math.round(yane.mr.area[`1F`][`p3`].value + 'e' + 3) +
                        'e-' +
                        3,
                    )
              }}
            </td>
          </tr>
          <tr>
            <th class="text-center" style="width: 50px" rowspan="3">2F Area</th>
            <td style="width: 50px">p1</td>
            <td class="text-center">
              {{
                yane.mainroof.area[`2F`][`p1`].value
                  ? Number(
                      Math.round(
                        yane.mainroof.area[`2F`][`p1`].value + 'e' + 3,
                      ) +
                        'e-' +
                        3,
                    )
                  : Number(
                      Math.round(yane.mr.area[`2F`][`p1`].value + 'e' + 3) +
                        'e-' +
                        3,
                    )
              }}
            </td>
            <td class="text-center" rowspan="3">
              {{
                yane.mainroof.area.sum2F
                  ? Number(
                      Math.round(yane.mainroof.area.sum2F + 'e' + 3) + 'e-' + 3,
                    )
                  : Number(Math.round(yane.mr.area.sum2F + 'e' + 3) + 'e-' + 3)
              }}
            </td>
          </tr>
          <tr>
            <td style="width: 50px">p2</td>
            <td class="text-center">
              {{
                yane.mainroof.area[`2F`][`p2`].value
                  ? Number(
                      Math.round(
                        yane.mainroof.area[`2F`][`p2`].value + 'e' + 3,
                      ) +
                        'e-' +
                        3,
                    )
                  : Number(
                      Math.round(yane.mr.area[`2F`][`p2`].value + 'e' + 3) +
                        'e-' +
                        3,
                    )
              }}
            </td>
          </tr>
          <tr>
            <td style="width: 50px">p3</td>
            <td class="text-center">
              {{
                yane.mainroof.area[`2F`][`p3`].value
                  ? Number(
                      Math.round(
                        yane.mainroof.area[`2F`][`p3`].value + 'e' + 3,
                      ) +
                        'e-' +
                        3,
                    )
                  : Number(
                      Math.round(yane.mr.area[`2F`][`p3`].value + 'e' + 3) +
                        'e-' +
                        3,
                    )
              }}
            </td>
          </tr>
          <tr>
            <th class="text-center" style="width: 120px" rowspan="3">
              3F Area
            </th>
            <td style="width: 50px">p1</td>
            <td style="width: 120px" class="text-center">
              {{
                yane.mainroof.area[`3F`][`p1`].value
                  ? Number(
                      Math.round(
                        yane.mainroof.area[`3F`][`p1`].value + 'e' + 3,
                      ) +
                        'e-' +
                        3,
                    )
                  : Number(
                      Math.round(yane.mr.area[`3F`][`p1`].value + 'e' + 3) +
                        'e-' +
                        3,
                    )
              }}
            </td>
            <td class="text-center" rowspan="3">
              {{
                yane.mainroof.area.sum3F
                  ? Number(
                      Math.round(yane.mainroof.area.sum3F + 'e' + 3) + 'e-' + 3,
                    )
                  : Number(Math.round(yane.mr.area.sum3F + 'e' + 3) + 'e-' + 3)
              }}
            </td>
          </tr>
          <tr>
            <td style="width: 50px">p2</td>
            <td class="text-center">
              {{
                yane.mainroof.area[`3F`][`p2`].value
                  ? Number(
                      Math.round(
                        yane.mainroof.area[`3F`][`p2`].value + 'e' + 3,
                      ) +
                        'e-' +
                        3,
                    )
                  : Number(
                      Math.round(yane.mr.area[`3F`][`p2`].value + 'e' + 3) +
                        'e-' +
                        3,
                    )
              }}
            </td>
          </tr>
          <tr>
            <td style="width: 50px">p3</td>
            <td class="text-center">
              {{
                yane.mainroof.area[`3F`][`p3`].value
                  ? Number(
                      Math.round(
                        yane.mainroof.area[`3F`][`p3`].value + 'e' + 3,
                      ) +
                        'e-' +
                        3,
                    )
                  : Number(
                      Math.round(yane.mr.area[`3F`][`p3`].value + 'e' + 3) +
                        'e-' +
                        3,
                    )
              }}
            </td>
          </tr>
        </tbody>
        <!-- <template v-if="trans.bool">
          <tbody v-for="(pitches, floor, index) in yane.mr.area" :key="index+'a'">
            <tr>
              <th colspan="3" v-if="floor.includes('F')"  :rowspan="Object.keys(floor).length" class="text-center">{{floor}} Area</th>
                  <template v-for="(pitch, key, index) in pitches" >
                    <tr :key="index+'pitch'">
                      <td style="width:30px"  v-if="floor.includes('F')">{{key}}</td>
                        <template v-for="(value, key, index) in pitch">
                          <td :style="{ width: widthSize }"  class="text-center" v-if="key == 'value'"  :key="index+'value'">{{Number(Math.round((value)+'e'+3)+'e-'+3)}}</td>
                        </template>
                    </tr>
                  </template>
                <th style="width:130px" v-if="floor.includes('F')" class="text-center">{{getSum(pitches, 4)}}</th>
             </tr> 
          </tbody>
         </template> 
         <template v-else>
          <tbody v-for="(pitches, floor, index) in yane.mainroof.area" :key="index+'a'">
            <tr>
              <th colspan="3" v-if="floor.includes('F')"  :rowspan="Object.keys(floor).length" class="text-center">{{floor}} Area</th>
              <template v-for="(pitch, key, index) in pitches" >
                <tr :key="index+'pitch'">
                  <td style="width:30px"  v-if="floor.includes('F')">{{key}}</td>
                    <template v-for="(value, key, index) in pitch">
                      <td :style="{ width: widthSize }"  class="text-center" v-if="key == 'value'"  :key="index+'value'">{{Number(Math.round((value)+'e'+3)+'e-'+3)}}</td>
                    </template>
                </tr>
              </template>
                  <th style="width:130px" v-if="floor.includes('F')" class="text-center">{{getSum(pitches, 4)}}</th>
             </tr> 
          </tbody>
         </template>  -->
      </template>
    </v-simple-table>
  </v-container>
</template>
<script>
export default {
  props: {
    yane: Object,
  },
  components: {},
  computed: {},
  created() {},
  data: () => ({
    widthSize: '200px',
    isAuto: true,
  }),
  methods: {
    getSum(val, decimals) {
      let sum = Object.keys(val)
        .map((key) => val[key].value)
        .reduce((previous, current) => previous + current)
      return Number(Math.round(sum + 'e' + decimals) + 'e-' + decimals)
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
  width: 50%;
}
tbody tr:hover {
  background-color: transparent !important;
}

thead th {
  background-color: #4caf50;
  border: solid 1px;
  border-color: #424242;
  color: white !important;
  height: 1vh !important;
  text-align: left;
}
tbody td {
  border: solid 1px gray;
  color: #333;
  /* text-shadow: 1px 1px 1px #fff; */
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
