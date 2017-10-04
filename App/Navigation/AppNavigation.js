import { StackNavigator } from 'react-navigation'
import ExistingChatsScreen from '../Containers/ExistingChatsScreen'
import QRcodeScreen from '../Containers/QRcodeScreen'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  ExistingChatsScreen: { screen: ExistingChatsScreen },
  QRcodeScreen: { screen: QRcodeScreen },
  LoginScreen: { screen: LoginScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
