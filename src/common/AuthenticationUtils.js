import Vue from "vue";
import store from "@/store";

export default class AuthenticationUtils {
  static isAuthenticated() {
    AuthenticationUtils.loadDataIfNeed();
    return !!AuthenticationUtils.accessToken;
  }

  static saveAuthenticationData(token) {
    AuthenticationUtils.accessToken = token || "";
    window.localStorage.setItem("access_token", token || "");
  }

  static removeAuthenticationData() {
    AuthenticationUtils.saveAuthenticationData("");
    AuthenticationUtils.accessToken = "";
    // AuthenticationUtils.setLocale("en");
  }

  static getAccessToken() {
    AuthenticationUtils.loadDataIfNeed();

    return AuthenticationUtils.accessToken;
  }

  static loadData() {
    AuthenticationUtils.accessToken =
      window.localStorage.getItem("access_token") || "";
    AuthenticationUtils.dataLoaded = true;
  }

  static loadDataIfNeed() {
    if (
      AuthenticationUtils.dataLoaded === undefined ||
      !AuthenticationUtils.dataLoaded
    ) {
      AuthenticationUtils.loadData();
    }
  }

  // static setLocale(newLocale = null) {
  //   const locale = newLocale || AuthenticationUtils.getLocale();

  //   if (locale === AuthenticationUtils.getLocale()) {
  //     return;
  //   }

  //   const html = document.documentElement;
  //   html.setAttribute("lang", locale);

  //   window.i18n.locale = locale;
  //   window.app.$broadcast("UPDATED_LOCALE", locale);

  //   return window.localStorage.setItem("locale", locale);
  // }

  static logout() {
    // const user = window.app.$store.state.user || {};

    AuthenticationUtils.removeAuthenticationData();
    Vue.prototype.$isAuthenticated = window.isAuthenticated = false;
    window.axios.defaults.withCredentials = false;
    window.axios.defaults.headers.common.Authorization = "";

    store.dispatch("user/logout");
  }

  static login(token) {
    AuthenticationUtils.saveAuthenticationData(token);
    window.axios.defaults.withCredentials = true;
    window.axios.defaults.headers.common.Authorization = `Bearer ${AuthenticationUtils.getAccessToken()}`;

    window.isAuthenticated = AuthenticationUtils.isAuthenticated();
    Vue.prototype.$isAuthenticated = window.isAuthenticated;
  }
  static getLocale(defaultLocale = "vi") {
    return window.localStorage.getItem("locale") || defaultLocale;
  }
}
