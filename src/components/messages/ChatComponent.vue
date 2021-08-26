<template>
  <div>
    <div
      :class="`chat chat-${messages.conversation}`"
      :id="`chat-${messages.conversation}`"
      @scroll="handleScroll"
    >
      <message-item
        v-for="message in messages.content"
        :user="user.id"
        :message="message"
        :key="message.id"
      />
      <span
        class="back-bottom"
        align="center"
        v-if="backBottom"
        @click.stop="scrollConversationBottom"
      >
        <el-tooltip
          placement="right"
          effect="light"
          :manual="true"
          v-if="typing"
          v-model="typing"
        >
          <div slot="content">
            <el-avatar
              :size="20"
              :src="userTyping"
              @error="errorHandler"
              :title="nameTyping"
            >
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar>
            <pre class="typing m-0" style="padding: 3px 0 0!important">
              <div class="typing-loader">
                <div class="dot p1"></div>
                <div class="dot p2"></div>
                <div class="dot p3"></div>
                <div class="dot p4"></div>
              </div>
            </pre>
          </div>
          <i class="el-icon-caret-bottom"></i>
        </el-tooltip>
        <i class="el-icon-caret-bottom" v-else></i>
      </span>
      <div class="agent" v-if="typing" style="position: relative;">
        <el-tooltip
            class="item sender-name"
            effect="light"
            :content="nameTyping"
            placement="right-start"
          >
            <el-avatar
              :size="24"
              :src="userTyping"
              @error="errorHandler"
              style="position: absolute;z-index: 1;top: -10px;"
            >
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
        </el-avatar>
      </el-tooltip>
      <div class="content" style="margin-left: 10px;">
        <pre class="typing" style="background-color: #f1f1f1;border-radius: 4px 10px 10px 4px;">
          <div class="typing-loader">
            <div class="dot p1"></div>
            <div class="dot p2"></div>
            <div class="dot p3"></div>
            <div class="dot p4"></div>
          </div>
        </pre>
      </div>
      </div>
      <!--<link rel="image_src" href="https://i.pinimg.com/originals/be/1f/01/be1f01c05a810ae6f90fa6be31754cd9.jpg"> -->
    </div>
    <div class="input-chat d-f">
      <el-card
        shadow="always"
        :class="`mention-of-${messages.conversation}`"
        v-if="mention.show"
        :style="{
          position: 'fixed',
          left: `${mention.rectX}px`,
          top: `${mention.rectY - 60}px`
        }"
      >
        Always
      </el-card>
      <div
        class="toolbar d-f"
        :class="
          messages.inputFocus == false && messages.openToolbar == true
            ? 'open'
            : ''
        "
      >
        <i
          class="icon-plus cursor-pointer"
          @click="messages.openToolbar = !messages.openToolbar"
        ></i>
        <i class="icon-camera cursor-pointer"></i>
        <template v-if="messages.openToolbar">
          <i class="icon-album cursor-pointer"></i>
          <i class="icon-microphone cursor-pointer"></i>
          <i class="icon-joystick-1 cursor-pointer"></i>
        </template>
        <i
          class="icon-face cursor-pointer"
          @click="messages.emojiBar = !messages.emojiBar"
          ><span class="path1"></span><span class="path2"></span
          ><span class="path3"></span><span class="path4"></span
          ><span class="path5"></span><span class="path6"></span
          ><span class="path7"></span><span class="path8"></span
          ><span class="path9"></span><span class="path10"></span
          ><span class="path11"></span><span class="path12"></span
          ><span class="path13"></span><span class="path14"></span
          ><span class="path15"></span><span class="path16"></span
          ><span class="path17"></span><span class="path18"></span
          ><span class="path19"></span><span class="path20"></span
          ><span class="path21"></span
        ></i>
      </div>
      <div class="as-textarea">
        <div class="overflow-textarea">
          <div class="input-area">
            <as-textarea
              ref="textarea"
              :mention="mention"
              :content="messages.input"
              @update="messages.input = $event.trim()"
              @keyup.enter.exact.prevent.native="
                sendMessage($event, messages.input)
              "
              @input.native="onInputPrivateChange"
              @focus.native="
                messages.inputFocus = true;
                messages.openToolbar = false;
                messages.emojiBar = false;
              "
              @mentionPanel="mention = $event"
              @blur.native="messages.inputFocus = false"
            />
          </div>
        </div>
      </div>
      <Picker
        set="messenger"
        :data="emojiIndex"
        :style="{
          position: 'absolute',
          bottom: '38px',
          right: '2px',
          width: 'calc(100% - 60px)',
          'max-width': '355px'
        }"
        title=""
        :i18n="$t('emojis')"
        v-show="messages.emojiBar"
        @select="addEmoji($event)"
        :skin="2"
      />
      <div
        class="send cursor-pointer"
        @click="sendMessage($event, messages.input)"
      >
        <i class="icon-send" v-if="messages.input != ''"></i>
        <template v-else>
          <i class="icon-like"></i>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import rf from "requestfactory";
import { Message } from "element-ui";
import AsTextarea from "@/components/input/AsTextarea";
import MessageItem from "@/components/messages/MessageItem";
import data from "emoji-mart-vue-fast/data/messenger.json";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast";
import "emoji-mart-vue-fast/css/emoji-mart.css";
import emojiUtil from "@/utils/emoji";

let emojiIndex = new EmojiIndex(data);
export default {
  components: {
    Picker,
    AsTextarea,
    MessageItem
  },
  props: {
    messages: {
      type: Object,
      function() {
        return {};
      }
    }
  },
  data() {
    return {
      typing: false,
      userTyping: null,
      nameTyping: null,
      mention: {
        show: false,
        rectX: null,
        rectY: null
      },
      emojiIndex: emojiIndex,
      backBottom: false
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  watch: {
    "messages.input": function() {
      this.onInputPrivateChange();
    }
  },
  mounted() {
    this.listenForUpdateMessage();
    // this.checkScrollToBottom();
  },
  methods: {
    sendMessage(e, content) {
      if (e.target.tagName.toLowerCase() == "i" && content == "") {
        content = "<i class='icon-like'></i>";
        this.messages.inputFocus = true;
      }
      if (window._.isEmpty(content) || content == "\n") {
        return;
      }
      let index =
        this.messages.content.push({
          content: content,
          sender_id: this.user.id
        }) - 1;
      this.messages.input = "";
      rf.getRequest("MessageRequest")
        .sendMessage({ content, conversation: this.messages.conversation })
        .then(res => {
          this.messages.content[index].created_at = res.data.created_at;
          this.$set(this.messages.content[index], "id", res.data.id);
          this.$message({
            message: "Congrats, this is a success message.",
            type: "success"
          });
          this.scrollConversationBottom();
        })
        .catch(function(error) {
          if (!error.status) {
            Message.error("Network Error");
          }
        });
    },
    listenForUpdateMessage() {
      window.Echo.private("conversation." + this.messages.conversation)
        .listen("updateMessageEvent", e => {
          this.messages.content.push(e.data);
        })
        .listenForWhisper("typing", e => {
          this.typing = e.isTyping;
          this.userTyping = e.avatar;
          this.nameTyping = e.nameTyping;
          e.conversation = this.messages.conversation;
          this.$emit("typing", e);
        });
    },
    onInputPrivateChange: window._.throttle(function() {
      let typing = this.messages.input.length > 0;
      this.$emit("input-change", {
        conversation: this.messages.conversation,
        typing: typing
      });
      window.Echo.private(`conversation.${this.messages.conversation}`).whisper(
        "typing",
        {
          user: this.user.id,
          isTyping: typing,
          avatar: this.user.avatar,
          nameTyping: this.user.full_name
        }
      );
    }, 1000),
    scrollConversationBottom() {
      this.$nextTick(() => {
        let objDiv = document.getElementById(
          `chat-${this.messages.conversation}`
        );
        if (objDiv) {
          objDiv.scrollTop = objDiv.scrollHeight;
        }
      });
    },
    handleScroll: function(e) {
      this.backBottom =
        e.target.scrollHeight - 100 - e.target.scrollTop >
        e.target.offsetHeight;
    },
    addEmoji(emoji) {
      let input = this.messages.input;
      let emojIma = emojiUtil.convertEmoji(emoji.native);
      this.messages.input = `${input}${emojIma}`;
      // this.$refs.textarea.setFocus();
    },
    closeCard() {
      this.mention = {
        show: false,
        rectX: null,
        rectY: null
      };
    }
  },
  beforeDestroy() {
    window.Echo.leave(`conversation.${this.messages.conversation}`);
  }
};
</script>
<style lang="scss" scoped>
$primary: #153243;
$secondary: #e75a7c;
$white: #fafafa;
$grey: #f1f1f1;
$black: #202030;
@keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
    transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fall {
  0% {
    transform: translateY(-6px);
  }
  25%,
  75% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-6px);
  }
}

@keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
@import "@/styles/_mixin.scss";
.typing {
  line-height: 0 !important;
  padding: 10px !important;
  width: 36px !important;
  .typing-loader {
    border-radius: 50%;
    display: -webkit-box;
    -webkit-box-pack: center;
    height: 10px;
    justify-content: center;
    .dot {
      background: #4db6ac;
      border-radius: 50%;
      height: 6px;
      margin: 0.1em;
      width: 6px;
      &.p1 {
        animation: fall 1s linear 0.3s infinite;
      }

      &.p2 {
        animation: fall 1s linear 0.2s infinite;
      }

      &.p3 {
        animation: fall 1s linear 0.1s infinite;
      }

      &.p4 {
        animation: fall 1s linear infinite;
      }
    }
  }
}
.chat {
  height: calc(100vh - 70px - 60px);
  background: rgba(0, 0, 0, 0)
    url("https://www.toptal.com/designers/subtlepatterns/patterns/geometry.png")
    repeat scroll 0% 0%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 2px 2px;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 3px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-image: -webkit-gradient(
      linear,
      left bottom,
      left top,
      color-stop(0.44, #7a99d9),
      color-stop(0.72, #497dbd),
      color-stop(0.86, #1c3a94)
    );
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    border-radius: 0;
  }
  .back-bottom {
    position: absolute;
    bottom: 82px;
    left: 20px;
    z-index: 2;
    width: 26px;
    height: 26px;
    background-color: #ffffff85;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 12px 0px;
    padding: 5px;
    box-sizing: border-box;
    transition: all 0.5s;
    cursor: pointer;
    &:hover {
      background-color: #ffffff;
      transform: scale(1.1);
    }
  }
  ::v-deep & > div {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    .content {
      display: flex;
      align-items: center;
      max-width: calc(100% - 150px);
      margin: 3px 0 0 0;
      > pre {
        margin: 0;
        white-space: pre-wrap;
        word-wrap: break-word;
        width: max-content;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 16px;
        min-width: 20px;
        padding: 5px 18px 15px;
      }
      > .icon-reaction {
        display: none;
        position: relative;
        transition: all .1s;
      }
      + .time {
        font-size: 66%;
        position: relative;
        color: #f16d6d;
        bottom: 14px;
      }
    }
    &.agent {
      place-items: flex-start;
      &:hover {
        .icon-reaction {
          display: block;
        }
      }
      & > .content {
        color: $black;
        font-size: 14px;
        animation: slide-in-left 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        >pre {
          background-color: $grey;
        }
        .icon-reaction {
          left: 10px;
          &:hover {
            .overflow1 {
              transform: translate(-12px, -20px);
              opacity: 1;
            }
            .overflow2 {
              transform: translate(12px, -20px);
              opacity: 1;
            }
            .overflow3 {
              transform: translate(24px, 0);
              opacity: 1;
            }
            .overflow4 {
              transform: translate(12px, 20px);
              opacity: 1;
            }
            .overflow5 {
              transform: translate(-12px, 20px);
              opacity: 1;
            }
          }
        }
        + .time {
          left: 5px;
          animation: slide-in-left 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
        &:first-child {
          pre {
            border-radius: 10px 10px 10px 4px;
          }
        }
        &:not(:first-child) {
          &:not(:last-child) {
            pre {
              border-radius: 4px 10px 10px 4px;
            }
          }
          &:last-child {
            pre {
              border-radius: 4px 10px 10px 10px;
            }
          }
        }
      }
    }
    &.user {
      place-items: flex-end;
      &:hover {
        .icon-reaction {
          display: block;
        }
      }
      &:last-child {
        .status {
          &.sent {
            display: block;
          }
        }
      }
      & > .content {
        justify-content: flex-end;
        font-size: 14px;
        -webkit-animation: slide-in-right 200ms
          cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        animation: slide-in-right 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
          both;
        pre {
            background-attachment: fixed;
          background-image: linear-gradient(
            rgb(25, 201, 255) 0%,
            rgb(0, 230, 210) 50%,
            rgb(14, 230, 183) 100%
          );
          color: $white;
        }
        .icon-reaction {
          position: absolute;
          left: -30px;
          &:hover {
            .overflow1 {
              transform: translate(12px, -20px);
              opacity: 1;
            }
            .overflow2 {
              transform: translate(-12px, -20px);
              opacity: 1;
            }
            .overflow3 {
              transform: translate(-24px, 0);
              opacity: 1;
            }
            .overflow4 {
              transform: translate(-12px, 20px);
              opacity: 1;
            }
            .overflow5 {
              transform: translate(12px, 20px);
              opacity: 1;
            }
          }
        }
        + .time {
          right: 5px;
          animation: slide-in-right 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
        &:first-child {
          pre {
            border-radius: 10px 10px 4px 10px;
          }
        }
        &:not(:first-child) {
          &:not(:last-child) {
            pre {
              border-radius: 10px 4px 4px 10px;
            }
          }
          &:last-child {
            pre {
              border-radius: 10px 4px 10px 10px;
            }
          }
        }
      }
    }
  }
}
.input-chat {
  align-items: center;
  justify-content: center;
  width: calc(100% - 30px);
  padding: 5px 0;
  position: relative;
  .toolbar {
    width: 90px;
    transition: all 0.3s;
    justify-content: space-evenly;
    flex-shrink: 0;
    &.open {
      //transform: rotateZ(360deg);
      width: 200px;
    }
    i {
      font-size: 18px;
      @include margin-list(5px);
    }
  }
  .as-textarea {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    display: flex;
    flex: 1 1 auto;
    margin: 2px 2px 2px 0px;
    min-width: 100px;
    padding: 5px 10px;
    min-height: 18px;
    max-height: 132px;
    .overflow-textarea {
      flex: 1 1 0%;
      max-height: 122px;
      min-height: 18px;
      overflow-y: auto;
      vertical-align: middle;
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        background-color: transparent;
        display: none;
      }
      .input-area {
        background-color: rgba(255, 255, 255, 0);
        border-left: 0.1px solid transparent;
        position: relative;
        z-index: 1;
        .main-textarea {
          outline: none;
          user-select: text;
          white-space: pre-wrap;
          overflow-wrap: break-word;
          -webkit-user-modify: read-write-plaintext-only;
          height: inherit;
          text-align: initial;
        }
      }
    }
  }
  ::v-deep.emoji-mart-preview {
    height: 50px;
    .emoji-mart-preview-name {
      display: none;
    }
  }
  .send {
    width: 33px;
    position: absolute;
    right: -33px;
    text-align: center;
    i {
      font-size: 20px;
    }
  }
}
</style>
