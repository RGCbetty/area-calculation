<template>
  <calculation-item
    v-model="toNumber"
    caption='オリジナル太陽光総出力'
    detail="false"
  >
  </calculation-item>
</template>

<script>
export default {
  props: [
    'item'
  ],
  data(){
    return {
    }
  },
  components: {
    CalculationItem: () => import('../CalculationItem')
  },
  computed: {
    toNumber(){
      return !this.item  ? 0 : this.item  
    }
  }
}
</script>

