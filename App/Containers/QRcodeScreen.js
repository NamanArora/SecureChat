import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, TouchableOpacity, Linking, Alert, View } from 'react-native'
import { connect } from 'react-redux'
import QRCodeScanner from 'react-native-qrcode-scanner';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import store from 'react-native-simple-store';
// Styles
import styles from './Styles/QRcodeScreenStyle';


class QRcodeScreen extends Component {

  storeName = (name) =>{
    console.log(name)
    let obj = {
      title: name
    }
    store.push('chats', obj)
  }

  onSuccess(e) {
    //Alert.alert(e.data);
    this.storeName(e.data)


}
  render () {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        reactivate={false}
        topContent={(
          <View style={styles.container}>
          <Text style={styles.centerText}>
            Scan the QR code of the friend you would like to connect to.
          </Text>
            </View>
        )}
        bottomContent={(
          <View style={styles.container}>
          <Text style={styles.centerText}>
            Close this screen after you feel the vibration.
          </Text>
            </View>
        )}
/>
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

export default connect(mapStateToProps, mapDispatchToProps)(QRcodeScreen)
