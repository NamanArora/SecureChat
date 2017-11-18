import firebase from "react-native-firebase";
import CryptoJS from 'crypto-js';

class Backend {
  uid = "";
  messagesRef = null;
  constructor() {
      this.setUid(1)
  }
  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }
  // retrieve the messages from the Backend
  loadMessages(callback) {
    console.log("loading messages")
    this.messagesRef = firebase.database().ref("messages");
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