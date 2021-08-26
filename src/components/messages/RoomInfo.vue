<template>
  <div class="grid-room-info"></div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "GameBar",
  data() {
    return {};
  },
  filters: {
    typeColor() {
      const typeMap = ["success", "info", "warning", "danger"];
      return typeMap[Math.floor(Math.random() * typeMap.length)];
    }
  },
  computed: {
    ...mapGetters(["user", "device"])
  },
  methods: {},
  watch: {}
};
</script>
<style lang="scss" scoped>
@import "@/styles/_mixin.scss";
.grid-room-info {
  width: 310px;
  flex-shrink: 0;
  background: linear-gradient(
    to top,
    rgba(34, 169, 186, 0.32) 0%,
    rgba(22, 229, 144, 0.32) 100%
  );
  transition: width 0.5s;
  &.table-grid {
    width: 74px;
    background: linear-gradient(
      to top,
      rgba(22, 229, 255, 0.7) 0%,
      rgb(118, 246, 194) 100%
    );
    ::v-deep .el-menu {
      width: 100%;
      background-color: transparent;
      .el-menu-item {
        &:hover,
        &:focus {
          background-color: #e8f4ff47;
          i {
            color: #ffffff;
          }
        }
        i {
          color: #e7e7e7;
        }
        [class^="el-icon-"] {
          font-size: 34px;
          width: 34px;
        }
      }
      .el-submenu {
        .el-submenu__title {
          padding: 0 10px;
          padding-left: 13px !important;
          &:hover,
          &:focus {
            background-color: #e8f4ff47;
            img {
              transform: scale(1.116);
            }
          }
          img {
            border-radius: 12px;
          }
        }
      }
    }
  }
  .title-extentions {
    color: #ffffff;
    margin: 10px 55px 15px 5px;
  }
  .icon-joystick-1 {
    @include icon-color(#ffffff);
  }
  ::v-deep.el-divider {
    margin: 10px 0;
    .el-divider__text {
      position: absolute;
      background-color: transparent;
      top: 1px;
      color: #303133;
      font-size: 32px;
    }
  }
  .game-list {
    height: calc(100vh - 65px);
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    margin: 0 auto;
    padding: 5px;
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 0;
    }

    // &::-webkit-scrollbar-track-piece {
    //   background-color: #ffffff;
    // }

    &::-webkit-scrollbar {
      width: 5px;
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-image: -webkit-gradient(
        linear,
        left bottom,
        left top,
        color-stop(0.44, #16e590),
        color-stop(0.62, #497dbd),
        color-stop(0.86, #16e590)
      );
    }
  }
}

.game-menu {
  background-color: red;
  ::v-deep.el-menu--vertical {
    background: red;
  }
}
</style>
<style lang="scss">
$teal: #16e590;
$cubic-slow: cubic-bezier(0.7, 0.01, 0.37, 1);
@import "@/styles/_mixin.scss";
.el-menu--vertical {
  .game-summary {
    .el-menu-item-group__title {
      padding: 0 !important;
      .game-cover {
        padding: 6px 0 6px 20px;
        margin-top: -5px;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        height: 100px;
        background-repeat: round space;
        background-size: cover;
        &:hover,
        &:focus {
          .play-button {
            svg {
              .polygon {
                transform: translateZ(0px) rotate(90deg);
                fill: #67fbbe;
              }
            }
          }
        }
        .play-button {
          display: inline-block;
          width: 32px;
          height: 32px;
          transition: 0.5s;
          position: absolute;
          left: 80px;
          top: 36px;
          cursor: pointer;
          svg {
            overflow: visible;
            .polygon {
              fill: $teal;
              transition: transform 0.5s, fill 0.5s;
              transition-timing-function: $cubic-slow;
              transform-origin: 50% 50%;
            }
          }
        }
        .game-title {
          font-size: 16px;
          font-weight: bold;
        }
        .icon-star-1 {
          @include icon-color(#ffa000);
        }
        .icon-heart {
          @include icon-color(#f56c6c);
        }
      }
    }
    .el-menu-item {
      height: 27px;
      line-height: 27px;
    }
  }
}
</style>
