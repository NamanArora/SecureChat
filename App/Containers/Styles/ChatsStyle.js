import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  row: {
    flex: 1,
    backgroundColor: Colors.background,
    marginVertical: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  boldLabel: {
    fontWeight: 'bold',
    alignItems: 'center',
    color: Colors.snow,
    textAlign: 'left',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  label: {
    textAlign: 'left',
    color: Colors.snow
  },
  listContent: {
    marginTop: 0
  },
  chatbox:{
    backgroundColor: "#FFF",
    margin: 10,
  }
})
