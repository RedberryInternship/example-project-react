import React from 'react'
import { Dimensions } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { FooterTabNavigation } from 'components'

import {
  Home,
  Drawer,
  Auth,
  Opening,
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
  Contact,
  Tariffs,
  TransactionList,
  ShowTransaction,
  Partners,
  SetNewPasswords,
  ChooseAvatar,
  CardAdd,
} from 'screens'
import { Colors } from 'utils'

const ChargerStack = createStackNavigator(
  {
    ChargerWithCode,
    ChargerDetail,
    ChooseChargeMethod,
    ChoosingCard,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      cardStyle: {
        backgroundColor: 'transparent',
        opacity: 1,
      },
    },
    initialRouteName: 'ChargerWithCode',
  },
)

const HomeTabNavigation = createBottomTabNavigator(
  {
    Home,
    ChargerStack,
    Favorites,
    Charging,
    NotAuthorized,
  },
  {
    tabBarComponent: FooterTabNavigation,
    initialRouteName: 'Home',
  },
)

export const MainDrawer = createDrawerNavigator(
  {
    HomeTabNavigation,
  },
  {
    initialRouteName: 'HomeTabNavigation',
    drawerPosition: 'right',
    drawerBackgroundColor: 'transparent',
    drawerType: 'front',
    drawerWidth: Dimensions.get('window').width * 0.8,
    contentComponent: Drawer,
    keyboardDismissMode: 'on-drag',
  },
)

const authenticationStack = createStackNavigator(
  {
    Auth,
    ForgotPassword,
    Registration,
    SetNewPasswords,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      cardStyle: {
        backgroundColor: 'transparent',
        opacity: 1,
      },
    },
  },
)

const drawerMenuOptionsStack = createStackNavigator(
  {
    Settings,
    ProfileChange,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      cardStyle: {
        backgroundColor: Colors.primaryBackground,
        opacity: 1,
        backfaceVisibility: 'hidden',
      },
    },
  },
)

const transactionStack = createStackNavigator(
  {
    TransactionList,
    ShowTransaction,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      cardStyle: {
        backgroundColor: 'transparent',
        opacity: 1,
      },
    },
  },
)

const MainStack = createStackNavigator(
  {
    MainDrawer,
    authenticationStack,
    drawerMenuOptionsStack,
    Faq,
    Contact,
    Tariffs,
    Partners,
    transactionStack,
    ChooseAvatar,
    CardAdd,
  },
  {
    initialRouteName: 'MainDrawer',
    defaultNavigationOptions: {
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      cardStyle: {
        backgroundColor: Colors.primaryBackground,
        backfaceVisibility: 'hidden',
        opacity: 1,
      },
    },
  },
)

const AppNavigator = createSwitchNavigator(
  {
    Opening,
    MainStack,
  },
  {
    initialRouteName: 'Opening',
  },
)

export default createAppContainer(AppNavigator)
