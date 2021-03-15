<template>

  <calculation-item
    v-model="result"
    caption='破風+鼻隠し/総長さ'
  >
    <template 
      #default
    >
      <template
        v-for="(yane, i) in dtx.yane.items"
      >

        <v-card
          flat
          :key="'y'+ i"
        >
          <v-list-item 
            dense
            :key="'slant'+ i"
          >
            <v-list-item-subtitle >{{yane.layerName}} {{yane.pitch}} Slant</v-list-item-subtitle>
            <v-list-item-action-text v-roundTo="[yane.kerabaHafuLength, 3]"/>
          </v-list-item>

          <v-list-item 
            dense
            :key="'horizontal'+ i"
          >
            <v-list-item-subtitle >{{yane.layerName}} {{yane.pitch}} Horizontal</v-list-item-subtitle>
            <v-list-item-action-text v-roundTo="[yane.horizontalHafuLength, 3]"/>
          </v-list-item>

        </v-card>
        
        <v-divider
          v-if="i < dtx.yane.items.length - 1"
          :key="'yanediv' + i"
        />

      </template>
    </template>
  </calculation-item>
</template>

<script>

import roundTo from '../../plugins/roundto'

export default {

  components:{
    CalculationItem: () => import('../CalculationItem')
  },

  computed: {
    result(){
      return this.dtx.yane.items.reduce((total, item) => total + item.horizontalHafuLength + item.kerabaHafuLength, 0)
    }
  },

  mixins: [
    roundTo
  ]
}
</script>