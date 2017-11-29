import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { StackNavigator, TabNavigator } from 'react-navigation'
import Chats from '../Containers/Chats'
import Contacts from '../Containers/Contacts'
import { ApplicationStyles, Colors } from '../Themes/'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ExistingChatsScreenStyle'


export const Exist= TabNavigator({
  Chats: { screen: Chats },
},{
  tabBarOptions: {
    activeTintColor: Colors.snow,
    labelStyle: {
      fontSize: 12,
      fontWeight: 'bold'
    },
    style: {
      backgroundColor: Colors.peter,
    },
    tabStyle:{
      borderBottomColor: 'black',
      borderBottomWidth: 3,
    }
  }
});
