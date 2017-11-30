import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, TextInput, View, Button, Console, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import QRCode from 'react-native-qrcode-svg';
// Styles
import styles from './Styles/MyQrScreenStyle'

class MyQrScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstTime: true,
      username: '',
      text: ''
    }
  }

  componentWillMount() {
    this.load()
  }

  load = async () => {
    try {
      const name = await AsyncStorage.getItem("username")

      if (name !== null) {
        this.setState({username: name, text: name});
      }
    } catch (e) {
      console.error(e)
    }
  }

  save = async (name) => {
    try {
      await AsyncStorage.setItem("username", name.toLowerCase())

      this.setState({username: name.toLowerCase()})
    } catch (e) {
      console.error(e)
    }
  }


  _generateQR =() =>{
    this.save(this.state.text);

  }

  render () {
  
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <View style={styles.centerView}>
            <View style={{marginTop: 50}}>
              
          <TextInput autoCapitalize='none' editable={this.state.username === ''? true: false} value={this.state.text !== ''? this.state.text: ''} width={300} placeholderTextColor={'white'} multiline={false} style={{color:'white'}} placeholder="Enter your username" onChangeText={(text1) => {this.setState({text: text1})}} />
          {this.state.username === '' ? <Button title="Save" onPress={this._generateQR.bind(this)} />: <View />}
          </View>
          {this.state.text!== '' ? <View style={{marginTop: 0}}><QRCode size={300} value={this.state.text} /></View>: <View /> }
          </View>

        </KeyboardAvoidingView>
      </View>
    )
  }
  
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyQrScreen)
