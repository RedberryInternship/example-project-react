import React, {useEffect} from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, Alert} from 'react-native';
import { createAppContainer, createSwitchNavigator,SafeAreaView} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Defaults } from './utils';

//screens
import { Home, Drawer,Auth, Plashka, Charger } from './screens';
import { TabNavigationButtons } from './components';

const HomeTabNavigation = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions : {
      title : '',
    }
  },
  Charger: {
    screen: Charger,
    navigationOptions : {
      title : '',
    }
  },
  },
  {
    // defaultNavigationOptions: ({ navigation }) => ({
    //   tabBarIcon: ({ focused, horizontal, tintColor }) => {
    //     const { routeName } = navigation.state;
    //     let icon;
    //     if (routeName === 'Home') {
    //       icon = require("../assets/images/ic_map_pin.png");
    //     } else if (routeName === 'Charger') {
    //       icon = require("../assets/images/ic_charge.png");
    //     } else if (routeName === 'drawer') {
    //       icon = require("../assets/images/ic_menu.png");
    //       if(focused){
    //         navigation.openDrawer()
    //       }
    //     }

    //     return  <Image  source = {icon} style={{width:25,height:25, resizeMode:"contain", marginTop:10}}/>
                
    //   },
    // }),
    tabBarComponent: props => <FooterTabNavigator {...props} />,

    initialRouteName:"Home",
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      tabStyle : {
        height:60,
      },
      style : {
        backgroundColor:"#111314"
      }
    },
  }
)


export const MainDrawer = createDrawerNavigator(
  {
      HomeTabNavigation
  },
  {
      drawerPosition : "right",
      drawerBackgroundColor : "#f2f2f3",
      drawerType:"front",
      drawerWidth:Dimensions.get("window").width * 0.8,
      // overlayColor:0.5,
      // edgeWidth : Platform.OS == "ios" ?20 : - Dimensions.get("window").width +20,
      // backBehavior : "initialRoute",
      contentComponent : Drawer,
      keyboardDismissMode : "on-drag",
      // drawerLockMode: 'locked-closed',
      
  },
  // {
  //   initialRouteName : "HomeTabNavigation",
  //   defaultNavigationOptions : {
  //       headerMode: 'none',
  //       headerVisible: false,
  //       header: null,
  //       gesturesEnabled: false,
  //   },
  // }
)

const AppNavigator = createSwitchNavigator({

  Plashka : {
    screen: Plashka,
  },
  Auth : {
    screen: Auth,
  },
  MainDrawer
},{
  initialRouteName: "Plashka"
});

export default createAppContainer(AppNavigator);


const FooterTabNavigator = (props : any) => {
  let currentRouteName = props.navigation.state.routes[props.navigation.state.index].key;

  const navigate = (name : string) => {
    if(name === "drawer") return props.navigation.openDrawer();
    props.navigation.navigate(name)
  }
  return (
    <SafeAreaView style={{ backgroundColor:"#111314",alignItems:"stretch",justifyContent:"center"}}>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-around", height: 65}}>
        <TabNavigationButtons active={currentRouteName === "Home" }  navigate={navigate.bind(FooterTabNavigator, 'Home')} image={require("../assets/images/icons/ic_map_pin.png")} />
        <TabNavigationButtons  active={currentRouteName === "Charger"} navigate={navigate.bind(FooterTabNavigator, 'Charger')} image={require("../assets/images/icons/ic_charge.png")} />
        {
          Defaults.token &&
            <TabNavigationButtons 
              navigate={navigate.bind(FooterTabNavigator, 'Favorite')} 
              image={require("../assets/images/icons/ic_favorite.png")} 
              active={currentRouteName === "Favorite"}
            />
        
        } 
        <TabNavigationButtons 
          navigate={navigate.bind(FooterTabNavigator, 'drawer')} 
          image={require("../assets/images/icons/ic_menu.png")} 
          active={currentRouteName === "drawer"}
        />
      
      </View>
      </SafeAreaView>
  )
}