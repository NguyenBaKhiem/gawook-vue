import BaseModelRequest from "./base/BaseModelRequest";

export default class MessageRequest extends BaseModelRequest {
  allConversation() {
    return this.get("/all-conversation");
  }

  getCurrentUser(params) {
    return new Promise((resolve, reject) => {
      let url = "/user";
      var self = this;
      this.get(url, params)
        .then(function(user) {
          self.user = user;
          resolve(user);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }

  updateCurrentUser(params) {
    return new Promise((resolve, reject) => {
      let url = "/user/update-profile";
      var self = this;
      this.put(url, params)
        .then(function(user) {
          self.user = user;
          resolve(user);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }

  room(params) {
    let url = "/chatroom";
    return this.get(url, params);
  }

  sendMessage(params) {
    let url = "/chatroom/send";
    return this.post(url, params);
  }

  block(params) {
    let url = "/chatroom/block";
    return this.get(url, params);
  }

  update(params) {
    let url = "/chatroom/update";
    return this.put(url, params);
  }
}
