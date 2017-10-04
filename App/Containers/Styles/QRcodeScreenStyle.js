import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  centerText: {
    flex:1,
    fontSize: 18,
    paddingVertical:15,
    paddingHorizontal:20,
    color: '#FFF',
  },

  textBold: {
    fontWeight: '500',
    color: '#000',
  },

  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },

  buttonTouchable: {
    padding: 16,
},
fake:{
  flex: 1,
  height:100,
  width: 500,
  backgroundColor: '#34495e'
}
})
