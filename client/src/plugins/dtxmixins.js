import { mapState, mapMutations } from 'vuex'
// import DTXClient from '../assets/dtx-client'

export default {
  install(Vue) {
    Vue.mixin({
      data: () => ({
        // dtx: new DTXClient(false),
        api: process.env.VUE_APP_URL,
      }),

      methods: {
        ...mapMutations([
          'CHANGE_BWLIST',
          'CHANGE_USER_INFO',
          'CHANGE_STATUS',
          'RESET_AREA_CALCULATION_DB',
        ]),
      },

      computed: {
        ...mapState(['areaData', 'areaDataDB', 'bwList', 'dtx', 'status']),
      },
    })
  },
}
