<template>
  <div
    class="grid-extentions"
    :class="
      this.device === 'desktop'
        ? rightBarOpen == true
          ? ''
          : 'table-grid'
        : 'table-grid'
    "
    v-if="device !== 'mobile'"
  >
    <template v-if="this.device === 'desktop' && rightBarOpen">
      <h3 class="title-extentions">
        <i class="icon-list cursor-pointer" @click="rightBarOpen = false"></i>
        <span style="vertical-align: text-top;">Game đã chơi</span>
        <span class="f-r">
          <i class="icon-grid-list cursor-pointer" title="Tất cả"
            ><span class="path1"></span><span class="path2"></span
            ><span class="path3"></span><span class="path4"></span
            ><span class="path5"></span><span class="path6"></span
            ><span class="path7"></span><span class="path8"></span
            ><span class="path9"></span><span class="path10"></span
            ><span class="path11"></span><span class="path12"></span
          ></i>
        </span>
      </h3>
      <el-divider>
        <i class="icon-joystick-1"></i>
      </el-divider>
      <div class="game-list">
        <template v-for="(game, index) in games">
          <game-item
            :key="index"
            :game="game"
            @detail-game="detailGame = $event"
          />
        </template>
      </div>
    </template>
    <template v-else>
      <el-menu
        :collapse="true"
        class="game-menu"
        text-color="#969696"
        active-text-color="#969696"
      >
        <el-menu-item index="0" @click.native="rightBarOpen = true">
          <i class="el-icon-menu"></i>
          <span slot="title">Tất cả</span>
        </el-menu-item>
        <template v-for="(game, index) in games">
          <el-submenu :index="'1' + index" :key="index">
            <template slot="title">
              <img :src="game.avatar" width="48" height="48" />
            </template>
            <el-menu-item-group class="game-summary">
              <div
                slot="title"
                class="game-cover"
                :style="{ 'background-image': `url('${game.cover}')` }"
              >
                <a class="play-button">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 50 50"
                  >
                    <path
                      d="M42.7,42.7L25,50L7.3,42.7L0,25L7.3,7.3L25,0l17.7,7.3L50,25L42.7,42.7z"
                      class="polygon"
                    ></path>
                    <polygon points="32.5,25 21.5,31.4 21.5,18.6 "></polygon>
                  </svg>
                </a>
                <div class="game-title">{{ game.name }}</div>
                <span>{{ game.star }} <i class="icon-star-1"></i></span>
                <span>{{ game.heart }} <i class="icon-heart"></i></span>
              </div>
              <el-menu-item @click.native="detailGame = game.id"
                >Xem chi tiết</el-menu-item
              >
              <el-menu-item>Xóa</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </template>
    <game-detail-modal
      :id="detailGame"
      :show="detailGame !== null"
      @close="detailGame = $event"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import GameItem from "@/components/games/GameItem";
import GameDetailModal from "@/components/Modal/GameDetailModal";
export default {
  name: "GameBar",
  components: { GameItem, GameDetailModal },
  data() {
    return {
      detailGame: null,
      rightBarOpen: true,
      games: [
        {
          id: 1,
          name: "Slither",
          avatar:
            "https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/2b/85/16/2b8516ba-b271-4685-0568-7be17ffb92bb/source/512x512bb.jpg",
          cover:
            "https://d21950x0o1sh55.cloudfront.net/uploads/inside_exclusif/picture/26/desktop_VALERIAN_BNP_68.jpg",
          summany: "Thư giãn làm chủ bãi săn mồi",
          star: "4.7",
          heart: 120,
          categories: ["Linh hoạt", "Thú vị"]
        },
        {
          id: 2,
          name: "Star Wars",
          avatar:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1200px-Star_Wars_Logo.svg.png",
          cover:
            "https://lumiere-a.akamaihd.net/v1/images/tros-home-ent-announce-hero-mobile_de9df93f.jpeg?region=0,0,1024,626&width=960",
          summany: "Cùng bạn bè chiến đấu chống lại kẻ phá hủy ngân hà",
          star: "4.5",
          heart: 220,
          categories: ["Chiến thuật", "Đối kháng"]
        },
        {
          id: 2,
          name: "Bắn máy bay",
          avatar:
            "https://zoapk.com/wp-content/uploads/2019/12/B%E1%BA%AFn-M%C3%A1y-Bay-H%E1%BA%A1m-%C4%90%E1%BB%99i-Chi%E1%BA%BFn-C%C6%A1-MOD-H1.png",
          cover:
            "https://d21950x0o1sh55.cloudfront.net/assets/home/game-0e307d71d9838e8fbe4927b551f119bcd9e4748f2c2b70c7b81846702996ef94.jpg",
          summany: "Chống lại đế chế xâm lược người ngoài hành tinh",
          star: "4.0",
          heart: 100,
          categories: ["Chiến thuật", "Thú vị"]
        },
        {
          id: 4,
          name: "GTA V",
          avatar:
            "https://www.wallpaperu3.com/wp-content/mywallpapers/gta-5-wallpaper-1280x1024.jpg",
          cover:
            "https://vignette.wikia.nocookie.net/gta/images/0/02/HeistsUpdate-GTAO-Artwork.jpg/revision/latest?cb=20180627033217&path-prefix=vi",
          summany:
            "Michael là một tên cướp ngân hàng chuyên nghiệp đã nghỉ hưu, sau khi có một thỏa thuận với FIB, trở về với cuộc sống của một kẻ tội phạm.",
          star: "4.9",
          heart: 520,
          categories: ["Nhập vai", "Hành Động"]
        },
        {
          id: 5,
          name: "Cờ Caro",
          avatar:
            "https://gamebaiapk.com/wp-content/uploads/2018/08/Game-C-Ca-r-ZingPlay-Caro-1.2-APK-Android.png",
          cover:
            "https://mst.game24h.vn/upload/2018/2018-4/game/2018-10-11/1539248260_game-co-caro-online-1.png",
          summany: "Đơn giản nhưng đòi hỏi phải có trí tuệ cao",
          star: "4.2",
          heart: 300,
          categories: ["Trí tuệ", "Đối kháng"]
        }
      ]
    };
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
  methods: {
    openGameDetail(id) {
      this.detailGame = window._.cloneDeep(id);
    }
  },
  watch: {
    rightBarOpen(val) {
      this.$emit("right-bar-hander", val);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/_mixin.scss";
.grid-extentions {
  width: 310px;
  background: linear-gradient(
      to top,
      rgba(34, 169, 186, 0.32) 0%,
      rgba(22, 229, 144, 0.32) 100%
    ),
    url("../../assets/images/background.jpg") center / contain repeat-y;
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
