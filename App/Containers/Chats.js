import React, { Component } from 'react'
import { View, Alert, Text, FlatList,TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import store from 'react-native-simple-store';

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/ChatsStyle'

class Chats extends Component {

  
  constructor(props){
    super(props)
    this.state = {
      username: '',
      dataObjects : [],
    }
  }

  load = async () => {
    try {
      const name = await AsyncStorage.getItem("username")

      if (name !== null) {
        this.setState({username: name});
        console.log("Setting user to "+ name)
      }
    } catch (e) {
      console.error(e)
    }
  }

  loadChats = () =>{
    store.get('chats')
    .then((names) => {
      console.log(names)
      this.setState({
        dataObjects : names
      })
      names.forEach((name) => {

        
      })
      console.log(this.state.dataObjects)
    })
  }

  componentDidMount(){
    this.loadChats()
  }

  componentWillMount(){
    this.load()
    //this.makeDummy()
    
  }


  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
    dataObjects= [
    ]

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
    
  renderRow ({item}) {
    return (
      <TouchableOpacity onPress={this.openChat.bind(this, item.title)}>
      <View style={styles.row}>
        <Text style={styles.boldLabel}>{item.title.toUpperCase()}</Text>
      </View>
      </TouchableOpacity>
    )
  }

  openChat = (f) =>{
    //console.log("Opening chat from " + this.state.username + " to " + f)
    const { navigation } = this.props;
    navigation.navigate('ChatScreen', {user: this.state.username, friend: f});
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  renderHeader = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Header - </Text>

  // Render a footer?
  renderFooter = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> - Nothing to See Here - </Text>

  renderSeparator = () =>
  <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }}
/>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          extradata={this.state}
          renderItem={this.renderRow.bind(this)}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chats)
