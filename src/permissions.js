import Vue from "vue";
import router from "./router";
import { Message } from "element-ui";
import AuthenticationUtils from "@/common/AuthenticationUtils";
import store from "@/store";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
// import getPageTitle from '@/js/utils/get-page-title'
NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login", "/auth-redirect"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (window.isAuthenticated) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    }
    const user = await store.dispatch("user/getCurrentUser");
    if (!user) {
      // const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
      // router.addRoutes(accessRoutes)
      // next({ ...to, replace: true });
      await AuthenticationUtils.logout();
      Vue.use(Message.error("Has Error"));
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
    next();
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
