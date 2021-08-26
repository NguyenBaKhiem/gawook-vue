<template>
  <div class="story-component">
    <hooper :itemsToShow="maxSlideItems" :key="maxSlideItems" ref="hooper">
      <slide v-for="i in 10" :key="i"> slide {{ i }} </slide>
    </hooper>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Hooper, Slide } from "hooper";
export default {
  name: "Story",
  components: {
    Hooper,
    Slide
  },
  props: {
    changeSlide: { type: Boolean, default: true },
    change: { type: String, default: "desktop" }
  },
  data() {
    return {
      maxSlideItems: 4
    };
  },
  mounted() {
    window.addEventListener("resize", this.$_resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.$_resizeHandler);
  },
  watch: {
    changeSlide(nval) {
      this.restartHooper(nval);
    },
    change(nval) {
      this.restartHooper(nval);
    }
  },
  computed: {
    ...mapGetters(["user", "device"])
  },
  methods: {
    $_resizeHandler() {
      let mainEl = document.getElementsByClassName("grid-main")[0];
      if (mainEl) {
        this.maxSlideItems =
          mainEl.clientWidth < 1000
            ? mainEl.clientWidth < 800
              ? mainEl.clientWidth < 600
                ? 3
                : 4
              : 5
            : 6;
      }
    },
    restartHooper(isOpenBar) {
      setTimeout(() => {
        let gridMainEl = document.getElementsByClassName("grid-content")[1];
        let rightBarWidth = isOpenBar ? 310 : 74;
        let hooperWidth =
          gridMainEl.getBoundingClientRect().width - rightBarWidth;
        if (gridMainEl) {
          this.maxSlideItems =
            hooperWidth < 1000
              ? hooperWidth < 800
                ? hooperWidth < 600
                  ? 3
                  : 4
                : 5
              : 6;
        }
      }, 501);
    }
  }
};
</script>
<style lang="scss">
.story-component {
  padding: 10px 0px 0;
  .hooper {
    outline: none;
    .hooper-list {
      .hooper-slide {
        background-color: #62caaa;
        padding: 20px;
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-align-items: center;
        align-items: center;
        color: #fff;
        border: 2px solid #fff;
        font-size: 30px;
        border-radius: 10px;
        box-shadow: inset 0px 0px 0px 2px #5eeefb;
        &.is-active {
          background-color: #47da7f;
        }
        &.is-current {
        }
      }
    }
  }
}
</style>
