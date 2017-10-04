import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.coal
  },
  row: {
    flex: 1,
    backgroundColor: Colors.coal,
    marginVertical: 0,
    paddingVertical: 10,
    justifyContent: 'center'
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: Colors.snow,
    textAlign: 'left',
    marginBottom: Metrics.smallMargin
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
