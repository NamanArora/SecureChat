import React from 'react'
import { View, Text, FlatList, AsyncStorage, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import CryptoJS from 'crypto-js'
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

  receiveChat = ()=>{
    
    let ref = this.itemRef.ref(this.state.username+this.state.friend )
    ref.on("value",(snapshot) =>{
      console.log("data received")
      if(snapshot.val()){
        this.parseData(snapshot.val())
      }
      
    },(error)=>{
      console.log(error.code)
    })

  }

  componentWillUnmount(){
    Backend.closeChat()
  }

  openChat =() =>{
    if(this.itemRef)
    this.itemRef.goOnline()
  }
  closeChat = ()=>{
    if(this.itemRef)
      this.itemRef.goOffline()
  }

  
  sendChat = () =>{
    console.log("enter")
    let message = this.state.text
    let encrypted = CryptoJS.AES.encrypt(message,'key').toString()
    this.writeData(encrypted)
    this.setState({
      text: ''
    })
  }

  parseData = (objs = {}) =>{
    
    Object.keys(objs).forEach((key) =>{
      let obj = objs[key]["message"]
      console.log(obj)
      this.setState({
        messages: [...this.state.messages, obj]
    }, ()=>{
      console.log(this.state.messages)
    })
  })
  }

  writeData = (m) =>{
    let timeStamp = Math.floor(Date.now() / 1000)
    this.itemRef.ref(this.state.username+this.state.friend + '/'+m.createdAt ).set(
      {
        message: m
      }
    )
  }

  renderRow ({item}) {
    return (
      <View style={styles.row}>
        <Text style={styles.boldLabel}>{item.title}</Text>
        <Text style={styles.label}>{item.description}</Text>
      </View>
    )
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  
    let t = {
      _id: messages[0]._id,
      text: messages[0].text,
      createdAt:  messages[0].createdAt,
      user: {
        _id: Backend.getUid(),
        name: this.state.username
      },
    }
    this.writeData(t)
    //console.log(messages)
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
