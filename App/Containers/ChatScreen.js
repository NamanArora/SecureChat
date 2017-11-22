import React from 'react'
import { View, Text, FlatList, AsyncStorage, TextInput, Button, BackAndroid } from 'react-native'
import { connect } from 'react-redux'
import MessageBox from '../Components/MessageBox'
import { ApplicationStyles, Metrics, Colors } from '../Themes'
import { GiftedChat } from 'react-native-gifted-chat';
import Backend from "./Backend";
import firebase from "react-native-firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDG_UuKc3pDG0Z3vLKrpTEQN8Z2AaauY9M",
  authDomain: "chat-fd5fc.firebaseapp.com",
  databaseURL: "https://chat-fd5fc.firebaseio.com",
  projectId: "chat-fd5fc",
  storageBucket: "chat-fd5fc.appspot.com",
}
const firebaseApp = firebase.initializeApp(firebaseConfig)

// Styles
import styles from './Styles/ChatScreenStyle'

class ChatScreen extends React.PureComponent {

  constructor(props){
    super(props)
    this.itemRef = this.getRef()
    const {state} = props.navigation;
    this.state= {
      username: state.params.user,
      friend: state.params.friend,
      text: 'Placeholder',
      messages: [],
    }
  }

  getRef = ()=>{
    return firebaseApp.database()
  }

  componentWillMount(){
    Backend.setUid(this.state.username)
    Backend.setFriend(this.state.friend)
    Backend.setUser(this.state.username)
  }

  componentDidMount() {
    Backend.loadMessages(message => {
      this.setState(previousState => {
        return {
          messages: GiftedChat.append(previousState.messages, message)
        };
      });
    });
}

  componentWillUnmount(){
    Backend.closeChat()
  }

  render () {
    console.log("refresh")
    return (
      <View style={styles.container}>
      <GiftedChat
        messages={this.state.messages}
        onSend={message => {
          Backend.sendMessage(message);
        }}
        user={{
          _id: Backend.getUid(),
          name: this.state.username
        }}
      />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
