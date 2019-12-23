import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Alert } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Defaults } from './utils';

//screens
import {
  Home,
  Drawer,
  Auth,
  Plashka,
  Charger,
  ForgotPassword,
  Registration,
  Settings,
  ProfileChange
} from './screens';
import { TabNavigationButtons } from './components';

const HomeTabNavigation = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: '',
    }
  },
  Charger: {
    screen: Charger,
    navigationOptions: {
      title: '',
    }
  },
},
  {
    tabBarComponent: props => <FooterTabNavigator {...props} />,

    initialRouteName: "Home",
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      tabStyle: {
        height: 60,
      },
      style: {
        backgroundColor: "#111314"
      }
    },
  }
)


export const MainDrawer = createDrawerNavigator(
  {
    HomeTabNavigation
  },
  {
    drawerPosition: "right",
    drawerBackgroundColor: "transparent",
    drawerType: "front",
    drawerWidth: Dimensions.get("window").width * 0.8,
    // overlayColor:0.5,
    // edgeWidth : Platform.OS == "ios" ?20 : - Dimensions.get("window").width +20,
    // backBehavior : "initialRoute",
    contentComponent: Drawer,
    keyboardDismissMode: "on-drag",
    // drawerLockMode: 'locked-closed',


  },
)

const authenticationFlow = createStackNavigator({
  Auth,
  ForgotPassword,
  Registration,
},
  {
    defaultNavigationOptions: {
      headerShown: false
    }
  })


const drawerMenuOptionsStack = createStackNavigator({
  Settings: { screen: Settings },
  ProfileChange: { screen: ProfileChange }
},
{
  defaultNavigationOptions: {
    headerShown:false
  }
})

const AppNavigator = createSwitchNavigator({

  Plashka: {
    screen: Plashka,
  },
  authenticationFlow,
  MainDrawer,
  drawerMenuOptionsStack
}, {
  initialRouteName: "Plashka"
});

export default createAppContainer(AppNavigator);




const FooterTabNavigator = (props: any) => {
  let currentRouteName = props.navigation.state.routes[props.navigation.state.index].key;

  const navigate = (name: string) => {
    if (name === "drawer") return props.navigation.openDrawer();
    props.navigation.navigate(name)
  }
  return (
    <SafeAreaView style={{ backgroundColor: "#111314", alignItems: "stretch", justifyContent: "center" }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", height: 65 }}>
        <TabNavigationButtons active={currentRouteName === "Home"} navigate={navigate.bind(FooterTabNavigator, 'Home')} image={require("../assets/images/icons/ic_map_pin.png")} />
        <TabNavigationButtons active={currentRouteName === "Charger"} navigate={navigate.bind(FooterTabNavigator, 'Charger')} image={require("../assets/images/icons/ic_charge.png")} />
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