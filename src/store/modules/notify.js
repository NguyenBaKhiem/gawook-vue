import rf from "requestfactory";

const state = {
  notifications: []
};

const mutations = {
  UPDATE_NOTIFICATIONS: (state, data) => {
    if (window._.isEmpty(data)) {
      return;
    }
    state.notifications = window._.concat(data, state.notifications);
  }
};
const actions = {
  getNotifications({ commit }) {
    return new Promise(resolve => {
      rf.getRequest("NotificationRequest")
        .getNotifications()
        .then(res => {
          commit("UPDATE_NOTIFICATIONS", res.data);
          resolve(res.data);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
