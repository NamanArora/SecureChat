import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import Colors from '../../Themes/Colors'
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  heading:{
    fontSize: 30,
    color: '#FFF'

  },
  logo:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
