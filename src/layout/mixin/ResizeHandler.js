import store from "@/store";

const { body } = document;
const MOBILEWIDTH = 768; // refer to Bootstrap's responsive design
const TABLETWIDTH = 1024; // refer to Bootstrap's responsive design

export default {
  watch: {
    $route() {
      if (this.device === "mobile") {
        // store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    window.addEventListener("resize", this.$_resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.$_resizeHandler);
  },
  mounted() {
    const isMobile = this.$_isMobile();
    const isTablet = this.$_isTablet();
    if (isMobile) {
      store.dispatch("app/toggleDevice", "mobile");
    } else if (isTablet) {
      store.dispatch("app/toggleDevice", "tablet");
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < MOBILEWIDTH;
    },
    $_isTablet() {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < TABLETWIDTH && rect.width - 1 > MOBILEWIDTH;
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile();
        const isTablet = this.$_isTablet();
        store.dispatch(
          "app/toggleDevice",
          isMobile ? "mobile" : isTablet ? "tablet" : "desktop"
        );

        // if (isMobile) {
        //   store.dispatch('app/closeSideBar', { withoutAnimation: true })
        // }
      }
    }
  }
};
