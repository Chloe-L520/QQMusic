import Vue from 'vue'
import Vuex from 'vuex'
import player from './player'
import userx from './userx'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userx,
    player
  }
})
