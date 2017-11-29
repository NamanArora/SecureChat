import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Button, View, Alert, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import RoundedButton from '../Components/RoundedButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../Themes/Colors'
// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {

  _addQR = () =>{
    this.props.navigation.navigate('QRcodeScreen');
  }

  _myQR = ()=>{
    this.props.navigation.navigate('MyQrScreen');
  }

  _existing = () =>{
    this.props.navigation.navigate('ExistingChatsScreen');
  }

  render () {
    return (
      <View style={[styles.container, styles.scroll]}>
        <KeyboardAvoidingView behavior='position'>
          <View >
            <View style={styles.logo}>
            <TouchableOpacity style={{ height: 100, width: 100,}} onPress={this._myQR.bind(this)}>
              <View>
            <Icon name="fingerprint" size={100} color={Colors.fire} />
            </View>
            </TouchableOpacity>
            
            <Text style={styles.heading}>SecureChat</Text>
           
            <Text style={styles.subtitle}>A Super secure messaging app</Text>
            </View>
          <View style={styles.buttons}>
          <RoundedButton text="add new qr code" onPress={this._addQR.bind(this)} /> 
          <RoundedButton text="existing chats" onPress={this._existing.bind(this)} />  
          </View>
          <View style={styles.footer} >
          <Text style={styles.bottomLiner}>Information Security Project</Text>
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
