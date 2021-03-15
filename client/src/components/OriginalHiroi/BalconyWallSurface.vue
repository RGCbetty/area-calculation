<template>

    <calculation-item
      v-model="result"
      caption='バルコニー外壁部に接する長さ'
    >
      <template 
        #default
      >
        <template
          v-for="(balcony, i) in dtx.computed.balconies"
        >
          <v-list-item 
            dense
            :key="'b'+ i"
          >
        <v-list-item-subtitle >{{balcony.layerName}} {{balcony.name}}</v-list-item-subtitle>
        <v-list-item-action-text >{{balcony.wallsurface}}</v-list-item-action-text>
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
    result(){
      return this.dtx.computed.balconies.reduce((total, item) => total + item.wallsurface, 0)
    }
  },

  mixins: [
    roundTo
  ]
}
</script>
