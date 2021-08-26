<template>
  <div class="home-desktop-container">
    <div class="clearfix">
      <el-row :gutter="1">
        <el-col :sm="7" :md="6">
          <div class="grid-content bg-purple">
            <el-card shadow="never" :body-style="{ padding: '5px 10px 0' }">
              <div class="info">
                <el-avatar :size="32" src="https://empty" @error="errorHandler">
                  <img
                    src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                  />
                </el-avatar>
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
                <div
                  class="message-queue"
                  v-click-outside="outsideMessageQueue"
                >
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
                    <li v-for="(m, i) in messages" :key="i">
                      <div class="sender-image">
                        <el-avatar
                          :size="48"
                          :src="m.avatar"
                          @error="errorHandler"
                        >
                          <img
                            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                          />
                        </el-avatar>
                      </div>
                      <div class="mes-detail">
                        <div class="sender-name">
                          <span class="name">{{ m.name }}</span>
                        </div>
                        <div class="mes-preview">
                          <span class="preview-content">{{ m.message }}</span>
                          <div aria-hidden="true" class="dot">·</div>
                          <abbr class="last-time" title="">{{ m.time }}</abbr>
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
        </el-col>
        <el-col :sm="17" :md="18">
          <div class="grid-content .bg-purple-light d-f">
            <div class="grid-main">
              <el-card
                shadow="never"
                :body-style="{ padding: '0' }"
                class="header-wrapp"
              >
                <div class="app-detail">
                  <div class="profile">
                    <div class="avatar w-100">
                      <el-avatar
                        :size="96"
                        src="https://empty"
                        @error="errorHandler"
                      >
                        <img
                          src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                        />
                      </el-avatar>
                    </div>
                  </div>
                  <div class="info-profile">
                    <span class="name">
                      Yuki Khiêm Nguyễn
                    </span>
                    <div class="clearfix"></div>
                    <span class="email">hihi@gmail.com</span>
                  </div>
                </div>
                <div class="wave-wrapp">
                  <svg
                    class="wave"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 24 150 28"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <path
                        id="gentle-wave"
                        d="m -160,44.4 c 30,0 58,-18 87.7,-18 30.3,0 58.3,18 87.3,18 30,0 58,-18 88,-18 30,0 58,18 88,18 l 0,34.5 -351,0 z"
                      ></path>
                    </defs>
                    <g class="parallax">
                      <use
                        xlink:href="#gentle-wave"
                        x="50"
                        y="0"
                        fill="rgba(255, 255, 255, 0.48)"
                      ></use>
                      <use
                        xlink:href="#gentle-wave"
                        x="50"
                        y="3"
                        fill="rgba(255, 255, 255, 0.78)"
                      ></use>
                      <use
                        xlink:href="#gentle-wave"
                        x="50"
                        y="6"
                        fill="rgba(255, 255, 255, 0.8)"
                      ></use>
                    </g>
                  </svg>
                </div>
              </el-card>
              <story :changeSlide="isOpenRightBar" :change="device" />
            </div>
            <game-bar @right-bar-hander="isOpenRightBar = $event" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GameBar from "@/components/games";
import Story from "@/components/stories";

export default {
  name: "Desktop",
  components: {
    GameBar,
    Story
  },
  data() {
    return {
      key: "",
      logout: "",
      activeName: "",
      isOpenRightBar: true,
      messages: [
        {
          name: "1",
          avatar: "",
          message: "blabla",
          time: "T4"
        },
        {
          name: "1",
          avatar: "",
          message: "blabla",
          time: "T4"
        },
        {
          name: "1",
          avatar: "",
          message: "blabla",
          time: "T4"
        },
        {
          name: "1",
          avatar: "",
          message: "blabla",
          time: "T4"
        },
        {
          name: "1",
          avatar: "",
          message: "blabla",
          time: "T4"
        },
        {
          name: "1",
          avatar: "",
          message: "blabla",
          time: "T4"
        },
        {
          name: "1",
          avatar: "",
          message: "blabla",
          time: "T4"
        },
        {
          name: "1",
          avatar: "",
          message: "blabla",
          time: "T4"
        },
        {
          name: "1",
          avatar: "",
          message: "blabla",
          time: "T4"
        },
        {
          name: "1",
          avatar: "",
          message: "blabla",
          time: "T4"
        },
        {
          name: "1",
          avatar: "",
          message: "blabla",
          time: "T4"
        },
        {
          name: "1",
          avatar: "",
          message: "blabla",
          time: "T4"
        },
        {
          name: "1",
          avatar: "",
          message: "blabla",
          time: "T4"
        },
        {
          name: "1",
          avatar: "",
          message: "blabla",
          time: "T4"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["user", "device"])
  },
  methods: {
    outsideMessageQueue() {
      this.activeName = "";
    },
    changeRightBar() {}
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_mixin.scss";
@keyframes move-forever {
  0% {
    @include translate(-90px, 0%);
  }
  100% {
    @include translate(85px, 0%);
  }
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
  .grid-content {
    height: 100vh;
    .grid-main {
      background-color: #ffffff;
      flex-grow: 1;
      flex-shrink: 1;
      overflow-y: auto;
      width: 474px;
      .header-wrapp {
        width: 100%;
        height: 235px;
        position: relative;
        background: linear-gradient(
          45deg,
          rgba(22, 229, 255, 0.7) 0%,
          rgba(28, 241, 153, 0.6) 100%
        );
        .app-detail {
          text-align: center;
          padding: 20px 5px 5px;
          color: #ffffff;
          .profile {
            text-align: center;
            .avatar {
              padding-bottom: 10px;
              ::v-deep .el-avatar {
                box-shadow: 0 0 15px #ffa000;
                border: 3px solid #ffffff;
              }
            }
          }
          .info-profile {
            span {
              color: #ffffff;
              user-select: none;
              outline: none;
            }
            .name {
              font-weight: bold;
            }
            .email {
              font-weight: 400;
            }
          }
        }
      }
    }
    ::v-deep .el-card {
      border-radius: 0;
      border: none;
      .info {
        display: flex;
        align-items: center;
        justify-content: center;
        ::v-deep .el-avatar {
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
        height: calc(100vh - 79px);
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
        .message-queue {
          padding: 0px 0px 0px 5px;
          margin: 0 -10px;
          .el-collapse {
            border-left: 1px solid #e6ebf5;
            .el-collapse-item__header {
              background-color: #f4f4f4;
            }
            .el-collapse-item__content {
              padding-bottom: 0;
              background-color: #f9f9f9;
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
              &:hover {
                background-color: #f1f1f1;
              }
              .sender-image {
                display: flex;
                align-items: center;
                margin-right: 10px;
                line-height: 0;
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
                }
                .mes-preview {
                  display: flex;
                  align-items: baseline;
                  justify-content: left;
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
