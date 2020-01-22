import React from 'react';
import { View,Dimensions} from 'react-native';
import { createAppContainer, createSwitchNavigator, SafeAreaView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// import {SafeAreaView} from "react-native-safe-area-context"
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


const HomeTabNavigation = createBottomTabNavigator({
  Home,
  NotAuthorized,
  chargerStack,
  Favorites
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
          navigate={navigate.bind(FooterTabNavigator, Defaults.token ? "chargerStack" :  " NotAuthorized"  )} 
          image={require("../assets/images/icons/ic_charge.png")} 
        />
        {
          Defaults.token &&
          <TabNavigationButtons
            navigate={navigate.bind(FooterTabNavigator, 'Favorites')}
            image={require("../assets/images/icons/ic_favorite.png")}
            active={currentRouteName === "Favorites"}
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