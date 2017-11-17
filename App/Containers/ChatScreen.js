import React from 'react'
import { View, Text, FlatList, AsyncStorage, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import CryptoJS from 'crypto-js'
import MessageBox from '../Components/MessageBox'
import { ApplicationStyles, Metrics, Colors } from '../Themes'
import { GiftedChat } from 'react-native-gifted-chat';

// More info here: https://facebostylesok.github.io/react-native/docs/flatlist.html
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
    console.log("Opening chat from " + this.state.username + " to " + this.state.friend)
  }



  getRef = ()=>{
    return firebaseApp.database()
  }

  componentWillMount(){
    this.openChat()
    this.receiveChat()
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  receiveChat = ()=>{
    let ref = this.itemRef.ref(this.state.username+this.state.friend )
    ref.on("value",(snapshot) =>{
      if(snapshot!=null)
      this.parseData(snapshot.val())
    },(error)=>{
      console.log(error.code)
    })

  }

  componentWillUnmount(){
    this.closeChat()
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
      console.log(key)
    })
    // this.setState({messages : []})
    // if(objs!=null)
    // for(element in objs)
    // {
    //   console.log(typeof(element))
    //   let t = {
    //     _id: element._id,
    //     text: element.text,
    //     createdAt: Object.keys(element)[0],
    //     user: {
    //       _id: element.user._id,
    //       name: element.user.name,
    //     },
    //   }
    //   this.setState({
    //     messages: GiftedChat.append(previousState.messages, t),
    //   })
    // }
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
        _id: 1,
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
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: this.state.username,
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
