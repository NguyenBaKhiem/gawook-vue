<template>
  <div :class="message.sender_id == user ? 'user' : 'agent'">
    <el-tooltip
      class="item sender-name"
      effect="light"
      :content="message.full_name"
      placement="right-start"
    >
      <el-avatar
        :size="24"
        :src="message.avatar"
        @error="errorHandler"
        v-if="message.sender_id != user"
      >
        <img
          src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
        />
      </el-avatar>
    </el-tooltip>
    <div class="content">
      <reactions class="icon-reaction" v-if="message.sender_id === user" />
      <pre v-html="message.content" v-linkified></pre>
      <reactions class="icon-reaction" v-if="message.sender_id !== user" />
    </div>
    <template v-if="message.created_at">
      <small class="time">{{ message.created_at | diffCurrentTime }}</small>
      <small class="status sent"><i class="icon-sent"></i></small>
    </template>
    <small v-else class="status"
      ><i class="icon-sending"
        ><span class="path1"></span><span class="path2"></span
        ><span class="path3"></span><span class="path4"></span
        ><span class="path5"></span><span class="path6"></span
        ><span class="path7"></span></i
    ></small>
  </div>
</template>
<script>
  import Reactions from "@/components/more/Reactions";
  import { mapGetters } from "vuex";
  export default {
    components: {
      Reactions
    },
    props: {
      message: {
        type: Object,
        function() {
          return {};
        }
      },
      user: {
        type: Number,
        function() {
          return null;
        }
      }
    },
    computed: {
    ...mapGetters(["device"])
    },
    mounted() {
      let links = document.getElementsByClassName('linkified');
      links.forEach( link => {
        let vm = this;
        link.addEventListener('click', function (e) {
          if(vm.device == 'desktop') {
            return;
          }
          e.preventDefault();
          this.style.display = 'none';
        })
      })
    }
  };
</script>
<style lang="scss" scoped>
@keyframes slide-in-right {
  0% {
    padding-left: 5px;
    opacity: 0;
  }
  100% {
    padding-left: 0px;
    opacity: 1;
  }
}
.icon-sending {
  span {
    animation: slide-in-right 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
      infinite;
    // &::before {
    // 	animation: slide-in-right 1000ms
    //           cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
    // }
  }
}
.status {
  font-size: 66%;
  position: relative;
  color: #f16d6d;
  bottom: 8px;
  right: 0px;
  &.sent {
    display: none;
  }
}
.agent {
  position: relative;
  margin-left: 10px;
  .el-avatar {
    position: absolute;
    z-index: 1;
    left: -10px;
    top: -10px;
  }
}
</style>
