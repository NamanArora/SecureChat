import { StackNavigator, TabNavigator } from 'react-navigation'
import MyQrScreen from '../Containers/MyQrScreen'
import ChatScreen from '../Containers/ChatScreen'
import Chats from '../Containers/Chats'
import Contacts from '../Containers/Contacts'

import QRcodeScreen from '../Containers/QRcodeScreen'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import {Exist} from '../Containers/ExistingChatsScreen'
import styles from './Styles/NavigationStyles'

// Manifest of possible screens


const PrimaryNav = StackNavigator({
  MyQrScreen: { screen: MyQrScreen },
  ChatScreen: { screen: ChatScreen },
  QRcodeScreen: { screen: QRcodeScreen },
  LoginScreen: { screen: LoginScreen },
  LaunchScreen: { screen: LaunchScreen },
  ExistingChatsScreen: { screen: Exist },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})



export default PrimaryNav
