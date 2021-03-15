import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import DTXClient from '@/assets/dtx-client'
import userModule from './userModule'
import AreaData from './assets/class/areadata'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users: userModule,
  },

  state: {
    dtx: new DTXClient(false),
    areaData: new AreaData(),
    areaDataDB: new AreaData(),
    isLoading: false,
    drawer: false,
    bwList: [[[], [], [], []], [[], [], [], []]],
  },

  mutations: {
    drawer: (state, data) => {
      state.drawer = data
    },
    loading: (state, data) => {
      state.isLoading = data
    },
    CHANGE_BWLIST: (state, data) => {
      state.bwList = data
    },
    setDTX: (state, payload) => {
      state.dtx = payload.dtx
      state.areaData = payload.area
    },
    RESET_AREA_CALCULATION_DB: (state, payload) => {
      state.areaDataDB = payload.area
    },
  },

  actions: {},

  plugins: [
    createPersistedstate({
      key: 'xxxxxxxxxx',
      paths: ['users.user'],
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) =>
          Cookies.set(key, value, { expires: 3, secure: false }),
        removeItem: key => Cookies.remove(key),
      },
    }),
  ],
})
