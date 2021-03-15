<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12>
        <v-card flat>
          <v-card-title v-text="'Gravity'"/>
          <v-card-subtitle>
            <a
              :href="download"
              v-text="label"
            />
          </v-card-subtitle>
          <v-card-text>
            <v-simple-table
              dense
            >
              <template v-slot:default>
                <thead>
                  <tr 
                    v-for="(tr, tr_i) in headerRows" :key="tr_i" 
                  >
                    <th 
                      v-for="(th, th_i) in tr" :key="th_i" 
                      :rowspan="th.rowspan" 
                      :colspan="th.colspan"
                      class="text-center"
                    >
                      {{th.value}}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="text-center"
                    v-for="(tr, tr_i) in items" :key="tr_i"
                  >
                    <td v-text="tr.floorName"/>
                    <td v-text="tr.num"/>
                    <td v-text="tr.x.size"/>
                    <td v-text="tr.y.size"/>
                    <td v-text="tr.overhangBalcony"/>
                    <td v-text="tr.x.axis.start"/>
                    <td v-text="tr.x.axis.startExt"/>
                    <td v-text="tr.x.axis.end"/>
                    <td v-text="tr.x.axis.endExt"/>
                    <td v-text="tr.y.axis.start"/>
                    <td v-text="tr.y.axis.startExt"/>
                    <td v-text="tr.y.axis.end"/>
                    <td v-text="tr.y.axis.endExt"/>
                    <td v-text="tr.formula"/>
                    <td v-roundTo="[tr.ai, 3]"/>
                    <td v-text="tr.roofB"/>
                    <td v-roundTo="[tr.wi, 3]"/>
                    <td v-roundTo="[tr.x.axis.centerGravity, 3]"/>
                    <td v-roundTo="[tr.y.axis.centerGravity, 3]"/>
                    <td v-roundTo="[tr.x.axis.weightXcenter, 3]"/>
                    <td v-roundTo="[tr.y.axis.weightXcenter, 3]"/>
                    <td v-roundTo="[tr.x.axis.centerGravity_G, 3]"/>
                    <td v-roundTo="[tr.y.axis.centerGravity_G, 3]"/>
                    
                  </tr> 
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template> 

<script>
import roundTo from '../plugins/roundto'
export default {
  props:[
    'items',
    'download',
    'label' 
  ],

  mixins: [
    roundTo
  ],

  data: ()=> ({
    headerRows: [
      [
        {value: '階', rowspan: '2', colspan: '2'},
        {value: 'X', rowspan: '2'},
        {value: 'Y', rowspan: '2'},
        {value: 'OverHang\nBalcony', rowspan: '2'},
        {value: 'X-Axis', colspan: '4'},
        {value: 'Y-Axis', colspan: '4'},
        {value: 'Formula', rowspan: '2'},
        {value: 'Ai', rowspan: '2'},
        {value: 'β', rowspan: '2'},
        {value: 'Wi=Ai・β', rowspan: '2'},
        {value: '重心（m）',  colspan: '2'},
        {value: '区画重量×重心', colspan: '2'},
        {value: '重心G（m）', colspan: '2'}
      ],
      [
        {value: 'Start'},
        {value: 'EXT'},
        {value: 'End'},
        {value: 'EXT'},
        {value: 'Start'},
        {value: 'EXT'},
        {value: 'End'},
        {value: 'EXT'},
        {value: 'Xi'},
        {value: 'Yi'},
        {value: 'Wi・Xi'},
        {value: 'Wi・Yi'},
        {value: 'Gx'},
        {value: 'Gy'},
      ]
    ],

    headers:[
      { text: 'Floor', value: 'floorName' },
      { text: 'Coordinate', value: 'num' },
      { text: 'XSize', value: 'x.size' },
      { text: 'YSize', value: 'y.size' },
      { text: 'Overhang Balcony', value: 'overhangBalcony' },
      { text: 'X Axis Start', value: 'x.axis.start' },
      { text: 'X Axis Start Ext', value: 'x.axis.startExt' },
      { text: 'X Axis End', value: 'x.axis.end' },
      { text: 'Y Axis End Ext', value: 'y.axis.endExt' },
      { text: 'Y Axis Start', value: 'y.axis.start' },
      { text: 'Y Axis Start Ext', value: 'y.axis.startExt' },
      { text: 'Y Axis End', value: 'y.axis.end' },
      { text: 'Y Axis End Ext', value: 'y.axis.endExt' },
      { text: 'Formula', value: 'formula' },
      { text: 'Ai', value: 'ai'},
      { text: 'β', value: 'roofB' },
      { text: 'Wi=Ai・β', value: 'wi' },
      { text: '重心（m）xi', value: 'x.axis.centerGravity' },
      { text: '重心（m）yi', value: 'y.axis.centerGravity' },
      { text: '区画重量×重心 Wi・Xi', value: 'x.axis.weightXcenter' },
      { text: '区画重量×重心 Wi・Yi', value: 'y.axis.weightXcenter' },
      { text: '重心G（m）xi', value: 'x.axis.centerGravity_G' },
      { text: '重心G（m）yi', value: 'y.axis.centerGravity_G' },
    ]
  })
}
</script>

<style scoped>
  table, th, td {
     border: 1px solid black;
     border-collapse: collapse;
  }
</style>