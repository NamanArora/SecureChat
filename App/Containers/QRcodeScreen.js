import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, TouchableOpacity, Linking, Alert, View } from 'react-native'
import { connect } from 'react-redux'
import QRCodeScanner from 'react-native-qrcode-scanner';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/QRcodeScreenStyle';


class QRcodeScreen extends Component {

  onSuccess(e) {
    //Alert.alert(e.data);

}
  render () {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        reactivate={true}
        topContent={(
          <View style={styles.fake}>
          </View>
        )}
        bottomContent={(
          <View style={styles.container}>
          <Text style={styles.centerText}>
            Scan the QR code you would like to connect to.
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
