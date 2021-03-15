<template>
  <roof-garden-table
    title="Roof Garden"
    :items="items"
    :index="index"
    keep-alive
  ></roof-garden-table>
</template>
<script>
// import AreaData from '../../../assets/class/areadata'
// import {myMixin} from './mixins/index'
// import {myMixin} from '../../../../assets/class/areadata/bankin/mixins'
export default {
  props: {
    index: Number,
    items: Array,
  },

  components: {
    RoofGardenTable: () => import('./tables/RoofGardenTable'),
  },

  created() {},

  data: () => ({
    // temp : new AreaData,
  }),
  methods: {},
}
</script>
<style scoped>
</style>
