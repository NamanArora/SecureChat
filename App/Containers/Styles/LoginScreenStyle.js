import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import Colors from '../../Themes/Colors'
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  heading:{
    fontSize: 25,
    color: Colors.text

  }
})
