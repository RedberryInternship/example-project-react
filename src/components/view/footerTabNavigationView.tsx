
import React, {useRef} from 'react';
import { StyleSheet, ScrollView, View,} from 'react-native';
import { useMap } from '../../../src/hooks';
import {SafeAreaView} from "react-navigation"

import {TabNavigationButtons} from "../"
import { Defaults } from '../../utils';

export default (props : any) => {
  let currentRouteName = props.navigation.state.routes[props.navigation.state.index].key;

  const navigate = (name : string) => {
    if(name === "drawer") return props.navigation.openDrawer();
    props.navigation.navigate(name)
  }
  return (
    <SafeAreaView style={{ backgroundColor:"#111314",alignItems:"stretch",justifyContent:"center"}}>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-around", height: 65}}>
        <TabNavigationButtons navigate={navigate.bind(navigate, 'Home')} image={require("../assets/images/ic_map_pin.png")} />
        <TabNavigationButtons navigate={navigate.bind(navigate, 'Charger')} image={require("../assets/images/ic_charge.png")} />
        {
          Defaults.token &&
            <TabNavigationButtons navigate={navigate.bind(navigate, 'Favorite')} image={require("../assets/images/ic_favorite.png")} />
        
        } 
        <TabNavigationButtons navigate={navigate.bind(navigate, 'drawer')} image={require("../assets/images/ic_menu.png")} />
      
      </View>
      </SafeAreaView>
  )
}