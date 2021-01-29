import React from 'react'
import { useSelector } from 'react-redux'
import { selectApp } from 'state/selectors'
import { FooterTabNavigation } from 'components'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import {
  ChooseChargeMethod,
  ShowTransaction,
  ChargerWithCode,
  SetNewPasswords,
  TransactionList,
  ForgotPassword,
  ProfileChange,
  ChargerDetail,
  NotAuthorized,
  Registration,
  ChooseAvatar,
  ChoosingCard,
  Favorites,
  Settings,
  Partners,
  Charging,
  Opening,
  CardAdd,
  Contact,
  Drawer,
  Auth,
  Home,
  Faq,
} from 'screens'
import { Width } from 'utils/const'
import { StyleSheet } from 'react-native'
import { onNavigationStateChange, setNavigatorRef } from 'utils/navigation'
import defaults from 'utils/defaults'
import {
  transactionStackOptions,
  chargerStackOptions,
  drawerMenuOptions,
  authStackOptions,
  mainStackOptions,
} from './config'

const ChargerStackNavigator = createNativeStackNavigator()
const HomeTabNavigator = createBottomTabNavigator()
const MainDrawerNavigator = createDrawerNavigator()
const AuthStackNavigator = createNativeStackNavigator()
const DrawerMenuOptionsStackNavigator = createNativeStackNavigator()
const TransactionStackNavigator = createNativeStackNavigator()
const MainStackNavigator = createNativeStackNavigator()

const ChargerStack = () => (
  <ChargerStackNavigator.Navigator
    screenOptions={chargerStackOptions}
    initialRouteName="ChargerWithCode"
    mode="card"
  >
    <ChargerStackNavigator.Screen name="ChargerWithCode" component={ChargerWithCode} />
    <ChargerStackNavigator.Screen name="ChargerDetail" component={ChargerDetail} />
    <ChargerStackNavigator.Screen name="ChooseChargeMethod" component={ChooseChargeMethod} />
    <ChargerStackNavigator.Screen name="ChoosingCard" component={ChoosingCard} />
  </ChargerStackNavigator.Navigator>
)

const HomeTabNavigation = () => (
  <HomeTabNavigator.Navigator
    tabBar={() => <FooterTabNavigation />}
    initialRouteName="Home"
  >
    <HomeTabNavigator.Screen name="Home" component={Home} />
    <HomeTabNavigator.Screen name="ChargerStack" component={ChargerStack} />
    <HomeTabNavigator.Screen name="Favorites" component={Favorites} />
    <HomeTabNavigator.Screen name="Charging" component={Charging} />
    <HomeTabNavigator.Screen name="NotAuthorized" component={NotAuthorized} />
  </HomeTabNavigator.Navigator>
)

const MainDrawer = () => (
  <MainDrawerNavigator.Navigator
    initialRouteName="HomeTabNavigation"
    drawerPosition="right"
    drawerType="front"
    drawerStyle={styles.drawer}
    sceneContainerStyle={styles.drawerSceneContainer}
    drawerContent={() => <Drawer />}
    keyboardDismissMode="on-drag"
  >
    <MainDrawerNavigator.Screen name="HomeTabNavigation" component={HomeTabNavigation} />
  </MainDrawerNavigator.Navigator>
)

const AuthStack = () => (
  <AuthStackNavigator.Navigator screenOptions={authStackOptions}>
    <AuthStackNavigator.Screen name="Auth" component={Auth} />
    <AuthStackNavigator.Screen name="ForgotPassword" component={ForgotPassword} />
    <AuthStackNavigator.Screen name="Registration" component={Registration} />
    <AuthStackNavigator.Screen name="SetNewPasswords" component={SetNewPasswords} />
  </AuthStackNavigator.Navigator>
)

const DrawerMenuOptions = () => (
  <DrawerMenuOptionsStackNavigator.Navigator screenOptions={drawerMenuOptions}>
    <DrawerMenuOptionsStackNavigator.Screen name="Settings" component={Settings} />
    <DrawerMenuOptionsStackNavigator.Screen name="ProfileChange" component={ProfileChange} />
  </DrawerMenuOptionsStackNavigator.Navigator>
)

const TransactionStack = () => (
  <TransactionStackNavigator.Navigator screenOptions={transactionStackOptions}>
    <TransactionStackNavigator.Screen name="TransactionList" component={TransactionList} />
    <TransactionStackNavigator.Screen name="ShowTransaction" component={ShowTransaction} />
  </TransactionStackNavigator.Navigator>
)

const MainStack = () => (
  <MainStackNavigator.Navigator screenOptions={mainStackOptions}>
    <MainStackNavigator.Screen name="MainDrawer" component={MainDrawer} />
    <MainStackNavigator.Screen name="AuthStack" component={AuthStack} />
    <MainStackNavigator.Screen name="DrawerMenuOptions" component={DrawerMenuOptions} />
    <MainStackNavigator.Screen name="Faq" component={Faq} />
    <MainStackNavigator.Screen name="Contact" component={Contact} />
    <MainStackNavigator.Screen name="Partners" component={Partners} />
    <MainStackNavigator.Screen name="TransactionStack" component={TransactionStack} />
    <MainStackNavigator.Screen name="ChooseAvatar" component={ChooseAvatar} />
    <MainStackNavigator.Screen name="CardAdd" component={CardAdd} />
  </MainStackNavigator.Navigator>
)

const Navigation = () => {
  const { ready } = useSelector(selectApp)

  defaults.appReady = ready

  return ready
    ? (
      <NavigationContainer onStateChange={onNavigationStateChange} ref={setNavigatorRef}>
        <MainStack />
      </NavigationContainer>
    )
    : <Opening />
}

export default Navigation

const styles = StyleSheet.create(
  {
    drawer: {
      backgroundColor: 'transparent',
      width: Width * 0.8,
    },
    drawerSceneContainer: {
      backgroundColor: 'transparent',
      flex: 1,
    },
  },
)
