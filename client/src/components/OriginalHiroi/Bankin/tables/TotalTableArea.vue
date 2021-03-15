<template >
  <div class="pa-0 ma-0">
    <v-simple-table dense class="pt-0">
      <template v-slot:top>
        <v-card-title style="color: black">Total Area</v-card-title>
      </template>
      <template v-slot:default>
        <thead>
          <tr v-for="(th, i) in headers" :key="i">
            <th class="text-center" v-html="th.id"></th>
            <th class="text-center" v-html="th.name"></th>
            <th class="text-center" v-html="th.value"></th>
          </tr>
        </thead>
        <tbody>
          <!-- {{computeData}} -->
          <template v-if="!bool">
            <tr style="font-size: 7px; line-height: 0px; height: 1px">
              <td class="text-center">70460</td>
              <td class="text-center">バルコニー面積(Balcony Area)</td>
              <td class="text-center">
                {{
                  Number(
                    Math.round(areaData.bankin.area.balcony + 'e' + 3) +
                      'e-' +
                      3,
                  )
                    ? Number(
                        Math.round(areaData.bankin.area.balcony + 'e' + 3) +
                          'e-' +
                          3,
                      )
                    : Number(
                        Math.round(areaData.balcony.area.total + 'e' + 3) +
                          'e-' +
                          3,
                      )
                }}
              </td>
              <!-- {{item}} -->
            </tr>
            <tr style="font-size: 7px; line-height: 0px; height: 1px">
              <td class="text-center">70461</td>
              <td class="text-center">パラペット面積(Parapet Area)</td>
              <td class="text-center">
                {{
                  Number(
                    Math.round(areaData.bankin.area.parapet + 'e' + 3) +
                      'e-' +
                      3,
                  )
                }}
              </td>
              <!-- {{item}} -->
            </tr>
            <tr style="font-size: 7px; line-height: 0px; height: 1px">
              <td class="text-center">70462</td>
              <td class="text-center">ルーフガーデン面積(Roof Garden Area)</td>
              <td class="text-center">
                {{
                  Number(
                    Math.round(areaData.bankin.area.roofgarden + 'e' + 3) +
                      'e-' +
                      3,
                  )
                }}
              </td>
              <!-- {{item}} -->
            </tr>
          </template>
          <template v-else>
            <tr style="font-size: 7px; line-height: 0px; height: 1px">
              <td class="text-center">70460</td>
              <td class="text-center">バルコニー面積(Balcony Area)</td>
              <td class="text-center">
                {{
                  Number(
                    Math.round(areaDataDB.bankin.area.balcony + 'e' + 3) +
                      'e-' +
                      3,
                  )
                    ? Number(
                        Math.round(areaDataDB.bankin.area.balcony + 'e' + 3) +
                          'e-' +
                          3,
                      )
                    : Number(
                        Math.round(areaDataDB.balcony.area.total + 'e' + 3) +
                          'e-' +
                          3,
                      )
                }}
              </td>
              <!-- {{item}} -->
            </tr>
            <tr style="font-size: 7px; line-height: 0px; height: 1px">
              <td class="text-center">70461</td>
              <td class="text-center">パラペット面積(Parapet Area)</td>
              <td class="text-center">
                {{
                  Number(
                    Math.round(areaDataDB.bankin.area.parapet + 'e' + 3) +
                      'e-' +
                      3,
                  )
                }}
              </td>
              <!-- {{item}} -->
            </tr>
            <tr style="font-size: 7px; line-height: 0px; height: 1px">
              <td class="text-center">70462</td>
              <td class="text-center">ルーフガーデン面積(Roof Garden Area)</td>
              <td class="text-center">
                {{
                  Number(
                    Math.round(areaDataDB.bankin.area.roofgarden + 'e' + 3) +
                      'e-' +
                      3,
                  )
                }}
              </td>
              <!-- {{item}} -->
            </tr>
          </template>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import { myMixin } from '../mixins/index'
// import _ from 'lodash'
export default {
  mixins: [myMixin],
  name: 'TotalTableArea',

  props: {
    index: Number,
    headers: Array,
    bool: Boolean,
  },
  data: () => ({}),
  computed: {
    // computeData(){
    //   // console.log(this.areaData.bankin)
    //   let data = this.dataArea
    //   let id,val,total=0,parapet=0,balcony=0,roofgarden=0;
    //   for(let a = 0 ;a<data.length;a++){
    //      data[a].total=''
    //        let val1 = _.find(this.areaData.items,{id: data[a].id})
    //         if(val1!=undefined) {
    //           val1.value = 0
    //         }
    //   }
    //   for(let x = 0 ;x< this.areaData.nokiten.items.length ;x++){
    //         let a =  this.areaData.nokiten.items[x]
    //         if(a.description!=''){
    //             if(a.description=='balcony'){
    //               id=data[0].id
    //               balcony+= Number(Math.round((a.area)  +'e3')+'e-3')
    //               data[0].total = balcony
    //               total = data[0].total
    //             }
    //             else if (a.description=='parapet'){
    //               id=data[1].id
    //              parapet+= Number(Math.round((a.area)  +'e3')+'e-3')
    //              data[1].total =parapet
    //               total=data[1].total
    //             }
    //             else if (a.description=='roofgarden'){
    //               id=data[2].id
    //               roofgarden+= Number(Math.round((a.area)  +'e3')+'e-3')
    //               data[2].total =roofgarden
    //               total =  data[2].total
    //             }
    //               val = _.find(this.areaData.items,{id: id})
    //               if(val!=undefined) val.value = total
    //         }
    //     }
    //   return data
    // }
  },
  methods: {},
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
  height: 4vh;
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