import React, {useMemo, createContext} from 'react'
import {Dimensions} from 'react-native'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {FooterTabNavigation} from 'components'

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
  Partners,
  SetNewPasswords,
  ChooseAvatar,
  CardAdd,
} from 'screens'

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
        backgroundColor: 'transparent',
        opacity: 1,
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
    Notifications,
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
        backgroundColor: 'transparent',
        opacity: 1,
      },
      animationEnabled: false,
    },
  },
)

const AppNavigator = createSwitchNavigator(
  {
    Plashka,
    MainStack,
  },
  {
    initialRouteName: 'Plashka',
  },
)

export default React.memo(createAppContainer(AppNavigator))
