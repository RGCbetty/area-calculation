<template>
  <ParapetTable 
    :index="index"
    keep-alive  
    ></ParapetTable>
</template>
<script>
// import AreaData from '../../../assets/class/areadata'
// import {myMixin} from './mixins/index'
// import {myMixin} from '../../../../assets/class/areadata/bankin/mixins'
export default {
  props:[
    'index'
  ],
  
  components: {
    ParapetTable: () => import('./tables/ParapetTable')
  },  

  created(){
  },

  data: () => ({
    // temp : new AreaData,
  }),
  methods: {

  }
}
</script>
<style scoped>

</style>
