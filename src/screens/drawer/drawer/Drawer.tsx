import React, { useContext, ReactElement, useMemo } from 'react'
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'

import { AppContextType, ScreenPropsWithNavigation } from 'allTypes'

import { BaseButton, BaseText } from 'components'

import { Const, Colors, Helpers, Defaults } from 'utils'
import AppContext from 'hooks/contexts/app';
import { logOut } from '../../../hooks/actions/rootActions'
import images from 'assets/images'
import {
  DrawerTextFieldItem,
  BaseUserAvatarWithLabel,
  BaseLocaleButton,
} from './components'
import { useAsyncStorage } from '@react-native-community/async-storage'

const Drawer = ({ navigation }: ScreenPropsWithNavigation): ReactElement => {
  const { t, i18n } = useTranslation()
  const insets = useSafeAreaInsets()
  const context: AppContextType = useContext(AppContext)
  const { setItem: setLocaleStorage } = useAsyncStorage('locale')

  let drawerContent = null

  const toggleLanguage = (): void => {
    const locale: 'en' | 'ka' | 'ru' = i18n.language === 'ka' ? 'en' : 'ka'
    setLocaleStorage(locale)
    i18n.changeLanguage(locale)
  }

  if (!Helpers.isAuthenticated()) {
    drawerContent = (
      <>
        <View style={{ paddingTop: insets.top, borderTopLeftRadius: 24 }}>
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

        <View style={{ justifyContent: 'flex-end' }}></View>
      </>
    )
  } else {
    drawerContent = (
      <View>
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
      style={[styles.safeAreaViewContainer, { paddingBottom: insets.bottom }]}
    >
      {Helpers.isAuthenticated() && (
        <BaseUserAvatarWithLabel
          onPress={(): void => {
            navigation.navigate('ChooseAvatar')
          }}
          avatar={context?.state.user?.avatar}
          firstName={context?.state?.user?.first_name ?? ''}
          lastName={context?.state?.user?.last_name ?? ''}
        />
      )}
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewStyle}
        contentContainerStyle={styles.scrollViewContentContainerStyle}
      >
        {drawerContent}
        <View>
          <DrawerTextFieldItem
            onPress={(): void => {
              Defaults.modal.current?.customUpdate(true, { type: 6 })
            }}
            text={'drawer.termsAndConditions'}
            image={images.greenTick}
          />
          <View style={styles.localeAndLogoutWrapper}>
            <BaseLocaleButton
              onPress={toggleLanguage}
              text={i18n.language === 'ka' ? 'Eng' : 'Ge'}
              style={styles.localeButton}
            />
            {Helpers.isAuthenticated() && (
              <TouchableOpacity
                onPress={(): void => {
                  Helpers.easyAlert({
                    title: t('dropDownAlert.areYouSureYouWantToLogOut'),
                    rightText: t('drawer.logOut'),
                    leftText: t('no'),
                    onRightClick: () => context.dispatch(logOut()),
                    onLeftClick: () => { },
                  })
                }}
              >
                <BaseText style={styles.logOut}>{t('drawer.logOut')}</BaseText>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default React.memo(Drawer)

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    borderBottomLeftRadius: 24,
    borderTopLeftRadius: 24,
    backgroundColor: Colors.primaryBackground,
  },
  scrollViewStyle: {},
  scrollViewContentContainerStyle: {
    flex: 0,
    flexGrow: 1,
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  drawerAuthBtn: {
    width: '90%',
    marginTop: 10,
    marginBottom: 60,
  },
  localeAndLogoutWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 0,
  },
  localeButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  logOut: {
    color: 'white',
  },
})
