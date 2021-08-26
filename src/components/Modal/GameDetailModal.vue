<template>
  <el-dialog
    title="Thông tin game"
    :visible.sync="show"
    width="60%"
    :show-close="false"
    :fullscreen="device !== 'desktop'"
    :before-close="close"
  >
    <a href="#">
      <el-avatar
        shape="square"
        :size="160"
        src="https://danhenk.com/wp-content/uploads/2019/12/sw.jpg"
        @error="errorHandler"
      >
        <img
          src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
        />
      </el-avatar>
    </a>
    <div class="hero">
      <div class="details">
        <div class="title1">The Hobbit <span>PG-13</span></div>
        <div class="title2">The Battle of the Five Armies</div>
        <div class="detail-game-info">
          <span>
            <el-rate v-model="rating" disabled show-score text-color="#ff9900">
            </el-rate>
            <span class="heart">120 <i class="icon-heart"></i></span>
          </span>
        </div>
        <div class="game-categories">
          <el-tag size="small">Chiến thuật</el-tag>
          <el-tag size="small">Đối kháng</el-tag>
        </div>
      </div>
    </div>
    <div class="description">
      <div class="column2">
        <p>
          Bilbo Baggins is swept into a quest to reclaim the lost Dwarf Kingdom
          of Erebor from the fearsome dragon Smaug. Approached out of the blue
          by the wizard Gandalf the Grey, Bilbo finds himself joining a company
          of thirteen dwarves led by the legendary warrior, Thorin Oakenshield.
          Their journey will take them into the Wild; through...
          <a href="#">read more</a>
        </p>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('close', null)">Cancel</el-button>
      <el-button type="primary">Confirm</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    show: { type: Boolean, default: false }
  },
  data() {
    return {
      rating: 4.5
    };
  },
  computed: {
    ...mapGetters(["user", "device"])
  },
  methods: {
    close() {
      this.$emit("close", null);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/_mixin.scss";
@keyframes panoramic {
  0% {
    background-position-y: 0%;
  }
  50% {
    background-position-y: 100%;
  }
  100% {
    background-position-y: 0%;
  }
}
.el-dialog {
  .el-avatar {
    border: 3px solid #ffffff;
    position: absolute;
    top: 160px;
    left: 50px;
    z-index: 2;
  }
  .hero {
    height: 342px;
    margin: 0;
    position: relative;
    overflow: hidden;
    z-index: 1;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    &:before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      overflow: hidden;
      top: 0;
      left: 0;
      background: url("https://lumiere-a.akamaihd.net/v1/images/tros-home-ent-announce-hero-mobile_de9df93f.jpeg?region=0,0,1024,626&width=960");
      z-index: -1;
      transform: skewY(-5deg);
      transform-origin: 0 0;
      -webkit-backface-visibility: hidden;
      animation-duration: 10s;
      animation-direction: alternate;
      animation-name: panoramic;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
      animation-fill-mode: both;
      will-change: background-position-y;
    }
    .details {
      padding: 75px 0 0 240px;
      .title1 {
        color: white;
        font-size: 44px;
        margin-bottom: 13px;
        position: relative;
        span {
          position: absolute;
          top: 3px;
          margin-left: 12px;
          background: #c4af3d;
          border-radius: 5px;
          color: #544c21;
          font-size: 14px;
          padding: 0px 4px;
        }
      }
      .title2 {
        color: #c7c1ba;
        font-size: 23px;
        font-weight: 300;
        margin-bottom: 15px;
      }
      .detail-game-info {
        span {
          .el-rate {
            display: inline;
          }
          &.heart {
            margin-left: 5px;
            vertical-align: bottom;
            .icon-heart {
              vertical-align: middle;
              @include icon-color(#f56c6c);
            }
          }
        }
      }
      .game-categories {
        span {
          @include margin-list(5px);
        }
      }
    }
  }
  .description {
    font-size: 16px;
    line-height: 26px;
    color: #b1b0ac;
    a {
      text-decoration: none;
      color: #5c7fb8;
    }

    a:hover {
      text-decoration: underline;
    }
    .column2 {
      padding-top: 30px;
      width: 100%;
      float: left;
    }
  }
}
</style>
