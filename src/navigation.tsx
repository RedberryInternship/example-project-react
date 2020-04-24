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
} from 'screens'

const chargerStack = createStackNavigator(
  {
    ChargerWithCode,
    ChargerDetail,
    ChooseChargeMethod,
    ChoosingCard,
    NotAuthorized,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
    initialRouteName: 'ChargerWithCode',
  },
)

const HomeTabNavigation = createBottomTabNavigator(
  {
    Home,
    chargerStack,
    Favorites,
    Charging,
  },
  {
    tabBarComponent: FooterTabNavigation,
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      tabStyle: {
        height: 60,
      },
      style: {
        backgroundColor: '#111314',
      },
    },
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
    },
  },
)

const AppNavigator = createSwitchNavigator(
  {
    Plashka,
    authenticationStack,
    MainDrawer,
    drawerMenuOptionsStack,
    chargerStack,
    Faq,
    Contact,
    Tariffs,
    Partners,
    transactionStack,
    Notifications,
  },
  {
    initialRouteName: 'Plashka',
  },
)

export default createAppContainer(AppNavigator)
