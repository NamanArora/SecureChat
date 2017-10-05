import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import Colors from '../../Themes/Colors'
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  heading:{
    fontSize: 30,
    color: '#FFF'

  },
  buttons:{
    marginTop: 100,
  },
  footer:{
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:100,
  },
  scroll:{
    
  }
})
