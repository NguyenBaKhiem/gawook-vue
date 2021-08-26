require("./bootstrap");
import Vue from "vue";

import store from "./store";
import router from "./router";

import "normalize.css/normalize.css";

import Element from "element-ui";

import LocalStorage from "@/common/LocalStorageUtils";
import VueBroadcast from "@/common/VueBroadcast";
import GlobalSocket from "@/common/GlobalSocket";
import * as vClickOutside from "v-click-outside-x";
import * as filters from "@/filters";
import VueOnline from "@/common/VueOnline";

import VueTilt from "vue-tilt.js";
import i18n from "./lang";

import "./registerServiceWorker";
import "./validations";
import "./permissions.js";

Vue.config.productionTip = false;

Vue.use(VueTilt);
Vue.use(VueBroadcast);
Vue.use(vClickOutside);
Vue.use(VueOnline);
window.GlobalSocket = new GlobalSocket();
Vue.use(Element, {
  size: LocalStorage.getItem("size") || "medium",
  i18n: (key, value) => i18n.t(key, value)
});

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.keyCodes = {
  mention: 16 && 50
};
import linkify from 'vue-linkify'

Vue.directive('linkified', linkify)

import "@/styles/element/element-variables.scss";
import "@/styles/app.scss";
import App from "./App.vue";

Vue.mixin({
  methods: {
    errorHandler() {
      return true;
    }
  }
});

window.app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
