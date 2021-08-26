<template>
  <div
    v-tilt="{ glare: true, 'max-glare': 1.2, max: 5, scale: 1.03 }"
    class="card"
    :style="{ 'background-image': `url('${game.cover}')` }"
  >
    <div class="more_info" :class="visibleItem ? 'show' : ''">
      <div class="game-avatar">
        <el-avatar :size="40" :src="game.avatar" @error="errorHandler">
          <img
            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
          />
        </el-avatar>
      </div>
      <div class="content">
        <div class="game-name">
          <span>{{ game.name }}</span>
        </div>
        <div class="detail-game-info">
          <span>{{ game.star }} <i class="icon-star-1"></i></span>
          <span>{{ game.heart }} <i class="icon-heart"></i></span>
        </div>
        <div class="game-categories">
          <el-tag
            size="mini"
            v-for="(c, index) in game.categories"
            :key="index"
            :type="$options.filters.typeColor()"
            >{{ c }}</el-tag
          >
        </div>
        <label for="show-menu" class="menu-button">
          <el-dropdown size="small" type="primary">
            <i class="el-icon-more"></i>
            <el-dropdown-menu
              slot="dropdown"
              @mouseover.native="visibleItem = true"
              @mouseleave.native="visibleItem = false"
            >
              <el-dropdown-item
                icon="el-icon-check"
                @click.native="$emit('detail-game', game.id)"
                >Xem chi tiết</el-dropdown-item
              >
              <el-dropdown-item icon="el-icon-close">Xóa</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </label>
      </div>
    </div>
    <div class="card__content">
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
      <div class="card__content--description">
        <h3 class="roll-up">
          <span><span>P</span><span>P</span></span>
          <span><span>l</span><span>l</span></span>
          <span><span>a</span><span>a</span></span>
          <span><span>y</span><span>y</span></span>
        </h3>
        <p class="text-reveal">
          <span
            v-html="
              $options.filters.stringToPattern(
                game.summany,
                12,
                '<span>',
                '</span>',
                3
              )
            "
          >
          </span>
          <span
            v-html="
              $options.filters.stringToPattern(
                game.summany,
                12,
                '<span><span>',
                '</span></span>',
                3
              )
            "
          >
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GameItem",
  props: {
    game: {
      type: Object,
      function() {
        return {};
      }
    }
  },
  filters: {
    typeColor() {
      const typeMap = ["success", "info", "warning", "danger"];
      return typeMap[Math.floor(Math.random() * typeMap.length)];
    },
    stringToPattern(
      string,
      len = 12,
      patternStart = "",
      patternEnd = "",
      get = 3
    ) {
      let curr = len;
      let prev = 0;
      let words = [];
      let output = "";
      let count = 0;
      while (string[curr] && count < get) {
        if (string[curr++] == " ") {
          words.push(string.substring(prev, curr));
          prev = curr;
          curr += len;
          count++;
        }
      }
      words.push(string.substr(prev));
      for (var i = 0; i < get; i++) {
        output +=
          patternStart +
          (words[i] != undefined ? words[i].trim() : "") +
          (i + 1 == get && words.length > get ? "..." : "") +
          patternEnd;
      }
      return output;
    }
  },
  data() {
    return {
      visibleItem: false
    };
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/_mixin.scss";
$letters: 7;
$teal: #16e590;
$cubic-slow: cubic-bezier(0.7, 0.01, 0.37, 1);
.card {
  border: 2px solid #79c0c0;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  max-width: 250px;
  width: 100%;
  min-height: 170px;
  padding: 10px;
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
    0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.3);
  background-size: cover;
  cursor: pointer;
  margin-bottom: 5px;
  box-sizing: border-box;
  &:before {
    content: "";
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(145, 184, 184, 0.4) 100%
    );
  }
  &:hover {
    &:hover {
      .more_info {
        visibility: visible;
        transform: translateY(0);
      }
    }
  }
  .more_info {
    position: absolute;
    top: 0;
    visibility: hidden;
    width: 100%;
    transform: translateY(calc(-70px + 1em));
    transition: transform 0.5s;
    min-height: 70px;
    &.show {
      visibility: visible;
      transform: translateY(0);
    }
    .game-avatar {
      position: absolute;
      top: 10px;
      left: 5px;
    }
    .content {
      height: 100%;
      padding: 10px 10px 10px 50px;
      color: #ffffff;
      position: relative;
      background-image: linear-gradient(120deg, #d5fc782e 0%, #96e6a1d9 100%);
      box-shadow: 0 5px 30px 10px rgba(0, 0, 0, 0.3);
      border-radius: 2px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      flex: 1 1 0px;
      justify-content: flex-start;
      .game-name {
        display: flex;
        justify-content: space-between;
        padding-right: 12px;
        span {
          font-size: 16px;
          font-weight: bold;
          flex: 1 1 0%;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .detail-game-info {
        font-size: 10px;
        margin: 0px 5px 2px;
        span {
          @include margin-list(5px);
        }
        .icon-star-1 {
          @include icon-color(#ffa000);
        }
        .icon-heart {
          @include icon-color(#f56c6c);
        }
      }
      .game-categories {
        ::v-deep.el-tag {
          @include margin-list(3px);
        }
      }
      .menu-button {
        position: absolute;
        z-index: 999;
        top: 0px;
        right: 3px;
        width: 25px;
        text-align: center;
        cursor: pointer;
        i {
          color: #ffffff;
        }
      }
    }
  }
  .roll-up {
    overflow: hidden;
    position: relative;
    ::v-deep > span {
      display: inline-block;
      position: relative;
      @for $i from 1 through $letters {
        &:nth-child(#{$i}) {
          transition-delay: #{$i * 0.03}s;
        }
      }
      > span {
        display: inline-block;
        transition: 0.6s $cubic-slow;
        transition-delay: inherit;
        &:nth-child(1) {
          position: relative;
        }
        &:nth-child(2) {
          position: absolute;
          transform: translateY(100%);
          left: 0;
          color: $teal;
        }
      }
    }
  }
  .text-reveal {
    position: relative;
    overflow: hidden;
    ::v-deep span {
      display: block;
      transition: $cubic-slow 0.6s;
      color: #e9e9e9;
    }
    ::v-deep > span {
      &:nth-child(2) {
        position: absolute;
        top: 0;
        left: 0;
        color: #fff;
        > span {
          overflow: hidden;
          transform: translateX(-100%);
          @for $i from 1 through $letters {
            &:nth-child(#{$i}) {
              transition-delay: #{$i * 0.1}s;
            }
          }
          > span {
            transform: translateX(100%);
            transition-delay: inherit;
          }
        }
      }
    }
  }
  .card__content {
    z-index: 1;
    .play-button {
      display: inline-block;
      width: 40px;
      height: 40px;
      transition: 0.5s;
      position: absolute;
      left: 42px;
      bottom: 22px;
      svg {
        overflow: visible;
      }
      .polygon {
        fill: $teal;
        transition: transform 0.5s, fill 0.5s;
        transition-timing-function: $cubic-slow;
        transform-origin: 50% 50%;
      }
    }
    .card__content--description {
      position: absolute;
      bottom: 0;
      right: 0;
      text-align: left;
      margin-right: -40px;
      width: 160px;
      h3 {
        margin: 0;
        text-transform: uppercase;
        margin-bottom: 5px;
        color: #fff;
      }
      p {
        font-size: 0.7rem;
        font-weight: bold;
        letter-spacing: 2px;
      }
    }
  }
  &:hover {
    // play button spin
    .play-button {
      transform: scale(1.1);
      .polygon {
        transform: translateZ(0px) rotate(90deg);
        fill: #67fbbe;
      }
    }
    // text roll
    .roll-up {
      ::v-deep > span {
        > span {
          &:nth-child(1) {
            transform: translateY(-100%);
          }
          &:nth-child(2) {
            transform: translateY(0);
          }
        }
      }
    }
    // paragraph reveal
    .text-reveal {
      ::v-deep > span:nth-child(2) > span,
      ::v-deep > span:nth-child(2) > span > span {
        transform: translateX(0);
      }
    }
  }
}
::v-deep.el-dropdown-menu {
  .el-icon-check {
    &:before {
      color: #409eff;
    }
  }
  .el-icon-close {
    &:before {
      color: #f56c6c;
    }
  }
}
</style>
