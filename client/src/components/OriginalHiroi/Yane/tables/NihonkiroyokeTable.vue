<template>
  <v-container fluid class="pa-0" >
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
          <tr>
            <th colspan="3" class="text-center">Nihonkiriyoke</th>
          </tr> 
        </thead> 
                <tbody v-for="(item, i) in draftList" :key="i + '1'">
                  <tr>
                    <th :rowspan="item.items.length + 1" class="text-center" >{{item.descriptionList}}</th>
                    <template v-for="(prop, index) in item.property" >
                      <tr :key="index + '2'">
                        <td style="width:30px">{{prop.pitch}}</td>
                        <td style="width:140px" class="text-center">{{prop.value}}</td>

                      </tr>
                      
                    </template>
                    <th style="width:155px"  :rowspan="item.items.length + 1" class="text-center" >{{item.descriptionTitle}}</th>
  
                  <!-- </tr>
                   <tr  v-for="(prop, index) in item.items" :key="index + '1'">
                    <td class="text-center">{{prop.part}}</td>
                    <td><input class="text-center" type="text" v-model="prop.grid"  @input="emitChanges(prop, index)"></td>
                    <td><input class="text-center" type="text" v-model="prop.meter"  @input="emitChanges(prop, index)"></td>
                    <td><input class="text-center" type="text" v-model="prop.total"  @input="emitChanges(prop, index)"></td>
                  </tr>
                  <tr> -->
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <th colspan="2" class="text-center">Length</th>
                    <td colspan="2" style="width:140px"></td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
     
  </v-container>
</template>
<script>
// import AreaData from '../assets/class/areadata/'
import {myMixin} from '../../Bankin/mixins/index'
export default {
  mixins: [myMixin],
  props: {
    index: Number,
  },
  components: {

  },  
  created(){
  },
  data: () => ({

      draftList: [
        {
        descriptionList: '1F Area',
        descriptionTitle: '-',
         property: [
          {pitch: 'p1', value: '0'},
          {pitch: 'p2', value: '0'},
        ],
        items: [
          {part: 'FW', grid: '0', meter: '0', total: '0'},
          {part: 'OW', grid: '0', meter: '0', total: '0'},
        ],
        },
       
      ]
    

    // temp: new AreaData
  }),
  methods: {
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
.v-select>.dropdown-menu { text-align: center; }
</style>
