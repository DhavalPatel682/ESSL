// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    filteredSchools: []  // This will store the filtered schools data
  },
  mutations: {
    setFilteredSchools(state, schools) {
      state.filteredSchools = schools;
    }
  },
  actions: {
    updateFilteredSchools({ commit }, schools) {
      commit('setFilteredSchools', schools);
    }
  },
  getters: {
    getFilteredSchools: state => state.filteredSchools
  }
});
