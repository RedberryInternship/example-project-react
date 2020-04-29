import React, {useContext, ReactElement} from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native'
import {useSafeArea} from 'react-native-safe-area-context'
import {useTranslation} from 'react-i18next'

import {AppContextType, ScreenPropsWithNavigation} from 'allTypes'

import {BaseButton} from 'components'

import {Const, Colors, Helpers} from 'utils'
import {AppContext} from '../../../../App'
import {logOut} from '../../../hooks/actions/rootActions'
import images from 'assets/images'
import {
  DrawerTextFieldItem,
  BaseUserAvatarWithLabel,
  BaseLocaleButton,
} from './components'
import {useAsyncStorage} from '@react-native-community/async-storage'

const Drawer = ({navigation}: ScreenPropsWithNavigation): ReactElement => {
  const {t, i18n} = useTranslation()
  const insets = useSafeArea()
  const context: AppContextType = useContext(AppContext)
  const {setItem: setLocaleStorage} = useAsyncStorage('locale')
  let drawerContent = null

  const toggleLanguage = (): void => {
    const locale: 'en' | 'ka' | 'ru' = i18n.language === 'ka' ? 'en' : 'ka'
    setLocaleStorage(locale)
    i18n.changeLanguage(locale)
  }

  if (!Helpers.isAuthenticated()) {
    drawerContent = (
      <>
        <View>
          <BaseButton
            image={images.user}
            onPress={navigation.navigate.bind(Drawer, 'Auth')}
            text={'home.authorization'}
            style={styles.drawerAuthBtn}
          />

          {Const.DrawerFieldsBeforeAuthorization.map((field, ind) => {
            return (
              <DrawerTextFieldItem
                key={ind}
                onPress={navigation.navigate.bind(Drawer, field.route)}
                {...field}
              />
            )
          })}
        </View>

        <View style={{justifyContent: 'flex-end'}}></View>
      </>
    )
  } else {
    const firstName = context?.state?.user?.first_name
    const lastName = context?.state?.user?.last_name
    drawerContent = (
      <View>
        <BaseUserAvatarWithLabel
          onPress={(): void => {
            navigation.navigate('ChooseAvatar')
          }}
          avatar={context?.state.user?.avatar}
          firstName={firstName ?? ''}
          lastName={lastName ?? ''}
        />
        {Const.DrawerFieldsAfterAuthorization.map((field, key) => {
          return (
            <DrawerTextFieldItem
              key={key}
              onPress={navigation.navigate.bind(Drawer, field.route)}
              badge={field.route === 'notifications' ? 1 : 0}
              {...field}
            />
          )
        })}
      </View>
    )
  }

  return (
    <View
      style={[
        styles.safeAreaViewContainer,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}
    >
      <ScrollView
        bounces={false}
        style={styles.scrollViewStyle}
        contentContainerStyle={styles.scrollViewContentContainerStyle}
      >
        {drawerContent}
        <View>
          {!Helpers.isAuthenticated() && (
            <DrawerTextFieldItem
              onPress={(): void => {
                Alert.alert('asfas')
              }}
              text={'drawer.terms_and_conditions'}
              image={images.greenTick}
            />
          )}
          <View style={styles.localeAndLogoutWrapper}>
            <BaseLocaleButton
              onPress={toggleLanguage}
              text={i18n.language === 'ka' ? 'Eng' : 'Ka'}
              style={styles.localeButton}
            />
            {Helpers.isAuthenticated() && (
              <TouchableOpacity
                onPress={(): void => {
                  context.dispatch(logOut())
                }}
              >
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
