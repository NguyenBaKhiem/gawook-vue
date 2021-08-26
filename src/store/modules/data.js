import rf from "requestfactory";

const state = {
  masterdata: {}
};
const getters = {
  userLanguages: state => {
    return (
      window._.filter(state.masterdata.languages, item => {
        const languages = state.user.languages || [];
        return languages.includes(item.code);
      }) || []
    );
  },

  toLanguage: state => code => {
    const filtered = window._.filter(state.masterdata.languages, item => {
      return item.code === code;
    });
    return window._.size(filtered) ? filtered[0].name : "";
  }
};
const mutations = {
  UPDATE_MASTER_DATA(state, data) {
    state.masterdata = data || {};
  }
};
const actions = {
  getMasterdata({ commit }) {
    return new Promise(resolve => {
      rf.getRequest("MasterdataRequest")
        .getAll()
        .then(res => {
          commit("UPDATE_MASTER_DATA", res.data);
          resolve(res.data);
        });
    });
  }
};

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
};
