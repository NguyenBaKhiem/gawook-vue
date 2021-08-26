import Vue from "vue";
import rf from "requestfactory";
import { resetRouter } from "@/router";

const state = {
  status: "pending",
  user: {},
  usersOnline: {},
  roles: []
};

const mutations = {
  UPDATE_STATUS: (state, status) => {
    Vue.set(state, "status", status);
  },

  UPDATE_USER: (state, data) => {
    state.user = data || {};
  },

  UPDATE_USERS_ONLINE: (state, data) => {
    state.usersOnline = data;
  },

  USER_JOINING: (state, user) => {
    state.usersOnline.push(user);
  },

  USER_LEAVING: (state, userId) => {
    let userLeft = state.usersOnline.findIndex(user => user.id == userId);
    state.usersOnline.splice(userLeft, 1);
  }
};
const actions = {
  getCurrentUser({ commit }) {
    return new Promise((resolve, reject) => {
      rf.getRequest("UserRequest")
        .getCurrentUser()
        .then(res => {
          if (!res) {
            reject("Verification failed, please Login again.");
          }
          commit("UPDATE_USER", res.data);
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // async init({ commit }) {
  //   try {
  //     if (window.isAuthenticated) {
  //       await this.dispatch('user/getCurrentUser');
  //       commit('UPDATE_STATUS', 'success');
  //     }
  //   } catch (e) {
  //     console.error(e);

  //     commit('UPDATE_STATUS', 'error');
  //   }
  // },
  updateUser({ commit }, data) {
    commit("UPDATE_USER", data);
  },
  logout({ commit }) {
    return new Promise(resolve => {
      commit("UPDATE_USER", {});
      resetRouter();
      resolve();
    }).catch(error => {
      console.log(error);
    });
  },

  login() {
    this.dispatch("user/getCurrentUser");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
