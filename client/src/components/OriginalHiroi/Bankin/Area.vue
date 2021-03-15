<template>
  <v-container fluid class="pa-0">
    <v-card flat>
      <v-row >
        <v-col cols="6" class="pa-0">
          <area-table :headers="AreaHeader" :items="areaData.bankin.area.items" :index="index" :selectedRow="selectedRow"></area-table>
          <total-table :headers="totalAreaHeaders"/>
        </v-col>
       <v-col cols="6" class="pr-1 pt-0">
            <pitch-table title="Pitch Table" :headers="standardHeaders" :rows="areaData.standard.mr"></pitch-table>
             <v-row>
                <v-col class="pa-0 ">
                  <balcony-table :index="index" :selectedRow="selectedRow"/>
                  <roof-garden :index="index" :selectedRow="selectedRow"/>
                 
                </v-col>
                <v-col  class="pa-0">
                  <parapet-table :index="index" :selectedRow="selectedRow"/>
                   <roof-garden1-vue :index="index" :selectedRow="selectedRow"/>
                </v-col>
             </v-row>
              <v-row>
                <v-col class="pa-0">
                    <total-table-length :headers="totalAmtHeaders"/>
                </v-col>
              </v-row>
       </v-col>
        
         <v-col cols="3" class="pa-0">
         
         </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import {myMixin} from '../Bankin/mixins/'
export default {
  mixins: [myMixin],
  props: {
    index: Number,
    selectedRow: Object
  },

  components: {
    AreaTable: () => import('./tables/AreaTable'),
    PitchTable: () => import('../PitchTable'),
    BalconyTable: ()=> import('./tables/BalconyTable'),
    ParapetTable:() => import('./tables/ParapetTable'),
    RoofGarden: () => import('./RoofGarden'),
    RoofGarden1Vue: () => import('./RoofGarden1'),
    TotalTable: () =>  import('./tables/TotalTableArea'),
    TotalTableLength: () =>  import('./tables/TotalTableLength')
  },
    created(){
    },

    methods:{
    }
}
</script>

<style scoped>
*{ text-transform: none !important; } 
</style>
