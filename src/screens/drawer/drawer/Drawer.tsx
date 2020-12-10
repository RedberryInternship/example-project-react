import React from 'react'
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { logOutAndReset } from 'state/actions/userActions'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from 'react-i18next'
import { BaseButton, BaseText } from 'components'
import * as Const from 'utils/const'
import colors from 'utils/colors'
import defaults from 'utils/defaults'
import { easyAlert } from 'utils/inform'
import images from 'assets/images'
import { isAuthenticated } from 'helpers/user'
import { selectUser } from 'state/selectors'
import { FCWithNavigation, Locale } from 'types'
import { setLocale } from 'utils/locale'
import {
  DrawerTextFieldItem,
  BaseUserAvatarWithLabel,
  BaseLocaleButton,
} from './components'

const Drawer: FCWithNavigation = ({ navigation }) => {
  const state = useSelector(selectUser)
  const dispatch = useDispatch()

  const { t, i18n } = useTranslation()
  const insets = useSafeAreaInsets()

  let drawerContent = null

  const toggleLanguage = (): void => {
    const locale: Locale = i18n.language === 'ka' ? 'en' : 'ka'
    setLocale(locale)
    i18n.changeLanguage(locale)
  }

  if (!isAuthenticated()) {
    drawerContent = (
      <>
        <View style={{ paddingTop: insets.top, borderTopLeftRadius: 24 }}>
          <BaseButton
            image={images.user}
            onPress={navigation.navigate.bind(Drawer, 'Auth')}
            text="home.authorization"
            style={styles.drawerAuthBtn}
          />

          {Const.DrawerFieldsBeforeAuthorization.map((field, ind) => (
            <DrawerTextFieldItem
              key={ind}
              onPress={navigation.navigate.bind(Drawer, field.route)}
              {...field}
            />
          ))}
        </View>

        <View style={{ justifyContent: 'flex-end' }} />
      </>
    )
  } else {
    drawerContent = (
      <View>
        {Const.DrawerFieldsAfterAuthorization.map((field, key) => (
          <DrawerTextFieldItem
            key={key}
            onPress={navigation.navigate.bind(Drawer, field.route)}
            {...field}
          />
        ))}
      </View>
    )
  }

  return (
    <View
      style={[styles.safeAreaViewContainer, { paddingBottom: insets.bottom }]}
    >
      {isAuthenticated() && (
        <BaseUserAvatarWithLabel
          onPress={(): void => {
            navigation.navigate('ChooseAvatar')
          }}
          avatar={state.user?.avatar}
          firstName={state?.user?.first_name ?? ''}
          lastName={state?.user?.last_name ?? ''}
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
              defaults.modal?.current?.customUpdate(true, { type: 6 })
            }}
            text="drawer.termsAndConditions"
            image={images.greenTick}
          />
          <View style={styles.localeAndLogoutWrapper}>
            <BaseLocaleButton
              onPress={toggleLanguage}
              text={i18n.language === 'ka' ? 'Eng' : 'Ge'}
              style={styles.localeButton}
            />
            {isAuthenticated() && (
              <TouchableOpacity
                onPress={(): void => {
                  easyAlert({
                    title: t('dropDownAlert.areYouSureYouWantToLogOut'),
                    rightText: t('drawer.logOut'),
                    leftText: t('no'),
                    onRightClick: () => {
                      dispatch(logOutAndReset())
                    },
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
    backgroundColor: colors.primaryBackground,
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
    backgroundColor: colors.primaryBackground,
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
