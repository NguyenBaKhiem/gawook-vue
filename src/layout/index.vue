<template>
  <div :class="classObj" class="app-wrapper">
    <!-- <div v-if="device==='mobile'" class="drawer-bg" />  -->
    <div class="main-container">
      <app-main />
    </div>
  </div>
</template>

<script>
import { AppMain } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import { mapState } from "vuex";

export default {
  name: "Layout",
  components: {
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      device: state => state.app.device,
      usersOnline: state => state.user.usersOnline
    }),
    classObj() {
      return {
        mobile: this.device === "mobile"
      };
    }
  },
  methods: {
    getSocketEventHandlers() {
      return {
        UserOnline: this.onUserOnline,
        UserJoining: this.onUserJoining,
        UserLeaving: this.onUserLeaving
      };
    },
    onUserOnline(data) {
      this.$store.commit("user/UPDATE_USERS_ONLINE", data);
    },
    onUserJoining(userId) {
      this.$store.commit("user/USER_JOINING", userId);
    },

    onUserLeaving(userId) {
      this.$store.commit("user/USER_LEAVING", userId);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/element/mixin.scss";
@import "~@/styles/element/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
