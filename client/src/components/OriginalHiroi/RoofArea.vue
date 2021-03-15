<template>

  <calculation-item
    v-model="roofAreaInMeterSquared"
    caption='屋根①／ｵﾘｼﾞﾅﾙ太陽光ﾊﾟﾈﾙ合計 '
  >
    <template 
      #default
    >
      <template
        v-for="(yane, i) in dtx.yane.items"
      >
        <v-list-item 
          dense
          :key="'y'+ i"
        >
      <v-list-item-subtitle >屋根{{yane.name}}／ｵﾘｼﾞﾅﾙ太陽光ﾊﾟﾈﾙ{{yane.layerName}}</v-list-item-subtitle>
      <v-list-item-action-text v-roundTo="[yane.roofArea, 3]"/>
        </v-list-item>
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
    roofAreaInMeterSquared(){
      return this.dtx.yane.items.reduce((total, item) => total + item.roofArea, 0)
    }
  },

  mixins: [
    roundTo
  ]
}
</script>
