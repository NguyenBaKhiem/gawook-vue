<template>
  <div class="reactions">
    <i class="icon-smile cursor-pointer"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span class="path16"></span><span class="path17"></span><span class="path18"></span></i>
    <div class="reaction reaction--overflow overflow1">
      <div class="reaction__image">
        <img src="http://gawook-backend.io:8000/images/emoji/love.png">
      </div>
    </div>
    <div class="reaction reaction--overflow overflow2">
      <div class="reaction__image">
        <img src="http://gawook-backend.io:8000/images/emoji/haha.png">
      </div>
    </div>
    <div class="reaction reaction--overflow overflow3">
      <div class="reaction__image">
        <img src="http://gawook-backend.io:8000/images/emoji/wow.png">
      </div>
    </div>
    <div class="reaction reaction--overflow overflow4">
      <div class="reaction__image">
        <img src="http://gawook-backend.io:8000/images/emoji/cry.png">
      </div>
    </div>
    <div class="reaction reaction--overflow overflow5">
      <div class="reaction__image">
        <img src="http://gawook-backend.io:8000/images/emoji/angry.png">
      </div>
    </div>
  </div>
</template>
<script></script>
<style lang="scss" scoped>

@keyframes pulse1 {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes pulse2 {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(2.5);
  }
}

@keyframes fadeout1 {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.reactions {
  .icon-smile {
    font-size: 20px;
  }
  .reaction {
    width: 20px;
    height: 20px;
    float: left;
    margin-right: 2px;
    cursor: pointer;
    position: relative;
    -webkit-user-select: none;
    &:before {
      content: '';
      display: block;
      box-shadow: inset 0 0 7px #14B866;
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      z-index: 1;
      opacity: 0;
    }
    &:hover {
      .reaction__image {
        transform: scale(1.1);
      }
    }
    &.active {
      &:before {
        animation: 600ms 1 pulse2 cubic-bezier(0.075, 0.82, 0.165, 1), 600ms 1 fadeout1;
      }
      .reaction__image {
        background: #14B866;
        position: relative;
        &:before {
          content: '';
          box-shadow: inset 0 0 0 2px #14B866;
          display: block;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 50%;
        }
      }
      svg, img {
        fill: #ffffff;
      }
    }
    .reaction__image {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      overflow: hidden;
      background: #E2DBF0;
      position: relative;
      img {
        height: 20px;
      }
      svg {
        fill: #6441a5;
      }
    }
    .reaction__image--nobg {
      background: none;
    }
  }
  .reaction--overflow, .reaction--show {
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
  .reaction--show {
    z-index: 3;
  }

  .reaction--overflow {
    opacity: 0;
    transition: all 200ms cubic-bezier(0.785, 0.135, 0.15, 0.86);
    z-index: 2;
  }

  .overflow1 {
    transition-delay: 100ms;
  }

  .overflow2 {
    transition-delay: 200ms;
  }

  .overflow3 {
    transition-delay: 300ms;
  }

  .overflow4 {
    transition-delay: 400ms;
  }

  .overflow5 {
    transition-delay: 500ms;
  }
}

</style>