<template>
  <v-container fluid class="pa-0">
    <v-card-title>{{ title }}</v-card-title>

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
            v-for="(row, index) in rows"
            :key="index"
            style="font-size: 10px; line-height: 0px; height: 1px"
          >
            <td style="width: 5px">
              <input
                class="text-center"
                readonly
                type="text"
                v-model="row.num"
              />
            </td>
            <td style="width: 80px">
              <input
                class="text-center"
                type="text"
                v-model="row.grids"
                @input="emitChanges(row, index)"
              />
            </td>
            <td style="width: 80px">
              <input
                class="text-center"
                type="text"
                v-model="row.eaves"
                @input="emitChanges(row, index)"
              />
            </td>
            <td style="width: 80px">
              <input
                class="text-center"
                type="text"
                v-model="row.eaves1"
                @input="emitChanges(row, index)"
              />
            </td>
            <td style="width: 80px">
              <input
                class="text-center"
                type="text"
                v-model="row.subTotal"
                @input="emitChanges(row, index)"
              />
            </td>
            <td class="pa-0" style="width: 200px">
              <div>
                <v-select
                  v-model="row.description"
                  :items="list"
                  solo
                  @input="emitChanges(row, index)"
                  hide-details
                ></v-select>
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>
<script>
export default {
  props: {
    index: Number,
    headers: Array,
    rows: Array,
    list: Array,
    title: String,
    bool: Boolean,
  },
  components: {},
  computed: {},
  created() {},

  data: () => ({}),
  methods: {
    emitChanges(row, index) {
      if (!this.bool) {
        this.areaData.hafu.getIDnumber(row, index)
        this.areaData.hafu.computeRow(row, this.areaData.standard)
        if (row.description !== '') {
          this.areaData.hafu.getTotalHafu()
          this.areaData.hafu.getTotalHana()
        }
      } else {
        this.areaDataDB.hafu.getIDnumber(row, index)
        this.areaDataDB.hafu.computeRow(row, this.areaData.standard)
        if (row.description !== '') {
          this.areaDataDB.hafu.getTotalHafu()
          this.areaDataDB.hafu.getTotalHana()
        }
      }
    },
    //   addRow(){
    //      this.areaData.nokiten.items.push({
    //       num: '',
    //       l_grid: '',
    //       l_eaves: '',
    //       l_eaves1: '',
    //       w_grid: '',
    //       w_eaves: '',
    //       description: '',
    //       total: ''
    //     })
    //   },
    //   emitChanges(item, index) {
    //     console.log(this.rows)
    //     console.log(item)
    //     let module = .910
    //     //compute
    //     let i = 1
    //     if(index == 0){
    //         if(item.l_grid == '' ){
    //           item.num = ''
    //         } else {
    //         item.num = i
    //         }
    //     } else {
    //         if(item.l_grid == '' ){
    //           item.num = ''
    //         }
    //         else if(this.areaData.nokiten.items[index-1].l_grid == '' || this.areaData.nokiten.items[index-1].l_grid == undefined && this.areaData.nokiten.items[index-1].description == '' || this.areaData.nokiten.items[index-1].description == '-' ){
    //           item.num = i
    //           item.description
    //           console.log('if empty')
    //         } else if(this.areaData.nokiten.items[index-1].l_grid){
    //           item.num = this.areaData.nokiten.items[index-1].num + 1
    //           item.description = this.areaData.nokiten.items[index-1].description
    //           console.log('if not')
    //         }
    //     }
    //     if ( item.description !== '' && item.description !== '-' ){
    //       let type = item.description.split(" ")
    //         if(type[0] == 'MR' || type[0] == 'SP'){
    //           let areaSqm = Number((item.l_grid * module)+ Number(item.l_eaves)+ Number(item.l_eaves1))   * Number(item.w_eaves)
    //           console.log(this.areaData.standard[ type[0].toLowerCase() ][ type[1] ][ type[3] ].factor())
    //           let pitchFactor = this.areaData.standard[ type[0].toLowerCase() ][ type[1] ][ type[3] ].factor()
    //           item.pitch = pitchFactor
    //           if(areaSqm == 0){
    //             item.total = '-'
    //           } else {
    //             item.total = areaSqm
    //           }
    //         } else if ( type[0] == 'PH') {
    //           let areaSqm = Number((item.l_grid * module)+ Number(item.l_eaves)+ Number(item.l_eaves1))   * Number(item.w_eaves)
    //           item.total = areaSqm
    //         }
    //         else {
    //           let areaSqm = (Number(item.l_grid) * module) * ( Number(item.w_grid) * module )
    //           item.total = areaSqm
    //         }
    //     //will not compute
    //     } else {
    //       item.total = '-'
    //     }
    //     if(item.description){
    //       this.areaData.nokiten.hwallcount()
    //       this.areaData.nokiten.balconycount()
    //       this.areaData.nokiten.wallEavesMR()
    //       this.areaData.nokiten.wallEavesSP()
    //       this.areaData.nokiten.hangingWall()
    //       this.areaData.nokiten.balcony()
    //       this.areaData.nokiten.parapet1F()
    //       this.areaData.nokiten.garage1F()
    //       this.areaData.nokiten.Fujyoshitsu1F()
    //       this.areaData.nokiten.PHeaves()
    //     }
    //     this.dehairi(item)
    //   }
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



