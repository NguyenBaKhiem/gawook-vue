import LocalStorage from "@/common/LocalStorageUtils";

const state = {
  conversations: []
};

const mutations = {
  SET_CONVERSATION: (state, conversations) => {
    LocalStorage.saveItem("conversaitons", conversations);
  },
  UPDATE_CONVERSATION: (state, item) => {
    let conversations = state.conversation.push(item);
    LocalStorage.saveItem("conversaitons", conversations);
  },
};

const actions = {
  setConversation({ commit }, conversations) {
    commit("SET_CONVERSATION", conversations);
  },
  updateConversation({ commit }, item) {
    commit("SET_CONVERSATION", item);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
