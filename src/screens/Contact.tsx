import React, {ReactElement} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native'

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import {useTranslation} from 'react-i18next'
import {useSafeArea} from 'react-native-safe-area-context'

// components
import {BaseHeader, BaseButton, ContactListItem} from 'components'

// utils
import {Colors, Const} from 'utils'

// hooks
import {useContact} from 'hooks'

/*
 * Absolute Paths don't work with Importing from images' index.ts
 */
import Imgs from '../../assets/images'

import {ScreenPropsWithNavigation} from 'allTypes'

const Contact = ({navigation}: ScreenPropsWithNavigation): ReactElement => {
  const {t} = useTranslation()
  const insets = useSafeArea()
  const mainHook = useContact(navigation)

  // Dummy Info Before we connect App to Back-End
  const contactInfos = [
    'საირმის ქუჩა 11ო',
    '+995 591 93 50 80',
    'gela@espace.ge',
    'e-space',
    'www.espace.ge',
  ]

  const listItems = Const.ContactListFields.map((el, key) => {
    return (
      <ContactListItem
        key={el.type}
        image={el.image}
        name={el.name}
        value={contactInfos[key]}
        onPress={mainHook.outgoingLinkMethods[el.type]}
      />
    )
  })

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom + 16}]}>
      <BaseHeader
        title={'contact.contact'}
        onPressLeft={navigation.navigate.bind(Contact, 'MainDrawer')}
      />

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        enableAutomaticScroll={true}
        extraScrollHeight={Platform.select({ios: -300, android: 150})}
        showsVerticalScrollIndicator={false}
        enableResetScrollToCoords={true}
        contentContainerStyle={styles.keyboardScrollViewContentContainer}
        overScrollMode={'always'}
        extraHeight={Platform.select({ios: 500, android: 75})}
        resetScrollToCoords={{x: 0, y: 0}}>
        <View style={styles.contactItemsContainer}>{listItems}</View>

        <View style={styles.messageContainer}>
          <Text style={styles.messageTitle}>{t('contact.message')}</Text>
          <Image source={Imgs.mail} style={styles.messageIcon} />
          <TextInput
            multiline
            style={styles.message}
            onChangeText={mainHook.setMessage}
            numberOfLines={4}
          />
        </View>
      </KeyboardAwareScrollView>

      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? 16 : StatusBar.currentHeight
        }>
        <BaseButton
          onPress={mainHook.sendMessage.bind(Contact)}
          text="send"
          image={Imgs.arrowRight}
          style={styles.baseButton}
        />
      </KeyboardAvoidingView>
    </View>
  )
}

export default Contact

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  keyboardScrollViewContentContainer: {
    flex: 0,
  },
  contactItemsContainer: {
    backgroundColor: Colors.secondaryGray,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 32,
    marginTop: 32,
  },
  messageContainer: {
    marginHorizontal: 16,
    marginVertical: 32,
    position: 'relative',
  },
  messageTitle: {
    color: Colors.primaryGray,
    marginBottom: 16,
  },
  messageIcon: {
    position: 'absolute',
    zIndex: 1,
    width: 24,
    height: 24,
    top: 40,
    left: 8,
  },
  message: {
    height: 200,
    backgroundColor: Colors.black,
    borderRadius: 8,
    color: Colors.primaryWhite,
    paddingLeft: 40,
    paddingRight: 16,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  baseButton: {
    marginTop: 0,
    marginBottom: 0,
  },
})
