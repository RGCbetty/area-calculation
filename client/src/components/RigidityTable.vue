<template>
  <v-container 
    align-center 
    fluid
  >
    <v-layout>
      <v-flex xs12>
        <v-simple-table
          dense
        >
          <template
            v-slot:default 
          >
            <thead>
              <tr
                v-for="(tr, tr_i) in headerRows" 
                :key="tr_i"
              >
                <th
                  v-for="(th, th_i) in tr" :key="th_i"
                  :rowspan="th.rowspan" 
                  :colspan="th.colspan"
                  class="text-center"
                  v-text="th.value"
                />
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(tr, tr_i) in items" :key="tr_i"
                class="text-center"
              >
                <td v-text="tr.floorName"/>
                <td v-text="tr.fromCoordinate"/>
                <td v-text="tr.bWValue"/>
                <td v-text="tr.bWLength"/>
                <td v-text="tr.formula"/>
                <td v-roundTo="[tr.lxi, 3]"/>
                <td v-roundTo="[tr.yi, 3]"/>
                <td v-roundTo="[tr.lxi_yi, 3]"/>
                <td v-roundTo="[tr.sy, 3]"/>
                <td v-roundTo="[tr.lxiyisy2, 3]"/>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import roundTo from '../plugins/roundto'

export default {
  props: {
    'caption': String,
    'items': Array
  },

  mixins: [
    roundTo
  ],

  data: () => ({
    headerRows: [
      [
        {value:'階', rowspan:'2'},
        {value:'COORDINATE', rowspan:'2'},
        {value:'BWValue', rowspan:'2'},
        {value:'BWLength', rowspan:'2'},
        {value:'存在長（m）', colspan:'2'},
        {value:'距離（m）'},
        {value:'存在長×距離'},
        {value:'剛心S(m)'},
        {value:'Lxi×(Yi-Sy)2', rowspan:'2'}
      ],
      [
        {value: 'Lxi', colspan:'2'},
        {value: 'Yi'},
        {value: 'Lxi・Yi'},
        {value: 'Sy'},
      ]
    ],

    headers:[
      { text: 'Floor', value: 'floorName' },
      { text: 'Coordinate', value: 'fromCoordinate' },
      { text: 'BWValue', value: 'bWValue' },
      { text: 'BWLength', value: 'bWLength' },
      { text: 'Formula', value: 'formula' },
      { text: 'BWLength', value: 'lxi' },
      { text: 'BWLength', value: 'yi' },
      { text: 'BWLength', value: 'lxi_yi' },
      { text: 'BWLength', value: 'sy' },
      { text: 'BWLength', value: 'lxiyisy2' }      
    ]
    
  }),

}

</script>

<style>

</style>