import firebase from "react-native-firebase";

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
    this.messagesRef = firebase.database().ref("messages");
    this.messagesRef.off();
    const onReceive = data => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name
        }
      });
    };
    this.messagesRef.limitToLast(20).on("child_added", onReceive);
  }
  
}

export default new Backend();