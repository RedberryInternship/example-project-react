import React from 'react';
import { View,Dimensions, SafeAreaView} from 'react-native';
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
  ChargerWithCode,
  ForgotPassword,
  Registration,
  Settings,
  ProfileChange,
  ChargerDetail,
  NotAuthorized,
  ChooseChargeMethod,
  Charging,
  ChoosingCard,
  Favourites
} from './screens';
import { TabNavigationButtons } from './components';



const chargerStack = createStackNavigator({
  ChargerDetail,
  ChooseChargeMethod,
  Charging,
  ChoosingCard
},
{
  defaultNavigationOptions: {
    headerShown: false
  }
})


const HomeTabNavigation = createBottomTabNavigator({
  Home,
  NotAuthorized,
  ChargerWithCode,
  Favourites
},
  {
    // eslint-disable-next-line react/display-name
    tabBarComponent:( props :any ) => <FooterTabNavigator {...props} />,

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

const authenticationStack = createStackNavigator({
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
  Settings,
  ProfileChange
},
{
  defaultNavigationOptions: {
    headerShown:false
  }
})

const AppNavigator = createSwitchNavigator({

  Plashka,
  authenticationStack,
  MainDrawer,
  drawerMenuOptionsStack,
  chargerStack
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
        <TabNavigationButtons 
          active={currentRouteName === "Home"} 
          navigate={navigate.bind(FooterTabNavigator, 'Home')} 
          image={require("../assets/images/icons/ic_map_pin.png")} 
        />
        <TabNavigationButtons 
          active={currentRouteName === "chargerStack"} 
          navigate={navigate.bind(FooterTabNavigator, Defaults.token ? "ChargerWithCode" :  " NotAuthorized"  )} 
          image={require("../assets/images/icons/ic_charge.png")} 
        />
        {
          Defaults.token &&
          <TabNavigationButtons
            navigate={navigate.bind(FooterTabNavigator, 'Favourites')}
            image={require("../assets/images/icons/ic_favorite.png")}
            active={currentRouteName === "Favourites"}
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