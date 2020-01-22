
import React from 'react';
import {View,} from 'react-native';
import {SafeAreaView} from "react-navigation"

import {TabNavigationButtons} from "../"
import { Defaults } from '../../utils';

 const footerTabNavigationView= (props : any) => {

  const navigate = (name : string) => {
    if(name === "drawer") return props.navigation.openDrawer();
    props.navigation.navigate(name)
  }
  return (
    <View style={{ backgroundColor:"#111314",alignItems:"stretch",justifyContent:"center"}}>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-around", height: 65}}>
        <TabNavigationButtons navigate={navigate.bind(navigate, 'Home')} image={require("../assets/images/ic_map_pin.png")} />
        <TabNavigationButtons navigate={navigate.bind(navigate, 'Charger')} image={require("../assets/images/ic_charge.png")} />
        {
          Defaults.token &&
            <TabNavigationButtons navigate={navigate.bind(navigate, 'Favorite')} image={require("../assets/images/ic_favorite.png")} />
        
        } 
        <TabNavigationButtons navigate={navigate.bind(navigate, 'drawer')} image={require("../assets/images/ic_menu.png")} />
      
      </View>
    </View>
  )
}

export default footerTabNavigationView;