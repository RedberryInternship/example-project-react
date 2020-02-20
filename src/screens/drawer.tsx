import React, {useContext, ReactElement, Context} from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native'
import {useSafeArea} from 'react-native-safe-area-context'

// import components
import {
  BaseButton,
  DrawerTextFieldItem,
  BaseUserAvatarWithLabel,
  BaseLocaleButton,
} from '../components'

// Navigation
import {NavigationScreenProp} from 'react-navigation'

// import utils
import {Const, Colors, Defaults} from '../utils'
import {useTranslation} from 'react-i18next'
import {AppContext} from '../../App'
import {logOut} from '../hooks/actions/rootActions'

// assets
import Imgs from '../../assets/images'
import {AppContextType} from 'allTypes'

type DrawerPropsType = {
  navigation: NavigationScreenProp<any, any>
}
const Drawer = ({navigation}: DrawerPropsType): ReactElement => {
  const {t, i18n} = useTranslation()
  const insets = useSafeArea()
  const context: AppContextType = useContext(AppContext)
  const isUserAuthorized = !Defaults.token ? false : true

  let drawerListFields = null
  let drawerContent = null

  if (!isUserAuthorized) {
    drawerListFields = Const.DrawerFieldsBeforeAuthorization.map(
      (field, ind) => {
        return (
          <DrawerTextFieldItem
            key={ind}
            onPress={navigation.navigate.bind(Drawer, field.route)}
            {...field}
          />
        )
      },
    )

    drawerContent = (
      <>
        <View>
          <BaseButton
            image={Imgs.user}
            onPress={navigation.navigate.bind(Drawer, 'Auth')}
            text={'home.authorization'}
            style={styles.drawerAuthBtn}
          />

          {drawerListFields}
        </View>

        <View style={{justifyContent: 'flex-end'}}></View>
      </>
    )
  } else {
    const firstName = context?.state?.user?.first_name
    const lastName = context?.state?.user?.last_name

    drawerListFields = Const.DrawerFieldsAfterAuthorization.map(
      (field, key) => {
        return (
          <DrawerTextFieldItem
            key={key}
            onPress={navigation.navigate.bind(Drawer, field.route)}
            badge={field.route === 'notifications' ? 1 : 0}
            {...field}
          />
        )
      },
    )

    drawerContent = (
      <View>
        <BaseUserAvatarWithLabel
          onPress={() => {
            Alert.alert('change icon')
          }}
          firstName={firstName}
          lastName={lastName}
        />
        {drawerListFields}
      </View>
    )
  }

  const toggleLanguage = (): void => {
    i18n.changeLanguage(i18n.language === 'ka' ? 'en' : 'ka')
  }

  return (
    <View
      style={[
        styles.safeAreaViewContainer,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <ScrollView
        bounces={false}
        style={styles.scrollViewStyle}
        contentContainerStyle={styles.scrollViewContentContainerStyle}>
        {drawerContent}
        <View>
          {!isUserAuthorized && (
            <DrawerTextFieldItem
              onPress={() => {
                Alert.alert('asfas')
              }}
              text={'drawer.terms_and_conditions'}
              image={Imgs.greenTick}
            />
          )}
          <View style={styles.localeAndLogoutWrapper}>
            <BaseLocaleButton
              onPress={toggleLanguage}
              text={i18n.language === 'ka' ? 'Eng' : 'Ka'}
              style={styles.localeButton}
            />
            {isUserAuthorized && (
              <TouchableOpacity
                onPress={() => {
                  context.dispatch(logOut())
                }}>
                <Text style={styles.logOut}>{t('drawer.logOut')}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Drawer

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    borderBottomLeftRadius: 24,
    borderTopLeftRadius: 24,
    backgroundColor: Colors.primaryBackground,
  },
  scrollViewStyle: {
    flex: 0,
  },
  scrollViewContentContainerStyle: {
    flex: 0,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  drawerAuthBtn: {
    width: Const.Width - 120,
    marginTop: 10,
    marginBottom: 60,
  },
  localeAndLogoutWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  localeButton: {
    marginLeft: 24,
    marginTop: 20,
    marginBottom: 20,
  },
  logOut: {
    marginRight: 24,
    color: 'white',
  },
})
