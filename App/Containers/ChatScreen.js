import React from 'react'
import { View, Text, FlatList, AsyncStorage, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import CryptoJS from 'crypto-js'
import MessageBox from '../Components/MessageBox'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html
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
      text: 'Placeholder'
    }
    console.log("Opening chat from " + this.state.username + " to " + this.state.friend)
  }

  getRef = ()=>{
    return firebaseApp.database()
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

  writeData = (m) =>{
    this.itemRef.ref(this.state.username+this.state.friend + '/'+5678 ).set(
      {
        name: this.state.username,
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

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  renderHeader = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Header - </Text>

  // Render a footer?
  renderFooter = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> - Nothing to See Here - </Text>

  renderSeparator = () =>
    <Text style={styles.label}> - ~~~~~ - </Text>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  render () {
    console.log("refresh")
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
      <Button onPress={this.sendChat.bind(this)} title="Send" color="#841584" />
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
