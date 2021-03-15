<template>
      <calculation-item
        v-model="balconyArea"
        caption='バルコニー面積'
      >
        <template 
          #default
        >
          <template
            v-for="(balcony, i) in dtx.balcony.items"
          >
            <v-list-item 
              dense
              :key="'b'+ i"
            >
          <v-list-item-subtitle >{{balcony.layerName}} {{balcony.name}}</v-list-item-subtitle>
          <v-list-item-action-text >{{balcony.areaInMeterSquared}}</v-list-item-action-text>
            </v-list-item>
              <v-divider
                v-if="i < dtx.computed.balconies.length - 1"
                :key="'div'+i"
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
    balconyArea(){
      return this.dtx.balcony.items.reduce((total, item) => total + item.areaInMeterSquared, 0)
    }
  },

  mixins: [
    roundTo
  ]
}
</script>
