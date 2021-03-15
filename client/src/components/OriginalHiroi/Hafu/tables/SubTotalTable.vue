<template>
<v-container fluid class="pa-0">
    <v-card flat width="auto">
      <v-card-title>{{title}}</v-card-title>
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                    <th v-for="(header, index) in headers" :key="index + 'sub'" class="text-center font-weight-light">
                      {{header}}
                    </th>
                </thead>  
                <tbody> 
                    <tr v-for="(row, index) in rows" :key="index" class="text-center font-weight-light">
                      <td v-for="(header, index) in headers" :key="index +'header'">{{row[header]}}</td>
                    <!-- <td style="width:5px">
                      <input class="text-center" readonly type="text" > 
                      {{item.num}}
                    </td>
                    <td style="width:60px"> <input class="text-center" type="text" v-model="item.grids" @input="emitChanges(item, index)"> </td>
                    <td style="width:60px"> <input class="text-center" type="text" v-model="item.additional"  @input="emitChanges(item, index)"> </td>
                    <td style="width:60px"> <input class="text-center" type="text" v-model="item.constant"  @input="emitChanges(item, index)"> </td>
                    <td class="pa-0" style="width:220px" >
                      <v-select v-model="item.description" max-height="700"  style="width:auto" single-line  solo @input="emitChanges(item, index)"  hide-details :items="descriptionList" ></v-select>
                    </td>
                    <td style="width:80px"> <input class="text-center" type="text" v-model="item.direction"  @input="emitChanges(item, index)"> </td>
                    <td class="text-center" style="width:100px"> 
                      <input class="text-center" readonly type="text" v-model="item.length"> 
                      </td> -->
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
    </v-card>

</v-container>
</template>

<script>
export default {
  props:{
    rows: Array,
    headers: Array,
    title: String
  },
  data(){
    return{
      // header: ['FL', 'P1', 'P2', 'P3'],
      // body: {},
    }
  },
  created(){
  }
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
  background-color: #4CAF50;
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
/* table td {
  position: relative;
} */
/* table td input {
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
} */
  tbody tr:hover {
        background-color: transparent !important;
  }
.v-select>.dropdown-menu { text-align: center; }
</style>
