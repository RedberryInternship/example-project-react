import React from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BaseHeader from 'components/BaseHeader'
import BaseButton from 'components/BaseButton'
import BaseText from 'components/BaseText'
import colors from 'utils/colors'
import * as Const from 'utils/const'
import images from 'assets/images'
import { FCWithNavigation } from 'types'
import ContactListItem from './components/ContactListItem'
import useContact from './useContact'

const Contact: FCWithNavigation = ({ navigation }) => {
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const {
    outgoingLinkMethods,
    data,
    setMessage,
    sendMessage,
    message,
  } = useContact()

  const contactInfos = [
    data?.address ?? '',
    data?.phone ?? '',
    data?.email ?? '',
    data?.fb_page ?? '',
    data?.web_page ?? '',
  ]

  const listItems = Const.ContactListFields.map((el, key) => (
    <ContactListItem
      key={el.type}
      image={el.image}
      name={el.name}
      value={contactInfos[key]}
      onPress={outgoingLinkMethods[el.type]}
    />
  ))

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <BaseHeader
        title="contact.contact"
        onPressLeft={navigation.navigate.bind(Contact, 'MainDrawer')}
      />

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        enableAutomaticScroll
        extraScrollHeight={Platform.select({ ios: -300, android: 150 })}
        showsVerticalScrollIndicator={false}
        enableResetScrollToCoords
        contentContainerStyle={styles.keyboardScrollViewContentContainer}
        overScrollMode="always"
        extraHeight={Platform.select({ ios: 500, android: 75 })}
        resetScrollToCoords={{ x: 0, y: 0 }}
      >
        <View>
          <View style={styles.contactItemsContainer}>{listItems}</View>
          <View style={styles.messageContainer}>
            <BaseText style={styles.messageTitle}>
              {t('contact.message')}
            </BaseText>
            <Image source={images.mail} style={styles.messageIcon} />
            <TextInput
              multiline
              style={styles.message}
              onChangeText={setMessage}
              numberOfLines={4}
              value={message}
            />
          </View>
        </View>

        <BaseButton
          onPress={sendMessage}
          text="contact.send"
          image={images.arrowRight}
          style={styles.baseButton}
        />
      </KeyboardAwareScrollView>

      <KeyboardAvoidingView behavior="padding" />
    </View>
  )
}

export default Contact

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
  keyboardScrollViewContentContainer: {
    flex: 0,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  contactItemsContainer: {
    backgroundColor: colors.secondaryGray,
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 16,
    marginTop: 32,
  },
  messageContainer: {
    marginHorizontal: 16,
    marginVertical: 32,
    position: 'relative',
  },
  messageTitle: {
    color: colors.primaryGray,
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
    backgroundColor: colors.black,
    borderRadius: 8,
    color: colors.primaryWhite,
    fontSize: 13,
    lineHeight: 16,
    paddingLeft: 40,
    paddingRight: 16,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  baseButton: {
    marginTop: 0,
    marginBottom: 16,
  },
})
