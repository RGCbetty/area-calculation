<template>
  <balcony-table 
    :index="index"
    keep-alive  
    ></balcony-table>
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
    BalconyTable: () => import('./tables/BalconyTable')
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
