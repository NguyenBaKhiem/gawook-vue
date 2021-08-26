<template>
  <div class="home-desktop-container">
    <div class="contact" v-if="device == 'desktop'">
      <div class="grid-content bg-purple">
        <el-card shadow="never" :body-style="{ padding: '5px 10px 0' }">
          <div class="info">
            <router-link to="/">
              <el-avatar :size="32" src="https://empty" @error="errorHandler">
                <img
                  src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                />
              </el-avatar>
            </router-link>
            <div class="title">
              Chat
            </div>
            <div class="toolbar">
              <i class="el-icon-edit"></i>
              <i class="el-icon-setting"></i>
            </div>
          </div>
          <div class="search-box">
            <el-input
              placeholder="Type something"
              prefix-icon="el-icon-search"
              size="small"
              clearable
              v-model="key"
            >
            </el-input>
          </div>
          <div class="message-component">
            <div class="message-queue" v-click-outside="outsideMessageQueue">
              <el-collapse v-model="activeName" accordion>
                <el-collapse-item name="1">
                  <template slot="title">
                    Tin nhắn chờ
                    <el-badge class="mark" :value="12" :max="10" />
                  </template>
                  <ul>
                    <li>
                      <div class="queue-m-item">
                        <i class="el-icon-chat-dot-square"></i>
                        <div class="message">
                          <div class="message-title">Tin nhắn chờ</div>
                          <div class="message-from">HiHi</div>
                        </div>
                        <el-dropdown size="small" type="primary">
                          <i class="el-icon-warning"></i>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-check"
                              >Chấp nhận</el-dropdown-item
                            >
                            <el-dropdown-item icon="el-icon-close"
                              >Xóa</el-dropdown-item
                            >
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                    </li>
                    <li>
                      <div class="queue-m-item">
                        <i class="el-icon-chat-dot-square"></i>
                        <div class="message">
                          <div class="message-title">Tin nhắn chờ</div>
                          <div class="message-from">HiHi</div>
                        </div>
                        <el-dropdown size="small" type="primary">
                          <i class="el-icon-warning"></i>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-check"
                              >Chấp nhận</el-dropdown-item
                            >
                            <el-dropdown-item icon="el-icon-close"
                              >Xóa</el-dropdown-item
                            >
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                    </li>
                    <li>
                      <div class="queue-m-item">
                        <i class="el-icon-chat-dot-square"></i>
                        <div class="message">
                          <div class="message-title">Tin nhắn chờ</div>
                          <div class="message-from">HiHi</div>
                        </div>
                        <el-dropdown size="small" type="primary">
                          <i class="el-icon-warning"></i>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-check"
                              >Chấp nhận</el-dropdown-item
                            >
                            <el-dropdown-item icon="el-icon-close"
                              >Xóa</el-dropdown-item
                            >
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                    </li>
                  </ul>
                </el-collapse-item>
              </el-collapse>
            </div>
            <div class="messages-list">
              <ul class="touch-y">
                <li
                  v-for="(conversation, i) in conversations"
                  :key="i"
                  @click="addTab(editableTabsValue, conversation, i)"
                  :class="{
                    active: editableTabsValue == conversation.id,
                    unread: conversation.unread > 0
                  }"
                >
                  <div class="sender-image">
                    <el-avatar
                      :size="48"
                      :src="avatarConversation(conversation, i)"
                      @error="errorHandler"
                    >
                      <img
                        src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                      />
                    </el-avatar>
                    <i
                      class="icon-online"
                      v-if="isOnline(conversation.participants)"
                      ><span class="path1"></span><span class="path2"></span
                      ><span class="path3"></span
                    ></i>
                  </div>
                  <div class="mes-detail">
                    <div class="sender-name">
                      <span class="name">{{
                        conversationName(conversation)
                      }}</span>
                      <el-badge
                        :value="conversation.unread"
                        v-if="conversation.unread > 0"
                        :max="9"
                        class="item"
                        type="info"
                      >
                      </el-badge>
                    </div>
                    <div class="mes-preview" v-if="!conversation.typing">
                      <span
                        class="preview-sender"
                        title="Tôi"
                        v-if="conversation.message.sender_id == user.id"
                        >Tôi:
                      </span>
                      <span
                        class="preview-sender"
                        v-if="
                          conversation.message.sender_id != user.id &&
                            conversation.type == 'g'
                        "
                        :title="conversation.message.full_name"
                        >{{ conversation.message.full_name | getLastName }}:
                      </span>
                      <span
                        class="preview-content"
                        :title="
                          $options.filters.trimBreakline(
                            conversation.message.content
                          )
                        "
                        v-html="
                          $options.filters.trimBreakline(
                            conversation.message.content
                          )
                        "
                      ></span>
                      <div aria-hidden="true" class="dot">·</div>
                      <abbr class="last-time" title=""
                        ><small>{{
                          conversation.message.created_at | diffCurrentTime
                        }}</small></abbr
                      >
                    </div>
                    <div class="mes-preview" v-else>
                      <span class="preview-content"
                        >{{ conversation.usertyping }} đang viết...</span
                      >
                    </div>
                  </div>
                  <div class="mes-advanced">
                    <i class="el-icon-star-on"></i>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div class="contact contact-tablet" v-else>
      <el-card shadow="never" :body-style="{ padding: '5px 10px 0' }">
        <div class="info">
          <div class="toolbar">
            <i class="el-icon-edit"></i>
          </div>
        </div>
        <div class="messages-list">
          <transition-group name="flip-list" tag="ul" class="touch-y">
            <li
              v-for="(conversation, i) in conversations"
              :key="i"
              @click="addTab(editableTabsValue, conversation, i)"
              :class="{ active: editableTabsValue == conversation.id }"
            >
              <template>
                <div class="sender-image">
                  <small>
                    <el-badge
                      :value="conversation.unread"
                      v-if="conversation.unread > 0"
                      :max="9"
                      class="item"
                      type="info"
                    >
                    </el-badge>
                  </small>
                  <el-avatar
                    :size="48"
                    :src="avatarConversation(conversation, i)"
                    @error="errorHandler"
                  >
                    <img
                      src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                    />
                  </el-avatar>
                  <i
                    class="icon-online"
                    v-if="isOnline(conversation.participants)"
                    ><span class="path1"></span><span class="path2"></span
                    ><span class="path3"></span
                  ></i>
                </div>
              </template>
            </li>
          </transition-group>
        </div>
      </el-card>
    </div>
    <div class="main-messages-component">
      <div class="grid-content .bg-purple-light d-f">
        <div class="grid-main">
          <el-card
            shadow="never"
            :body-style="{ padding: '0' }"
            class="header-wrapp"
          >
            <el-page-header title="back" @back="goBack">
              <template slot="content">
                <div v-if="!$online">Bạn đang offline</div>
              </template>
            </el-page-header>
            <el-tabs
              v-model="editableTabsValue"
              type="card"
              closable
              @tab-remove="removeTab"
              @tab-click="changeTabPane"
              stretch
            >
              <el-tab-pane
                v-for="item in editableTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
                lazy
              >
<!--                 <keep-alive>
                  <router-view :messages="mes(item.name)"
                      @input-change="inputChange($event)"
                      @typing="typingOnConversation($event)">
                  </router-view>
                </keep-alive> -->
              <template v-if="messageInConversation(item.name) == undefined">
                <loading />
              </template>
              <template v-else>
                <chat-layout
                   :messages="mes(item.name)"
                  @input-change="inputChange($event)"
                  @typing="typingOnConversation($event)"
                />
              </template>
              </el-tab-pane>
            </el-tabs>
            
          </el-card>
        </div>
        <room-info />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RoomInfo from "@/components/messages/RoomInfo";
import ChatLayout from "@/components/messages/ChatComponent";
import rf from "requestfactory";
import Loading from "@/components/loading/index";
import { Message } from "element-ui";

// const C_BLOCK = 1;
const C_TWO_PEOPLE_TYPE = "t";
export default {
  name: "Desktop",
  components: {
    RoomInfo,
    Loading,
    ChatLayout
  },
  data() {
    return {
      key: "",
      select: "",
      logout: "",
      activeName: "",
      isOpenRightBar: true,
      loading: true,
      editableTabsValue: 0,
      editableTabs: [],
      conversations: [],
      messages: []
    };
  },
  created() {
    this.allConversation();
  },
  mounted() {
    this.listenForUpdateConversation();
  },
  computed: {
    ...mapGetters(["device", "user", "usersOnline"]),
    mes: function() {
      var vm = this;
      return function(conversationId) {
        return vm.messages.find(item => {
          return item.conversation == parseInt(conversationId);
        });
      };
    },
    conversationName: function() {
      return function(conversation) {
        if (conversation.type == C_TWO_PEOPLE_TYPE) {
          let alias = conversation.participants.find(
            participant => participant.user_id !== this.user.id
          ).alias;
          conversation.name =
            alias == ""
              ? conversation.users.find(user => user.id !== this.user.id)
                  .full_name
              : alias;
        }
        return conversation.name;
      };
    },
    isOnline: function() {
      return function(participants) {
        return participants.find(item => {
          return window._.find(
            window._.reject(this.usersOnline, ["id", this.user.id]),
            ["id", item.user_id]
          );
        });
      };
    }
  },
  watch: {
    editableTabs(val) {
      this.editableTabsValue = val.length != 0 ? this.editableTabsValue : "";
    },
    // conversations(val) {
    //   this.listenForUpdateConversation(val);
    // }
    $router(to, from) {
      console.log(to)
      console.log(from)
      if(to == from) {
        const { fullPath } = this.$route
        this.$router.replace({
          path: '/redirect' + fullPath
        })
      }
    }
  },
  methods: {
    outsideMessageQueue() {
      this.activeName = "";
    },
    lastMessageInConversation(e, conversationId) {
      let index = this.indexConversation(conversationId);
      this.$set(this.conversations[index], "message", e);
      this.editableTabsValue != conversationId || this.editableTabsValue == ""
        ? this.conversations[index].unread++
        : (this.conversations[index].unread = 0);
    },
    inputChange(e) {
      window.Echo.private("App.User." + this.user.id).whisper("typing", {
        conversation: e.conversation,
        isTyping: e.typing
      });
    },
    typingOnConversation(e) {
      let conversationId = this.indexConversation(e.conversation);
      this.typingInConversation(conversationId, {
        typing: e.isTyping,
        name: e.nameTyping
      });
      this.scrollConversationBottom()
    },
    typingInConversation(conversationId, e) {
      this.$set(this.conversations[conversationId], "typing", e.typing || false);
      this.$set(this.conversations[conversationId], "usertyping", e.name || null);
    },
    avatarConversation(conversation, i) {
      if (conversation.type == C_TWO_PEOPLE_TYPE) {
        conversation.avatar = conversation.users.find(
          user => user.id !== this.user.id
        ).avatar;
        this.$set(this.conversations[i], "avatar", conversation.avatar);
      }
      return conversation.avatar;
    },
    listenForUpdateConversation() {
      window.Echo.private("App.User." + this.user.id)
        .listen("UpdateConversationEvent", e => {
          const conversationId = e.data.conversation_id;
          this.lastMessageInConversation(e.data, conversationId);
          this.conversations = window._.sortBy(this.conversations, [
            "message.id"
          ]).reverse();
        })
        .listenForWhisper("typing", e => {
          console.log(e);
        });
    },
    changeRightBar() {},
    addTab(targetName, conversation, i) {
      this.conversations[i].unread = 0;
      let index;
      index = this.editableTabs.findIndex(
        tab => tab.name === String(conversation.id)
      );
      this.editableTabsValue = String(conversation.id);
      if (index == -1) {
        this.editableTabs.push({
          title: conversation.name || this.conversationName(conversation),
          name: String(conversation.id)
        });
      }
      // this.$router.push({ name: "Conversation", params: { conversationId: this.editableTabsValue} })
      this.openConversation();
    },

    async openConversation() {
      let id = parseInt(this.editableTabsValue);
      const response = await this.getMessage(id);
      let indexRoom = this.indexInConversation(id);
      if (indexRoom == -1) {
        this.messages.push({
          conversation: id,
          content: response,
          input: "",
          inputFocus: false,
          openToolbar: false,
          emojiBar: false
        });
      }
       else {
        this.$set(this.messages[indexRoom], "content", response);
      }
      this.scrollConversationBottom();
    },

    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      let conversationId = this.indexInConversation(parseInt(targetName));
      this.typingInConversation(conversationId, {
        typing: false,
        name: null
      });
      // this.typingInConversation(typingOff);
      this.messages.splice(conversationId, 1);
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    changeTabPane() {
      this.conversations[
        this.indexConversation(this.editableTabsValue)
      ].unread = 0;
      this.scrollConversationBottom();
      // this.openConversation();
    },
    indexConversation(conversationId) {
      return this.conversations.findIndex(item => {
        return item.id == conversationId;
      });
    },
    indexInConversation(conversationId) {
      return this.messages.findIndex(item => {
        return item.conversation === conversationId;
      });
    },
    messageInConversation(conversationId) {
      return this.messages.find(item => {
        return item.conversation == parseInt(conversationId);
      });
    },
    goBack() {
      this.$router.back();
    },
    allConversation() {
      rf.getRequest("MessageRequest")
        .allConversation()
        .then(response => {
          let convs = window._.sortBy(response.data, ["message.id"]).reverse();
          this.conversations = convs;
        });
    },
    getMessage(room) {
      return new Promise(resolve => {
        rf.getRequest("MessageRequest")
          .room({ room: room })
          .then(res => {
            resolve(window._.sortBy(res.data, ["id"]));
          })
          .catch(function(error) {
            if (!error.status) {
              Message.error("Network Error");
            }
          });
      });
    },
    scrollConversationBottom() {
      this.$nextTick(() => {
        let objDiv = document.getElementById(`chat-${this.editableTabsValue}`);
        if (objDiv) {
          objDiv.scrollTop = objDiv.scrollHeight;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_mixin.scss";
// .emoji-mart-body .emoji-type-image.emoji-set-twitter {
//   background-image: url(/img/twitter-5.0.1-sheets-256-64.png);
// }
@keyframes move-forever {
  0% {
    @include translate(-90px, 0%);
  }
  100% {
    @include translate(85px, 0%);
  }
}
@keyframes scale {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
.flip-list-move {
  transition: transform 1s;
}
.home-desktop-container {
  background-color: #e3e3e3;
  min-height: 100vh;
  .pan-info-roles {
    font-size: 12px;
    font-weight: 700;
    color: #333;
    display: block;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .contact {
    float: left;
    width: 25%;
    transition: width 0.3s;
    &.contact-tablet {
      float: left;
      width: 74px;
      height: 100vh;
      transition: width 0.3s;
      .el-card {
        .info {
          height: 41px;
          .toolbar {
            width: auto;
            margin: auto;
          }
        }
        .messages-list {
          .sender-image {
            margin: 0;
            .item {
              position: absolute;
              right: -10px;
              top: 15px;
              ::v-deep.el-badge__content {
                font-size: 10px;
                height: 14px;
                line-height: 14px;
                padding: 0 5px;
              }
            }
          }
        }
      }
    }
    .el-card {
      border-radius: 0;
      border: none;
      .info {
        display: flex;
        align-items: center;
        justify-content: center;
        .el-avatar {
          margin-right: 5px;
        }
        .toolbar {
          width: 64px;
          margin-left: 5px;
          i {
            border-radius: 50%;
            padding: 5px;
            background-color: #f1f1f1;
            font-size: 20px;
            cursor: pointer;
            &:hover {
              background-color: #ebebeb;
            }
          }
        }
        .title {
          flex-grow: 1;
          text-align: center;
        }
      }
      .search-box {
        margin: 5px 0;
      }
      .message-component {
        height: calc(100vh - 82px);
        overflow-x: hidden;
        overflow-y: scroll;
        position: relative;
        padding: 0px 5px;
        &::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
          border-radius: 0;
        }

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
            color-stop(0.44, rgb(122, 153, 217)),
            color-stop(0.72, rgb(73, 125, 189)),
            color-stop(0.86, rgb(28, 58, 148))
          );
        }
      }
      .message-queue {
        padding: 0px 0px 0px 5px;
        margin: 0 -10px;
        ::v-deep .el-collapse {
          border-left: 1px solid #e6ebf5;
          .el-collapse-item__header {
            background-color: #f4f4f4;
          }
          .el-collapse-item__content {
            padding-bottom: 0;
            background-color: #f9f9f9;
          }
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          li {
            border-top: 1px solid #e6ebf5;
            cursor: pointer;
            &:hover {
              background-color: #f6f6f6;
            }
            .queue-m-item {
              display: flex;
              align-items: center;
              .el-icon-chat-dot-square {
                width: 32px;
                font-size: 30px;
              }
              .el-dropdown {
                width: 24px;
                .el-icon-warning {
                  font-size: 16px;
                  &:before {
                    color: #2585d7;
                  }
                }
              }
              .message {
                flex-grow: 1;
              }
            }
          }
        }
      }
      .messages-list {
        margin: 0 -5px;
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          > li {
            cursor: pointer;
            width: calc(100% - 10px);
            height: 64px;
            overflow: hidden;
            display: flex;
            flex: 1 1 auto;
            padding: 0 5px;
            margin: 5px 0;
            border-radius: 6px;
            transition: all 0.5s;
            &.active {
              background-color: #f3f3f3;
            }
            &.unread {
            }
            &:hover {
              background-color: #f1f1f1;
            }
            .sender-image {
              display: flex;
              align-items: center;
              margin-right: 10px;
              line-height: 0;
              position: relative;
              .icon-online {
                position: absolute;
                left: 0;
                bottom: 8px;
                animation: scale 0.5s infinite;
              }
            }
            .mes-detail {
              display: flex;
              flex-direction: column;
              flex: 1 1 0px;
              justify-content: center;
              min-width: 0;
              padding-right: 5px;
              .sender-name {
                display: flex;
                justify-content: space-between;
                .name {
                  font-size: 14px;
                  font-weight: bold;
                  padding-bottom: 3px;
                  flex: 1 1 0%;
                  min-width: 0;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                ::v-deep.el-badge {
                  .el-badge__content {
                    font-size: 10px;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 5px;
                  }
                }
              }
              .mes-preview {
                display: flex;
                align-items: baseline;
                justify-content: left;
                .preview-sender {
                  margin-right: 0;
                  flex: 0 1 auto;
                  min-width: 0;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: pre;
                  color: rgba(153, 153, 153, 1);
                  font-size: 12px;
                  flex-grow: 0;
                  min-width: 25px;
                }
                .preview-content {
                  margin-right: 0;
                  flex: 0 1 auto;
                  min-width: 0;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: pre;
                  color: rgba(153, 153, 153, 1);
                  font-size: 12px;
                }
                .two-dot {
                  margin-right: 0;
                  flex: 0 1 auto;
                  min-width: 0;
                  white-space: pre;
                  color: rgba(153, 153, 153, 1);
                  font-size: 12px;
                }
                .dot {
                  color: rgba(0, 0, 0, 0.4);
                  font-size: 13px;
                  margin-left: 4px;
                  margin-right: 4px;
                }
                .last-time {
                  padding-top: 0;
                  white-space: nowrap;
                  border-bottom: none;
                  text-decoration: none;
                  color: rgba(0, 0, 0, 0.4);
                  display: inline-block;
                  font-size: 12px;
                  font-weight: 400;
                }
              }
            }
            .mes-advanced {
              display: flex;
              justify-content: right;
              align-items: center;
              .el-icon-star-on {
                position: relative;
                right: -2px;
                font-size: 18px;
                &:before {
                  color: #2585d7;
                }
              }
            }
          }
        }
      }
    }
  }
  .main-messages-component {
    .grid-content {
      height: 100vh;
      .grid-main {
        background-color: #ffffff;
        flex-grow: 1;
        flex-shrink: 1;
        overflow-y: auto;
        .header-wrapp {
          position: relative;
          .el-page-header {
            line-height: 46px;
          }
          ::v-deep .el-tabs {
            .el-tabs__header {
              margin-bottom: 0;
            }
            .el-tabs__nav-wrap.is-scrollable {
              padding: 0 30px;
              .el-tabs__nav-next,
              .el-tabs__nav-prev {
                font-size: 20px;
                line-height: 40px;
                width: 30px;
              }
            }
            .el-tabs__content {
              height: calc(100vh - 89px);
              .el-tab-pane {
                padding: 0 3px;
              }
            }
            .el-tabs__item {
              width: 126px;
              position: relative;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              .el-icon-close {
                position: absolute;
                top: 14px;
                right: 5px;
              }
            }
          }
        }
      }
    }
    .wave-wrapp {
      width: 100%;
      height: 50px;
      position: absolute;
      bottom: 0px;
      .wave {
        display: block;
        width: 100%;
        margin: 0;
        height: 50px;
        .parallax {
          > use {
            @include animation(move-forever 12s linear infinite);
          }
          > use:nth-child(1) {
            @include animation-delay(-2s);
            @include translate(-110px, 0%);
          }
          > use:nth-child(2) {
            @include animation-delay(-2s);
            @include animation-duration(7s);
          }
          > use:nth-child(3) {
            @include animation-delay(-4s);
            @include animation-duration(4s);
            @include translate(-65px, 0%);
          }
        }
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
<style>
@import "~hooper/dist/hooper.css";
</style>
