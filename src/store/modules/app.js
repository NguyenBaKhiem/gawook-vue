import LocalStorage from "@/common/LocalStorageUtils";
import { getLanguage } from "@/lang/index";

const state = {
  device: "desktop",
  size: LocalStorage.getItem("size") || "medium",
  language: getLanguage()
};

const mutations = {
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language;
    LocalStorage.saveItem("language", language);
  },
  SET_SIZE: (state, size) => {
    state.size = size;
    LocalStorage.saveItem("size", size);
  }
};

const actions = {
  toggleDevice({ commit }, device) {
    commit("TOGGLE_DEVICE", device);
  },
  setLanguage({ commit }, language) {
    commit("SET_LANGUAGE", language);
  },
  setSize({ commit }, size) {
    commit("SET_SIZE", size);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
