import React, {useState, ReactElement} from 'react'

import {View, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native'

// keyboarad aware scroll view
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

// components
import {
  BaseHeader,
  BaseButton,
  FirstnameChangeView,
  LastnameChangeView,
  MailChangeView,
  PhoneChangeView,
  PasswordChangeView,
  CardListView,
} from 'components'

// utils
import {Colors} from 'utils'

// assets
import Imgs from '../../../assets/images'

import {ScreenPropsWithNavigation} from 'allTypes'

const ProfileChange = ({
  navigation,
}: ScreenPropsWithNavigation): ReactElement => {
  let editView = null
  const headerName = navigation.getParam('name')
  const type = navigation.getParam('type')
  const payload = navigation.getParam('payload')

  const [saveButtonClicked, setSaveButtonClicked] = useState(false)

  const additionalPayload = {
    clicked: saveButtonClicked,
    setClicked: setSaveButtonClicked,
    navigation: navigation,
  }

  switch (type) {
    case 'FirstnameChange':
      editView = <FirstnameChangeView {...payload} {...additionalPayload} /> // Vobi Todo: use uppercase install spell checker
      break

    case 'LastnameChange':
      editView = <LastnameChangeView {...payload} {...additionalPayload} /> // Vobi Todo: use uppercase install spell checker
      break

    case 'CardChange':
      editView = <CardListView {...payload} {...additionalPayload} />
      break

    case 'MailChange':
      editView = <MailChangeView {...payload} {...additionalPayload} />
      break

    case 'PhoneChange':
      editView = <PhoneChangeView {...payload} {...additionalPayload} />
      break
    case 'PasswordChange':
      editView = <PasswordChangeView {...payload} {...additionalPayload} />
  }

  return (
    <View style={styles.container}>
      <View style={styles.innherContainer}>
        <BaseHeader
          title={headerName}
          onPressLeft={navigation.navigate.bind(ProfileChange, 'Settings')}
        />

        <KeyboardAwareScrollView
          style={styles.keyboardAwareScrollView}
          bounces={true}
          enableOnAndroid={true}
          enableAutomaticScroll={false}
          extraHeight={0}
          extraScrollHeight={-150}
          enableResetScrollToCoords={true}
          keyboardShouldPersistTaps={'handled'}
          resetScrollToCoords={{x: 0, y: 0}}>
          {editView}
        </KeyboardAwareScrollView>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingViewContainer}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'android' ? 50 : 20}>
        <BaseButton
          onPress={setSaveButtonClicked.bind(ProfileChange, true)}
          text="save"
          image={Imgs.arrowLeft}
          isImageRight
        />
      </KeyboardAvoidingView>
    </View>
  )
}

export default ProfileChange

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
    backgroundColor: Colors.primaryBackground,
  },
  innherContainer: {
    flex: 1,
  },
  keyboardAwareScrollView: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  keyboardAvoidingViewContainer: {
    backgroundColor: Colors.primaryBackground,
    justifyContent: 'space-between',
  },
})
