<template >
  <div>
    <v-card-title style="color: black">Total Length</v-card-title>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr v-for="(th, i) in headers" :key="i">
            <th class="text-center" v-html="th.id"></th>
            <th class="text-center" v-html="th.name"></th>
            <th class="text-center" v-html="th.value"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, a) in items"
            :key="a"
            style="font-size: 10px; line-height: 0px; height: 1px"
          >
            <td class="text-center">
              {{ item.id }}
            </td>
            <td class="text-center">
              {{ item.name }}
            </td>
            <td class="text-center">
              {{ Number(Math.round(item.total + 'e' + 3) + 'e-' + 3) }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import { myMixin } from '../mixins/index'
export default {
  mixins: [myMixin],
  name: 'TotalTable',

  props: {
    headers: Array,
    items: Array,
  },
  data: () => ({}),
  computed: {
    //   computeData(){
    //   let data= this.lengthData
    //   let balcony =  this.balcony
    //   let parapet = this.parapet
    //   let roofgarden=  this.roofgarden
    //   let balconyFW=0,balconyOW=0,parapetFW=0,parapetOW=0,roofgardenFW=0,roofgardenOW=0,
    //    roofgardenFW1=0,roofgardenOW1=0
    //     for(let a = 0 ;a<data.length;a++){
    //       data[a].total=''
    //       let val1 = _.find(this.areaData.items,{id: data[a].id})
    //       if(val1!=undefined) {
    //         val1.value = 0
    //       }
    //     }
    //     balcony=0
    //     parapet=0
    //     roofgardenFW=0
    //      //BALCONY
    //       this.areaData.bankin.balcony.items.filter(arr=>{
    //          let a = _.find( this.areaData.bankin.balcony.items, {description : arr.description})
    //         if(a.properties[0].total!='' && a.properties[1].total!='') balcony+=1
    //           arr.properties.map(arr1=>{
    //             if(arr1.total!=''){
    //               if(arr1.part=='FW') balconyFW+= Number(Math.round((arr1.total)  +'e3')+'e-3')
    //               else balconyOW += Number(Math.round((arr1.total)  +'e3')+'e-3')
    //             }
    //           })
    //            this.areaData.bankin.total.balcony_length = balcony
    //            data[0].total = balconyFW
    //            data[1].total = balconyOW
    //       })
    //        //PARAPET
    //        this.areaData.bankin.parapet.items.filter(arr=>{
    //         let a = _.find( this.areaData.bankin.parapet.items, {description : arr.description})
    //         if(a.properties[0].total!='' && a.properties[1].total!='') parapet+=1
    //           arr.properties.map(arr1=>{
    //               if(arr1.total!=''){
    //                 if(arr1.part=='FW') parapetFW+= Number(Math.round((arr1.total)  +'e3')+'e-3')
    //                 else parapetOW += Number(Math.round((arr1.total)  +'e3')+'e-3')
    //               }
    //           })
    //             this.areaData.bankin.total.parapet_length = parapet
    //            data[2].total = parapetFW
    //            data[3].total = parapetOW
    //       })
    //       //ROOF GARDEN
    //       for(let x=0;x< this.areaData.bankin.roofgarden.items.length;x++){
    //         let a = this.areaData.bankin.roofgarden.items[x]
    //         let c = _.find(this.areaData.bankin.roofgarden.items,{description:a.description})
    //         if(c.properties[0].total!='' && c.properties[1].total!='') roofgarden+=1
    //         for(let b=0;b<a.properties.length;b++){
    //           if(a.properties[b].total!=''){
    //             if(a.properties[b].part=='FW') roofgardenFW+= Number(Math.round((a.properties[b].total)  +'e3')+'e-3')
    //             else roofgardenOW+= Number(Math.round((a.properties[b].total)  +'e3')+'e-3')
    //           }
    //         }
    //       }
    //       for(let x=0;x< this.areaData.bankin.roofgarden.items1.length;x++){
    //           let a = this.areaData.bankin.roofgarden.items1[x]
    //         let c = _.find(this.areaData.bankin.roofgarden.items1,{description:a.description})
    //           if(c.properties[0].total!='' && c.properties[1].total!='') roofgarden+=1
    //         for(let b=0;b<a.properties.length;b++){
    //           if(a.properties[b].total!=''){
    //             if(a.properties[b].part=='FW' && a.properties[b].total!='') roofgardenFW1+= Number(Math.round((a.properties[b].total)  +'e3')+'e-3')
    //             else roofgardenOW1+= Number(Math.round((a.properties[b].total)  +'e3')+'e-3')
    //           }
    //         }
    //       }
    //       this.areaData.bankin.total.roofgarden_length = roofgarden
    //      data[4].total = roofgardenFW+roofgardenFW1
    //      data[5].total = roofgardenOW+roofgardenOW1
    //      for(let a = 0 ;a<data.length;a++){
    //       let val1 = _.find(this.areaData.items,{id: data[a].id})
    //       if(val1!=undefined) {
    //         if(val1.id == data[0].id) val1.value = data[0].total;
    //         if(val1.id == data[1].id) val1.value = data[1].total;
    //         if(val1.id == data[2].id) val1.value = data[2].total;
    //         if(val1.id == data[3].id) val1.value = data[3].total;
    //         if(val1.id == data[4].id) val1.value = data[4].total;
    //         if(val1.id == data[5].id) val1.value = data[5].total;
    //       }
    //     }
    //     return data
    //  }
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
