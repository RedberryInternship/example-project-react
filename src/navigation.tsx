import React from 'react';
import { View,Dimensions, StatusBar, StyleSheet} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { useSafeArea } from 'react-native-safe-area-context';

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
  Favorites,
  Faq,
  ChoosingCard,
  Notifications,
  Contact,
  Tariffs,
  TransactionList,
  ShowTransaction,
  Partners
} from './screens';
import { TabNavigationButtons } from './components';
import { determineTimePeriod } from './utils/mapAndLocation/mapFunctions';


const chargerStack = createStackNavigator({
  ChargerWithCode,
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



const footerTabNavigator = (props: any) => {
  let currentRouteName = props.navigation.state.routes[props.navigation.state.index].key;
  const insets = useSafeArea();

  const navigate = (name: string) => {
    if (name === "drawer") return props.navigation.openDrawer();
    props.navigation.navigate(name)
  }
  if(currentRouteName !== "Home"){
    StatusBar.setBarStyle( "light-content")
  }
  else {
    StatusBar.setBarStyle( determineTimePeriod()  ? "dark-content" : "light-content")
  }

  return (
    <View style={[styles.bottomTabContainer, {paddingBottom : insets.bottom, height: 65 +insets.bottom }]} >
        <TabNavigationButtons 
          active={currentRouteName === "Home"} 
          navigate={navigate.bind(footerTabNavigator, 'Home')} 
          image={require("../assets/images/icons/ic_map_pin.png")} 
        />
        <TabNavigationButtons 
          active={currentRouteName === "chargerStack" || currentRouteName === "NotAuthorized"} 
          navigate={navigate.bind(footerTabNavigator, Defaults.token ? "chargerStack" :  "NotAuthorized"  )} 
          image={require("../assets/images/icons/ic_charge.png")} 
        />
        {
          Defaults.token != null && Defaults.token != "" &&
            <TabNavigationButtons
              navigate={navigate.bind(footerTabNavigator, 'Favorites')}
              image={require("../assets/images/icons/ic_favorite.png")}
              active={currentRouteName === "Favorites"}
            />
        }
        <TabNavigationButtons
          navigate={navigate.bind(footerTabNavigator, 'drawer')}
          image={require("../assets/images/icons/ic_menu.png")}
          active={currentRouteName === "drawer"}
        />
    </View>
  )
}

const HomeTabNavigation = createBottomTabNavigator({
  Home,
  NotAuthorized,
  chargerStack,
  Favorites
},
  {
    // eslint-disable-next-line react/display-name
    tabBarComponent: footerTabNavigator,
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
    contentComponent: Drawer,
    keyboardDismissMode: "on-drag",

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
  ProfileChange,
  Faq,
  Contact,
  Notifications,
  Tariffs,
  TransactionList,
  ShowTransaction,
  Partners
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





const styles = StyleSheet.create({
  bottomTabContainer: { 
    backgroundColor: "#111314", 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-around", 
  },
});
