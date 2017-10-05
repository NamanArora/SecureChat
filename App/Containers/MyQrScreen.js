import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, TextInput, View, Button } from 'react-native'
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
      username: ''
    }
  }

  _generateQR =() =>{

  }

  render () {
  
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <View style={styles.centerView}>
            <View style={{marginTop: 50}}>
              
          <TextInput editable={false}  width={300} placeholderTextColor={'white'} multiline={false} style={{color:'white'}} placeholder="Enter your username" onChangeText={(text) => this.setState({username: text})} />
          {<Button title="Save" onPress={this._generateQR.bind(this)} />}
          </View>
          {this.state.username!== '' ? <View style={{marginTop: 0}}><QRCode size={300} value={this.state.username} /></View>: <View /> }
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
