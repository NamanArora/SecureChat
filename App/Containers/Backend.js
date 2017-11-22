import firebase from "react-native-firebase";
import CryptoJS from 'crypto-js';

class Backend {
  uid = "";
  friend = ''
  user = ''

  messagesRef = null;
  constructor() {
  }
  setFriend(friend){
    this.friend = friend
  }
  setUser(user) {
    this.user = user
  }
  setUid(value) {
    this.uid = CryptoJS.AES.encrypt(value,'USERKEY').toString();
  }
  getUid() {
    return this.uid;
  }
  // retrieve the messages from the Backend
  loadMessages(callback) {
    console.log("loading messages")
    let merged = (this.friend.charAt(0)> this.user.charAt(0) ? this.user+this.friend : this.friend+this.user)
    this.messagesRef = firebase.database().ref(merged+"/messages");
    this.messagesRef.off();
    const onReceive = data => {
      const message = data.val();
      callback({
        _id: data.key,
        text: CryptoJS.AES.decrypt(message.text, 'RANDOMKEY').toString(CryptoJS.enc.Utf8),
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name
        }
      });
    };
    this.messagesRef.limitToLast(20).on("child_added", onReceive);
  }
  // send the message to the Backend
  sendMessage(message) {
    for (let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: CryptoJS.AES.encrypt(message[i].text,'RANDOMKEY').toString(),
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });
    }
  }
  // close the connection to the Backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
}

export default new Backend();