<template>
<h1>
  test
</h1>
  <!-- <calculation-item
    v-model="dtx.computed.dodaiMizukiri.totalPerimeter"
    caption='１階外周部長さ'
  >
    <template 
      #default
    >
      <v-list-item dense>
        <v-list-item-subtitle 
          v-text="'External Wall Length'"
        />

        <v-list-item-action-text 
          style="color:black" 
          v-roundTo="[dtx.computed.dodaiMizukiri.externwallLength, 3]"
        />
      </v-list-item>
      <v-divider/>

      <v-list-item 
        dense
      >
        <v-list-item-subtitle 
          v-text="'Doma Opening'"
        />

        <v-list-item-action-text 
          style="color:black" 
          v-roundTo="[dtx.computed.dodaiMizukiri.domaOpening, 3]"
        />
      </v-list-item> 
    </template>
  </calculation-item> -->
</template>

<script>

import roundTo from '../../plugins/roundto'

export default {

  components:{
    CalculationItem: () => import('../CalculationItem')
  },

  mixins: [
    roundTo
  ]
}
</script>
