<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12>
        <v-card flat>
          <v-card-title v-text="'Eccentricity'"/>
          <v-card-text>
            <v-simple-table
              dense
            >
              <template v-slot:default>
                <thead>
                  <tr>
                    <th 
                      v-for="(th, th_i) in headers" 
                      :key="th_i" 
                      class="text-center"
                      v-text="th.text"
                    />
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(tr, tr_i) in items" :key="tr_i"  
                    class="text-center"
                  >
                    <td v-text="tr.floorName"/>
                    <td v-text="tr.axisName"/>
                    <td v-roundTo="[tr.centerGravity_G, 3]"/>
                    <td v-roundTo="[tr.rigidity_S, 3]"/>
                    <td v-roundTo="[tr.kr, 3]"/>
                    <td v-roundTo="[tr.elasticRadius_R, 3]"/>
                    <td v-roundTo="[tr.eccentricDistance_L, 3]"/>
                    <td v-roundTo="[tr.eccentricity_E, 3]"/>
                    <td v-text="tr.judgement"/>
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
    'items'
  ],

  mixins: [
    roundTo  
  ],

  data: () => ({
    headers:[
      { text: '階', value: 'floorName' },
      { text: '方向', value: 'axisName' },
      { text: '重心 G（m）', value: 'centerGravity_G' },
      { text: '剛心 S（m）', value: 'rigidity_S' },
      { text: 'Kr Lxi×(Yi-Sy)2 + Lyi×(Xi-Sx)2', value: 'kr' },
      { text: '弾力半径 R（m）( Kr / 存在長（計）)', value: 'elasticRadius_R' },
      { text: '偏心距離 L（m）(G - S)', value: 'eccentricDistance_L' },
      { text: '偏心率 E(R - L)', value: 'eccentricity_E' },
      { text: '判定（ ≦0.3 )( E ≦0.3 )', value: 'judgement' }
    ]
  })
}

</script>

<style>

</style>